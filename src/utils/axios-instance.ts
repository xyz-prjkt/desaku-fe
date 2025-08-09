import baseAxios from "axios";
import { Mutex } from "async-mutex";
import { getFormattedErrorMessage } from "@/utils/api-error-helper";
import { cookies } from "@/libs/cookies";

const mutex = new Mutex();

const revokeAuthorization = () => {
  cookies.remove("dsk-mddlwr");
  window.location.replace("/401");
};

const createAxiosInstance = () => {
  const baseURL = import.meta.env.VITE_API_BASE_URL || "http://localhost:4056";
  const axios = baseAxios.create({
    baseURL,
    withCredentials: true,
  });

  axios.interceptors.response.use(
    (response) => response,
    async (error) => {
      await mutex.waitForUnlock();
      const originalRequest = error.config;

      if (error.response?.status === 403 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (!mutex.isLocked()) {
          window.location.replace("/403");
          await mutex.acquire();
        }
      }

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        if (!mutex.isLocked()) {
          const release = await mutex.acquire();
          try {
            await fetch("http://localhost:4056/auth/refresh-token", {
              credentials: "include",
              method: "POST",
            })
              .then((res) => res.json())
              .then((data) => {
                if (!data.success) {
                  revokeAuthorization();
                }
              });
          } finally {
            release();
          }
        }
      }

      const errorMsg = getFormattedErrorMessage(error.response?.data?.message);

      return Promise.reject(new Error(`${errorMsg}`));
    }
  );
  return axios;
};

export { createAxiosInstance };
