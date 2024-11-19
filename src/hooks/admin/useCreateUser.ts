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
}

interface CreateUserResult {
  isLoading: boolean;
  error: string | null;
  createUser: (userData: CreateUserAccount) => void;
}

const useCreateUser = (): CreateUserResult => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = usePostData<void>("/user");

  const createUser = (userData: CreateUserAccount) => {
    mutate(userData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["users"],
          exact: false,
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.error(
            "Error creating user:",
            err.response?.data || err.message
          );
        } else {
          console.error("Unexpected error:", err);
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
