import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  ISignInRequest,
  ISignUpRequest,
  IUserProfile,
  IUserProfileCheck,
} from "@/interfaces/services/auth";
import { IUserDetail } from "@/interfaces/services/user";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

interface IUpdateProfileBody {
  name: string;
  nik: string;
  gender: string;
  born_birth: string;
  born_place: string;
  religion: string;
  marital_status: string;
  work: string;
  address: string;
}

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

const useUpdateAuthProfile = () =>
  useMutation({
    mutationFn: async (data: IUpdateProfileBody): Promise<IApiResponse<null>> =>
      api.put("/auth/me", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH.ME, "profile"],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

const useGetAuthProfileCheck = () =>
  useQuery({
    queryKey: [QUERY_KEYS.AUTH.ME, "check-profile"],
    queryFn: async (): Promise<IApiResponse<IUserProfileCheck>> =>
      api.get("/auth/me/check-profile").then((res) => res.data),
  });

const useAuthSignOut = () =>
  useMutation({
    mutationFn: async (): Promise<IApiResponse<null>> =>
      api.post("/auth/sign-out").then((res) => res.data),
  });

export {
  IUpdateProfileBody,
  useAuthSignIn,
  useAuthSignOut,
  useAuthSignUp,
  useGetAuthMe,
  useGetAuthMeProfile,
  useGetAuthProfileCheck,
  useUpdateAuthProfile,
};
