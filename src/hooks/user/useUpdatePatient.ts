import { useMutation } from "@tanstack/react-query";
import { PatientData } from "./useGetPatients";
import apiClient from "../../services/apiClient";

const useUpdatePatient = () => {
  const mutation = useMutation(async (patientData: PatientData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }
    console.log(patientData);
    try {
      const response = await apiClient.put(
        `/hospital/${patientData.hospital_id.toString()}/patient/${patientData.id.toString()}`,
        patientData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // You can return the response if needed
    } catch (error: any) {
      // Optionally handle specific error cases or log
      throw new Error(error?.response?.data?.message || "Error updating user");
    }
  });

  return {
    updatePatient: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdatePatient;
