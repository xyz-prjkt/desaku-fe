import { IApiResponse } from "@/interfaces/services/api";
import { ISignInRequest } from "@/interfaces/services/auth";
import { api } from "@/libs";
import { useMutation } from "@tanstack/react-query";

const useAuthSignIn = () =>
  useMutation({
    mutationFn: async (data: ISignInRequest): Promise<IApiResponse<null>> =>
      api.post("/v1/auth/sign-in", data).then((res) => res.data),
  });

export { useAuthSignIn };
