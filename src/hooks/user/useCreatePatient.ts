import { useQueryClient } from "@tanstack/react-query";
import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";
import { useAuth } from "../../components/generic/authContext";

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
  createPatient: (
    patientData: CreatePatientData,
    setMessageData: Function
  ) => void;
}

const useCreatePatient = (): CreatePatientResponse => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const { mutate, isLoading, error } = usePostData<void>(
    `/hospital/${user?.hospital_id}/patient`
  );

  const createPatient = (
    patientData: CreatePatientData,
    setMessageData: Function
  ) => {
    mutate(patientData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["patients"],
          exact: false,
        });
        // Trigger success message
        setMessageData({
          message: "Patient creation successful!",
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
    createPatient,
  };
};

export default useCreatePatient;
