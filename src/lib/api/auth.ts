import axiosInstance from "./axios";

export interface LoginData {
  name: string;
  email: string;
}

export const login = async (data: LoginData) => {
  const response = await axiosInstance.post("/auth/login", data);
  return response.data;
};
