import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  ISkReviewChangeStatusBody,
  ISkReviewListResponse,
} from "@/interfaces/services/sk-review";
import { api } from "@/libs";
import { query } from "@/libs/query";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetSkReviewList = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.SK.LIST, paginateRequest],
    queryFn: async (): Promise<IApiResponse<ISkReviewListResponse[]>> =>
      api
        .get("/admin/sk-list", { params: paginateRequest })
        .then((res) => res.data),
  });

const useChangeSKReviewStatus = () =>
  useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: ISkReviewChangeStatusBody;
    }): Promise<IApiResponse<null>> =>
      api.patch(`/admin/change-status-sk/${id}`, data).then((res) => res.data),
    onSuccess: () => {
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.LIST],
      });
      query.invalidateQueries({
        queryKey: [QUERY_KEYS.SK.KEMATIAN],
      });
    },
  });

export { useChangeSKReviewStatus, useGetSkReviewList };
