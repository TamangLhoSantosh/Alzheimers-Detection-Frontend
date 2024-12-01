import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";
import { useAuth } from "../../components/generic/authCotext";

export interface CreateTestData {
  description: string;
}

interface CreateTestResponse {
  isLoading: boolean;
  error: string | null;
  createTest: (testData: CreateTestData) => void;
}

const useCreateTest = (patient_id: string | undefined): CreateTestResponse => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate, isLoading, error } = usePostData<void>(
    `/hospital/${user?.hospital_id}/patient/${patient_id}/test`
  );

  const createTest = (testData: CreateTestData) => {
    mutate(testData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["patients"],
          exact: false,
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.error(
            "Error creating patients:",
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
    createTest,
  };
};

export default useCreateTest;
