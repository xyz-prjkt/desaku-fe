import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkTidakMampuCreate } from "@/interfaces/services/sk-tidak-mampu";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { downloadBlobFromResponse } from "@/utils/download-blob";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkTidakMampu = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.TIDAK_MAMPU, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/tidak-mampu", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkTidakMampuDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.TIDAK_MAMPU_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin
            ? `/admin/sk-detail/tidak-mampu/${id}`
            : `/sk/tidak-mampu/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkTidakMampu = () =>
  useMutation({
    mutationFn: async (
      data: ISkTidakMampuCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/tidak-mampu", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.TIDAK_MAMPU],
      });
    },
  });

const useDownloadSkTidakMampu = (id: string, isAdmin?: boolean) =>
  useMutation({
    mutationFn: async (): Promise<Blob> => {
      const res = await api.get(
        isAdmin
          ? `/admin/sk-download/tidak-mampu/${id}/download`
          : `/sk/tidak-mampu/${id}/download`,
        {
          responseType: "blob",
        }
      );
      await downloadBlobFromResponse(res.data, `sk-tidak-mampu-${id}.docx`);
      return res.data;
    },
  });

export {
  useCreateSkTidakMampu,
  useGetSkTidakMampuDetail,
  useGetUserSkTidakMampu,
  useDownloadSkTidakMampu,
};
