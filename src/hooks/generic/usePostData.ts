import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import apiClient from "../../services/apiClient";

interface UsePostDataResult<T> {
  data: T | null;
  error: string | null;
  isLoading: boolean;
  mutate: (
    postData: unknown,
    options?: {
      onSuccess?: (data: T) => void;
      onError?: (error: AxiosError) => void;
    }
  ) => void;
}

const usePostData = <T>(
  endpoint: string,
  defaultHeaders?: Record<string, string>
): UsePostDataResult<T> => {
  const { mutate, data, error, isLoading } = useMutation<
    T,
    AxiosError,
    unknown
  >(async (postData) => {
    const authToken = localStorage.getItem("token");
    const headers: Record<string, string> = {
      ...defaultHeaders,
    };

    if (authToken) {
      headers.Authorization = `Bearer ${authToken}`;
    }

    const response = await apiClient.post<T>(endpoint, postData, {
      headers,
    });

    return response.data;
  });

  return {
    data: data || null,
    error: (error?.response?.data as { detail: string })?.detail || null,
    isLoading,
    mutate,
  };
};

export default usePostData;
