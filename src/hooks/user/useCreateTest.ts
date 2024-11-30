import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

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
  const hospital_id = localStorage.getItem("hospital_id");
  const { mutate, isLoading, error } = usePostData<void>(
    `/hospital/${hospital_id}/patient/${patient_id}/test`
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
