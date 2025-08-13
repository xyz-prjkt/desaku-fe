import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkDomisiliCreate } from "@/interfaces/services/sk-domisili";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkDomisili = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.DOMISILI, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/domisili", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkDomisiliDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.DOMISILI_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(isAdmin ? `/admin/sk-detail/domisili/${id}` : `/sk/domisili/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkDomisili = () =>
  useMutation({
    mutationFn: async (
      data: ISkDomisiliCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/domisili", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.DOMISILI],
      });
    },
  });

export { useCreateSkDomisili, useGetSkDomisiliDetail, useGetUserSkDomisili };
