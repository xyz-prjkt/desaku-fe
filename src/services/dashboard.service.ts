import { IApiResponse } from "@/interfaces/services/api";
import { IDashboardResponse, IUserSk } from "@/interfaces/services/dashboard";
import { api } from "@/libs";
import { useQuery } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { generateUrlParams } from "@/utils/url-params-generator";

const useGetDashboardStatusCount = () =>
  useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.STATUS_COUNT,
    queryFn: async (): Promise<IApiResponse<IDashboardResponse>> =>
      api.get("/v1/dashboard/sk-status-count").then((res) => res.data),
  });

const useGetMySkList = (params: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.MY_SK_LIST, params],
    queryFn: async (): Promise<IApiResponse<IUserSk[]>> =>
      api
        .get(`/v1/sk/my-list?${generateUrlParams(params)}`)
        .then((res) => res.data),
  });

export { useGetDashboardStatusCount, useGetMySkList };
