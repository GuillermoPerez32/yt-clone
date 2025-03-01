import { useMutation } from "@tanstack/react-query";
import { client } from "./client";

interface LoginResponse {
  token?: string;
  error?: string;
}

interface LoginVariables {
  email: string;
  password: string;
}

const login = async (variables: LoginVariables): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>("/login", variables);
  return response.data;
};

export const useLogin = () => {
  return useMutation<LoginResponse, Error, LoginVariables>({
    mutationFn: login,
  });
};
