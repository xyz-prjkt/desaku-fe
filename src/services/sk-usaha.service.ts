import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkUsahaCreate } from "@/interfaces/services/sk-usaha";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkUsaha = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.USAHA, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api.get("/sk/usaha", { params: paginateRequest }).then((res) => res.data),
  });

const useGetSkUsahaDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.USAHA_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(isAdmin ? `/admin/sk-detail/usaha/${id}` : `/sk/usaha/${id}`)
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkUsaha = () =>
  useMutation({
    mutationFn: async (
      data: ISkUsahaCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/usaha", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.USAHA],
      });
    },
  });

export { useCreateSkUsaha, useGetSkUsahaDetail, useGetUserSkUsaha };
