import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  IUser,
  IUserDetail,
  IUpdateUserBody,
} from "@/interfaces/services/user";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetAllUsers = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.USERS, paginateRequest],
    queryFn: async (): Promise<IApiResponse<IUser[]>> =>
      api
        .get("/admin/users", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetUserDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.USER_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<IUserDetail>> =>
      api.get(`/admin/users/${id}`).then((res) => res.data),
    enabled: !!id,
  });

const useUpdateUser = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateUserBody;
    }): Promise<IApiResponse<IUserDetail>> =>
      api.patch(`/admin/users/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.USERS],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.USER_DETAIL],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

export { useGetAllUsers, useGetUserDetail, useUpdateUser };
