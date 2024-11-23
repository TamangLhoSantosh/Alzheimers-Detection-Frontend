import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";

export interface CreatePatientData {
  first_name: String;
  middle_name: String;
  last_name: String;
  dob: String;
  gender: String;
  contact: String;
  address: String;
  hospital_id: String;
}

interface CreatePatientResponse {
  isLoading: boolean;
  error: string | null;
  createPatient: (patientData: CreatePatientData) => void;
}

const useCreatePatient = (): CreatePatientResponse => {
  const queryClient = useQueryClient();
  const id = localStorage.getItem("hospital_id");
  const { mutate, isLoading, error } = usePostData<void>(
    `/hospital/${id}/patient`
  );

  const createPatient = (patientData: CreatePatientData) => {
    mutate(patientData, {
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
    createPatient,
  };
};

export default useCreatePatient;
