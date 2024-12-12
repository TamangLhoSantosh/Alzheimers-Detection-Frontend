import { useAuth } from "../../components/generic/authContext";
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

  // Login function with success and error handling
  const login = async (loginData: LoginaData, setMessageData: Function) => {
    mutate(loginData, {
      onSuccess: (response) => {
        // Trigger success message
        setMessageData({
          message: "Login successful!",
          title: "Success",
          open: true,
        });
        auth(response.access_token, response.refresh_token, response.user);
      },
      onError: (err) => {
        // Trigger error message
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
