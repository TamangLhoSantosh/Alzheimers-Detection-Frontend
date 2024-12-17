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
  createHospital: (
    hospitalData: CreateHospitalData,
    setMessageData: Function
  ) => void;
}

const useCreateHospital = (): CreateHospitalResult => {
  const queryClient = useQueryClient();
  const { mutate, isLoading, error } = usePostData<void>("/hospital");

  const createHospital = (
    hospitalData: CreateHospitalData,
    setMessageData: Function
  ) => {
    mutate(hospitalData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["hospitals"],
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
    createHospital,
  };
};

export default useCreateHospital;
