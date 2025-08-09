import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  ISignInRequest,
  ISignUpRequest,
  IUserProfile,
} from "@/interfaces/services/auth";
import { IUserDetail } from "@/interfaces/services/user";
import { api } from "@/libs";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAuthSignIn = () =>
  useMutation({
    mutationFn: async (data: ISignInRequest): Promise<IApiResponse<null>> =>
      api.post("/auth/sign-in", data).then((res) => res.data),
  });

const useAuthSignUp = () =>
  useMutation({
    mutationFn: async (data: ISignUpRequest): Promise<IApiResponse<null>> =>
      api.post("/auth/sign-up", data).then((res) => res.data),
  });

const useGetAuthMe = () =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTH.ME],
    queryFn: async (): Promise<IApiResponse<IUserProfile>> =>
      api.get("/auth/me").then((res) => res.data),
  });

const useGetAuthMeProfile = () =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTH.ME, "profile"],
    queryFn: async (): Promise<IApiResponse<IUserDetail>> =>
      api.get("/auth/me/profile").then((res) => res.data),
  });

const useAuthSignOut = () =>
  useMutation({
    mutationFn: async (): Promise<IApiResponse<null>> =>
      api.post("/auth/sign-out").then((res) => res.data),
  });

export {
  useAuthSignIn,
  useAuthSignOut,
  useAuthSignUp,
  useGetAuthMe,
  useGetAuthMeProfile,
};
