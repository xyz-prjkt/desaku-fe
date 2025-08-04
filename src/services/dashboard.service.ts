import { IPaginateRequest } from "@/components/molecules/table/interfaces";
import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import { IDashboardResponse } from "@/interfaces/services/dashboard";
import { ISuratKeterangan } from "@/interfaces/services/sk";
import { api } from "@/libs";
import { generateUrlParams } from "@/utils/url-params-generator";
import { useQuery } from "@tanstack/react-query";

const useGetDashboardStatusCount = () =>
  useQuery({
    queryKey: QUERY_KEYS.DASHBOARD.STATUS_COUNT,
    queryFn: async (): Promise<IApiResponse<IDashboardResponse>> =>
      api.get("/dashboard/sk-status-count").then((res) => res.data),
  });

const useGetMySkList = (params: IPaginateRequest) =>
  useQuery({
    queryKey: [QUERY_KEYS.DASHBOARD.MY_SK_LIST, params],
    queryFn: async (): Promise<IApiResponse<ISuratKeterangan[]>> =>
      api
        .get(`/sk/my-list?${generateUrlParams(params)}`)
        .then((res) => res.data),
  });

export { useGetDashboardStatusCount, useGetMySkList };
