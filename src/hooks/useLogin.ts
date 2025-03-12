import { useMutation } from "@tanstack/react-query";
import { login, LoginData, logout } from "../lib/api/auth";

export const useLogin = () => {
  return useMutation<ReturnType<typeof login>, Error, LoginData>({
    mutationFn: (data: LoginData) => login(data),
  });
};

export const useLogout = () => {
  return useMutation<void, Error>({
    mutationFn: () => logout(),
  });
};
