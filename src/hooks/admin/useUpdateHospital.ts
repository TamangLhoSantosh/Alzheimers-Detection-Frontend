import { useMutation } from "@tanstack/react-query";
import { HospitalData } from "./useGetHospitals";
import apiClient from "../../services/apiClient";

const useUpdateHospital = () => {
  const mutation = useMutation(async (hospitalData: HospitalData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await apiClient.put(
      `/hospital/${hospitalData.id.toString()}`,
      hospitalData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });

  const updateHospital = async (
    hospitalData: HospitalData,
    setMessageData: Function
  ) => {
    try {
      const response = await mutation.mutateAsync(hospitalData);
      // Handle success
      setMessageData({
        message: response.message ?? "Hospital updated successfully!",
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
    updateHospital,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdateHospital;
