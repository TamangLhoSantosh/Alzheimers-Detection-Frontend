import { useAuth } from "../../components/generic/authCotext";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

export interface LoginaData {
  username: string;
  password: string;
}

const useLogin = () => {
  const { login: auth } = useAuth();
  const { mutate, isLoading, error } = usePostData<Record<string, any>>(
    "/auth/login",
    {
      "Content-Type": "multipart/form-data",
    }
  );

  const login = async (loginData: LoginaData) => {
    mutate(loginData, {
      onSuccess: (response) => {
        auth(response.access_token, response.refresh_token, response.user);
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

export default useLogin;
