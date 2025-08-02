import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  IAssignRolePermissionBody,
  IAssignUserPermissionBody,
  IAssignUserRoleBody,
  IPermissionResponse,
  IRoleResponse,
  IRoleDetailResponse,
  IRoleBody,
} from "@/interfaces/services/role-permission";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetAllRoles = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.ROLES, paginateRequest],
    queryFn: async (): Promise<IApiResponse<IRoleResponse[]>> =>
      api
        .get("/v1/admin/roles", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetAllPermissions = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.PERMISSIONS, paginateRequest],
    queryFn: async (): Promise<IApiResponse<IPermissionResponse[]>> =>
      api
        .get("/v1/admin/permissions", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetRoleDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.ROLE_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<IRoleDetailResponse>> =>
      api.get(`/v1/admin/roles/${id}`).then((res) => res.data),
    enabled: !!id,
  });

const useAssignRolePermission = () =>
  useMutation({
    mutationFn: async (
      data: IAssignRolePermissionBody,
    ): Promise<IApiResponse<null>> =>
      api
        .post("/v1/admin/assign-role-permission", data)
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLES],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLE_DETAIL],
      });
      query.refetchQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

const useUpdateRole = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IRoleBody;
    }): Promise<IApiResponse<IRoleResponse>> =>
      api.patch(`/v1/admin/roles/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLES],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLE_DETAIL],
      });
      query.refetchQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

const useCreateRole = () =>
  useMutation({
    mutationFn: async (data: IRoleBody): Promise<IApiResponse<IRoleResponse>> =>
      api.post("/v1/admin/roles", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLES],
      });
    },
  });

const useDeleteRole = () =>
  useMutation({
    mutationFn: async (id: string): Promise<IApiResponse<null>> =>
      api.delete(`/v1/admin/roles/${id}`).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLES],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.ADMIN.ROLE_DETAIL],
      });
      query.refetchQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

const useAssignUserRole = () =>
  useMutation({
    mutationFn: async (
      data: IAssignUserRoleBody,
    ): Promise<IApiResponse<null>> =>
      api.post("/v1/admin/assign-user-role", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

const useAssignUserPermission = () =>
  useMutation({
    mutationFn: async (
      data: IAssignUserPermissionBody,
    ): Promise<IApiResponse<null>> =>
      api
        .post("/v1/admin/assign-user-permission", data)
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.AUTH.ME],
      });
    },
  });

export {
  useGetAllRoles,
  useGetAllPermissions,
  useGetRoleDetail,
  useAssignRolePermission,
  useUpdateRole,
  useCreateRole,
  useDeleteRole,
  useAssignUserRole,
  useAssignUserPermission,
};
