import { useMutation } from "@tanstack/react-query";
import { HospitalData } from "./useGetHospitals";
import apiClient from "../../services/axiosClient";

const useUpdateHospital = () => {
  const mutation = useMutation(async (hospitalData: HospitalData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await apiClient.put(
        `/hospital/${hospitalData.id.toString()}`,
        hospitalData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // You can return the response if needed
    } catch (error: any) {
      // Optionally handle specific error cases or log
      throw new Error(
        error?.response?.data?.message || "Error updating hospital"
      );
    }
  });

  return {
    updateHospital: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdateHospital;
