import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

const useForgotPasswordConfirm = (token: String) => {
  const { mutate, isLoading, error } = usePostData<Record<string, any>>(
    "/password-reset/confirm?token=" + token
  );

  const forgotPasswordConfirm = (
    password: String,
    setMessageData: Function
  ) => {
    mutate(
      { new_password: password },
      {
        onSuccess: (response) => {
          // Trigger success message

          setMessageData({
            message: response.message ?? "Password reset successful",
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
    forgotPasswordConfirm,
  };
};

export default useForgotPasswordConfirm;
