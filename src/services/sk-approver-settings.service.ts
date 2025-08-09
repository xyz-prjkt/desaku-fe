import { QUERY_KEYS } from "@/constants/query-keys";
import { IApiResponse } from "@/interfaces/services/api";
import {
  ISKApproverSettingsBody,
  ISKApproverSettingsResponse,
} from "@/interfaces/services/sk-approver-settings";
import { api } from "@/libs";
import { useMutation, useQuery } from "@tanstack/react-query";

const useGetSKApproverSettings = () =>
  useQuery({
    queryKey: [QUERY_KEYS.ADMIN.SK_APPROVER_SETTINGS],
    queryFn: async (): Promise<IApiResponse<ISKApproverSettingsResponse>> =>
      api.get("/admin/sk-approver-settings").then((res) => res.data),
  });

const useUpdateSKApproverSettings = () =>
  useMutation({
    mutationFn: async (
      data: ISKApproverSettingsBody
    ): Promise<IApiResponse<null>> =>
      api.post(`/admin/sk-approver-settings`, data).then((res) => res.data),
  });

export { useGetSKApproverSettings, useUpdateSKApproverSettings };
