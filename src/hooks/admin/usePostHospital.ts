import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

export interface CreateHospitalData {
  name: string;
  address: string;
  contact: string;
  email: string;
}

interface CreateHospitalResult {
  isLoading: boolean;
  error: string | null;
  createHospital: (hospitalData: CreateHospitalData) => void;
}

const usePostHospital = (): CreateHospitalResult => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = usePostData<void>("/hospital");

  const createHospital = (hospitalData: CreateHospitalData) => {
    mutate(hospitalData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["hospitals"],
          exact: false,
        });
      },
      onError: (err) => {
        if (err instanceof AxiosError) {
          console.error(
            "Error creating hospital:",
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
    createHospital,
  };
};

export default usePostHospital;
