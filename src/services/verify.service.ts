import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { api } from "@/libs";
import { useQuery } from "@tanstack/react-query";

const useGetVerifySk = (id: string) =>
  useQuery({
    queryKey: [QUERY_KEYS.PUBLIC.SK, id],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan>> =>
      api.get(`/unauth/sk/${id}`).then((res) => res.data),
    enabled: !!id,
    retry: 0,
  });

export { useGetVerifySk };
