import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

export interface CreateUserAccount {
  username: String;
  first_name: String;
  middle_name: String;
  last_name: String;
  dob: String;
  gender: String;
  contact: String;
  address: String;
  email: String;
  password: String;
  is_admin: boolean;
  is_hospital_admin: boolean;
  hospital_id: String;
}

interface CreateUserResult {
  isLoading: boolean;
  error: string | null;
  createUser: (userData: CreateUserAccount, setMessage: Function) => void;
}

const useCreateUser = (): CreateUserResult => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = usePostData<void>("/user");

  const createUser = (
    userData: CreateUserAccount,
    setMessageData: Function
  ) => {
    mutate(userData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
          exact: false,
        });
        // Trigger success message
        setMessageData({
          message: "Hospital cr successful!",
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
    });
  };

  return {
    isLoading,
    error,
    createUser,
  };
};

export default useCreateUser;
