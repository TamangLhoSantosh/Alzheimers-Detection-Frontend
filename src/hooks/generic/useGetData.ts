import { useQuery } from "@tanstack/react-query";
import apiClient from "../../services/apiClient";

export interface FetchResponse<T> {
  count: number;
  results: T[];
}

const useGetData = <T>(
  endpoint: string,
  queryKey: string,
  query: string = ""
) => {
  const fetchData = async (): Promise<T> => {
    const authToken = localStorage.getItem("token");
    const headers: Record<string, string> = authToken
      ? { Authorization: `Bearer ${authToken}` }
      : {};

    const response = await apiClient.get<T>(`${endpoint}?search=${query}`, {
      headers,
    });

    return response.data;
  };

  const { data, isLoading, error, refetch } = useQuery(
    [queryKey, endpoint, query],
    fetchData,
    {
      staleTime: 60000,
      retry: 2,
    }
  );

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return "An unknown error occurred";
  };

  return {
    data,
    isLoading,
    error: error ? getErrorMessage(error) : null,
    refetch,
  };
};

export default useGetData;
