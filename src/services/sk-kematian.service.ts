import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { IUserSk, IUserSkDetail } from "@/interfaces/services/dashboard";
import { ISkKematianCreate } from "@/interfaces/services/sk-kematian";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkKematian = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEMATIAN, paginateRequest],
    queryFn: async (): Promise<IApiResponse<IUserSk[]>> =>
      api
        .get("/v1/sk/kematian", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkKematianDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEMATIAN_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<IUserSkDetail>> =>
      api.get(`/v1/sk/kematian/${id}`).then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkKematian = () =>
  useMutation({
    mutationFn: async (
      data: ISkKematianCreate,
    ): Promise<
      IApiResponse<Pick<IUserSk, "id" | "user_id" | "createdAt" | "sk_type">>
    > => api.post("/v1/sk/kematian", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KEMATIAN],
      });
    },
  });

export { useCreateSkKematian, useGetSkKematianDetail, useGetUserSkKematian };
