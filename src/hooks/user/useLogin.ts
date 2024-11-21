import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

export interface LoginaData {
  username: string;
  password: string;
}

interface LoginResponse {
  status: number;
  data: {
    access_token: string;
    refresh_token: string;
    user: object;
    is_admin: boolean;
    is_hospital_admin: boolean;
  };
}

const useLogin = () => {
  const { mutate, isLoading, error } = usePostData<LoginResponse>(
    "/auth/login",
    {
      "Content-Type": "multipart/form-data",
    }
  );

  const login = async (loginData: LoginaData) => {
    mutate(loginData, {
      onSuccess: (response) => {
        saveAuthTokens(response);
      },
      onError: (err) => {
        const errorMessage =
          err instanceof AxiosError
            ? err.response?.data || err.message
            : "Unexpected error occurred.";
        console.error("Error during login:", errorMessage);
      },
    });
  };

  return {
    isLoading,
    error: error || null,
    login,
  };
};

const saveAuthTokens = (data: any) => {
  localStorage.setItem("token", data.access_token);
  localStorage.setItem("refresh", data.refresh_token);
  localStorage.setItem("user", JSON.stringify(data.user));
  localStorage.setItem("is_admin", String(data.is_admin));
  localStorage.setItem("is_hospital_admin", String(data.is_hospital_admin));
};

export default useLogin;
