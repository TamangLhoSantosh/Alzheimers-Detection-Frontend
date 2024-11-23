import { useMutation } from "@tanstack/react-query";
import { UserData } from "./useGetUser";
import apiClient from "../../services/apiClient";

const useUpdateUser = () => {
  const mutation = useMutation(async (userData: UserData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    try {
      const response = await apiClient.put(
        `/user/${userData.id.toString()}`,
        userData,
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
    updateUser: mutation.mutateAsync,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdateUser;
