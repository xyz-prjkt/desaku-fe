import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkKelahiranCreate } from "@/interfaces/services/sk-kelahiran";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkKelahiran = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KELAHIRAN, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/kelahiran", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkKelahiranDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KELAHIRAN_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin ? `/admin/sk-detail/kelahiran/${id}` : `/sk/kelahiran/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkKelahiran = () =>
  useMutation({
    mutationFn: async (
      data: ISkKelahiranCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/kelahiran", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KELAHIRAN],
      });
    },
  });

export { useCreateSkKelahiran, useGetSkKelahiranDetail, useGetUserSkKelahiran };
