import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkDispensasiCreate } from "@/interfaces/services/sk-dispensasi";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkDispensasi = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.DISPENSASI, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/dispensasi", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkDispensasiDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.DISPENSASI_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin ? `/admin/sk-detail/dispensasi/${id}` : `/sk/dispensasi/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkDispensasi = () =>
  useMutation({
    mutationFn: async (
      data: ISkDispensasiCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/dispensasi", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.DISPENSASI],
      });
    },
  });

export {
  useCreateSkDispensasi,
  useGetSkDispensasiDetail,
  useGetUserSkDispensasi,
};
