import baseAxios from "axios";
import { Mutex } from "async-mutex";
import { getFormattedErrorMessage } from "@/utils/api-error-helper";

const mutex = new Mutex();

const createAxiosInstance = () => {
  const axios = baseAxios.create({
    baseURL: "http://localhost:4056",
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
            await fetch("http://localhost:4056/v1/auth/refresh-token", {
              credentials: "include",
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.code === 200) {
                  window.location.reload();
                } else {
                  window.location.replace("/401");
                }
              });
          } finally {
            release();
          }
        }
      }

      const requestId = error.response?.data?.request_meta?.request_id ?? null;
      const errorMsg = getFormattedErrorMessage(error.response?.data?.message);

      return Promise.reject(
        new Error(`${errorMsg} | Request ID: ${requestId ?? "N/A"}`)
      );
    }
  );
  return axios;
};

export { createAxiosInstance };
