import { useMutation } from "@tanstack/react-query";
import { PatientData } from "./useGetPatients";
import apiClient from "../../services/apiClient";

const useUpdatePatient = () => {
  const mutation = useMutation(async (patientData: PatientData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    const response = await apiClient.put(
      `/hospital/${patientData.hospital_id.toString()}/patient/${patientData.id.toString()}`,
      patientData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });

  const updatePatient = async (
    patientData: PatientData,
    setMessageData: Function
  ) => {
    try {
      const response = await mutation.mutateAsync(patientData);
      // Handle success
      setMessageData({
        message: response.message ?? "Patient detail updated successfully!",
        title: "Success",
        open: true,
      });
    } catch (error: any) {
      // Handle error
      setMessageData({
        message:
          (error.response?.data as { detail?: string })?.detail ||
          error.message,
        title: "Error",
        open: true,
      });
    }
  };

  return {
    updatePatient,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdatePatient;
