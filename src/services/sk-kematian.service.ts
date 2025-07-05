import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { IUserSk, IUserSkDetail } from "@/interfaces/services/dashboard";
import { api } from "@/libs";
import { useQuery } from "@tanstack/react-query";

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

export { useGetSkKematianDetail, useGetUserSkKematian };
