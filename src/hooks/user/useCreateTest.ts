import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";
import { useAuth } from "../../components/generic/authContext";

export interface CreateTestData {
  description: string;
}

interface CreateTestResponse {
  isLoading: boolean;
  error: string | null;
  createTest: (testData: CreateTestData, setMessageData: Function) => void;
}

const useCreateTest = (patient_id: string | undefined): CreateTestResponse => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate, isLoading, error } = usePostData<Record<string, any>>(
    `/hospital/${user?.hospital_id}/patient/${patient_id}/test`
  );

  const createTest = (testData: CreateTestData, setMessageData: Function) => {
    mutate(testData, {
      onSuccess: (response) => {
        queryClient.invalidateQueries({
          queryKey: ["patients"],
          exact: false,
        });
        // Trigger success message
        setMessageData({
          message: response.message ?? "Test created successful!",
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
    createTest,
  };
};

export default useCreateTest;
