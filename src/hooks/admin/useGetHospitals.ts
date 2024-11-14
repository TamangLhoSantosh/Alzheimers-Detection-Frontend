import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/axiosClient";

export interface HospitalData {
  id: number;
  name: string;
  address: string;
  contact: string;
  email: string;
}

const getAccessToken = () => {
  return localStorage.getItem("token");
};

const useGetHospitals = () => {
  const fetchHospitals = async () => {
    const token = getAccessToken();

    const response = await apiClient.get<HospitalData[]>("/hospital", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  };

  const {
    data: hospitals,
    isLoading,
    error,
    refetch,
  } = useQuery<HospitalData[], Error>(["hospitals"], fetchHospitals, {
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 30 * 60 * 1000, // 30 minutes
    retry: 2,
  });

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  return {
    hospitals,
    loading: isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
};

export default useGetHospitals;
