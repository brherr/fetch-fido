import { useMutation } from "@tanstack/react-query";
import { login, LoginData } from "../lib/api/auth";

export const useLogin = () => {
  return useMutation<any, Error, LoginData>({
    mutationFn: (data: LoginData) => login(data),
  });
};
