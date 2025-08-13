import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkBedaNamaCreate } from "@/interfaces/services/sk-beda-nama";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkBedaNama = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.BEDA_NAMA, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/beda-nama", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkBedaNamaDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.BEDA_NAMA_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin ? `/admin/sk-detail/beda-nama/${id}` : `/sk/beda-nama/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkBedaNama = () =>
  useMutation({
    mutationFn: async (
      data: ISkBedaNamaCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/beda-nama", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.BEDA_NAMA],
      });
    },
  });

export { useCreateSkBedaNama, useGetSkBedaNamaDetail, useGetUserSkBedaNama };
