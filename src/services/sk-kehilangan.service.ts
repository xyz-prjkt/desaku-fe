import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { ISkKehilanganCreate } from "@/interfaces/services/sk-kehilangan";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetUserSkKehilangan = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEHILANGAN, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get("/sk/kehilangan", { params: paginateRequest })
        .then((res) => res.data),
  });

const useGetSkKehilanganDetail = (id: string, isAdmin?: boolean) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.KEHILANGAN_DETAIL, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api
        .get(
          isAdmin ? `/admin/sk-detail/kehilangan/${id}` : `/sk/kehilangan/${id}`
        )
        .then((res) => res.data),
    enabled: !!id,
  });

const useCreateSkKehilangan = () =>
  useMutation({
    mutationFn: async (
      data: ISkKehilanganCreate
    ): Promise<
      IApiResponse<
        Pick<ISuratKeterangan, "id" | "user_id" | "createdAt" | "sk_type">
      >
    > => api.post("/sk/kehilangan", data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KEHILANGAN],
      });
    },
  });

export {
  useCreateSkKehilangan,
  useGetSkKehilanganDetail,
  useGetUserSkKehilangan,
};
