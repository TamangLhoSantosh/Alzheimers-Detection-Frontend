import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostDate";

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
        queryClient.invalidateQueries(["hospitals"]);
      },
      onError: (err: unknown) => {
        console.error("Error creating hospital:", err);
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
