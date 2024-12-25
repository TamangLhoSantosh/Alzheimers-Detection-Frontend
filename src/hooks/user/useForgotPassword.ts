import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

const useForgotPassword = () => {
  const { mutate, isLoading, error } = usePostData<void>(
    "/password-reset/request"
  );

  const forgotPassword = (email: String, setMessageData: Function) => {
    mutate(
      { email: email },
      {
        onSuccess: () => {
          // Trigger success message
          setMessageData({
            message: "A password reset link has been sent to your email.",
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
    forgotPassword,
  };
};

export default useForgotPassword;
