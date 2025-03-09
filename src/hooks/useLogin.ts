import { useMutation } from "@tanstack/react-query";
import { login, LoginData, logout } from "../lib/api/auth";

export const useLogin = () => {
  return useMutation<any, Error, LoginData>({
    mutationFn: (data: LoginData) => login(data),
  });
};

export const useLogout = () => {
  return useMutation<any, Error>({
    mutationFn: () => logout(),
  });
};
