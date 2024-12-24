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
  const login = async (
    loginData: LoginaData,
    setMessageData: Function,
    rememberMe: Boolean
  ) => {
    mutate(loginData, {
      onSuccess: (response) => {
        // Trigger success message
        setMessageData({
          message: "Login successful!",
          title: "Success",
          open: true,
        });
        if (rememberMe)
          auth(response.access_token, response.user, response.refresh_token);
        else auth(response.access_token, response.user);
      },
      onError: (err) => {
        // Trigger error message
        if (err instanceof AxiosError) {
          setMessageData({
            message:
              (err.response?.data as { detail?: string })?.detail ||
              err.message,
            title: "Error",
            open: true,
          });
        } else {
          setMessageData({
            message: "An error occurred",
            title: "Error",
            open: true,
          });
        }
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
