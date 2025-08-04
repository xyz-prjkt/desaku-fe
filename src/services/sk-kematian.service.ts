import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkKematianCreate } from "@/interfaces/services/sk-kematian";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { downloadBlobFromResponse } from "@/utils/download-blob";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkKematian = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEMATIAN, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/v1/sk/kematian", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkKematianDetail = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEMATIAN_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api.get(`/v1/sk/kematian/${id}`).then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkKematian = () =>
  useMutation({
    mutationFn: async (
      data: ISkKematianCreate,
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/v1/sk/kematian", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KEMATIAN],
      });
    },
  });

const useDownloadSkKematian = (id: string, isAdmin?: boolean) =>
  useMutation({
    mutationFn: async (): Promise<Blob> => {
      const res = await api.get(
        isAdmin
          ? `/v1/admin/sk-download/kematian/${id}/download`
          : `/v1/sk/kematian/${id}/download`,
        {
          responseType: "blob",
        },
      );
      await downloadBlobFromResponse(res.data, `sk-kematian-${id}.docx`);
      return res.data;
    },
  });

export {
  useCreateSkKematian,
  useGetSkKematianDetail,
  useGetUserSkKematian,
  useDownloadSkKematian,
};
