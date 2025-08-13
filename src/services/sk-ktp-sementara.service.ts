import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkKtpSementaraCreate } from "@/interfaces/services/sk-ktp-sementara";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkKtpSementara = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KTP_SEMENTARA, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/ktp-sementara", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkKtpSementaraDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KTP_SEMENTARA_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin
            ? `/admin/sk-detail/ktp-sementara/${id}`
            : `/sk/ktp-sementara/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkKtpSementara = () =>
  useMutation({
    mutationFn: async (
      data: ISkKtpSementaraCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/ktp-sementara", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KTP_SEMENTARA],
      });
    },
  });

export {
  useCreateSkKtpSementara,
  useGetSkKtpSementaraDetail,
  useGetUserSkKtpSementara,
};
