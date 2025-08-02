import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  ISkListItem,
  IUpdateSkStatusBody,
} from "@/interfaces/services/sk-list";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetSkList = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.LIST, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISkListItem[]>> =>
      api
        .get("/v1/admin/sk-list", { params: paginateRequest })
        .then((res) => res.data),
  });

const useUpdateSkStatus = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: IUpdateSkStatusBody;
    }): Promise<IApiResponse<unknown>> =>
      api
        .patch(`/v1/admin/change-status-sk/${id}`, data)
        .then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.LIST],
      });
    },
  });

export { useGetSkList, useUpdateSkStatus };
