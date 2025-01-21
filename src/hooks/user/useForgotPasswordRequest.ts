import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

const useForgotPasswordRequest = () => {
  const { mutate, isLoading, error } = usePostData<Record<string, any>>(
    "/password-reset/request"
  );

  const forgotPasswordRequest = (email: String, setMessageData: Function) => {
    mutate(
      { email: email },
      {
        onSuccess: (response) => {
          // Trigger success message
          setMessageData({
            message:
              response.message ??
              "A password reset link has been sent to your email.",
            title: "Success",
            open: true,
          });
        },
        onError: (err) => {
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
      }
    );
  };

  return {
    isLoading,
    error,
    forgotPasswordRequest,
  };
};

export default useForgotPasswordRequest;
