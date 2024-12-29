import { useMutation } from "@tanstack/react-query";
import { UserData } from "./useGetUser";
import apiClient from "../../services/apiClient";

const useUpdateUser = () => {
  const mutation = useMutation(async (userData: UserData) => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Token not found");
    }

    const response = await apiClient.put(
      `/user/${userData.id.toString()}`,
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  });

  const updateUser = async (userData: UserData, setMessageData: Function) => {
    try {
      const response = await mutation.mutateAsync(userData);

      // Handle success
      setMessageData({
        message: response.message ?? "User updated successfully!",
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
    updateUser,
    isLoading: mutation.isLoading,
    error: mutation.error,
  };
};

export default useUpdateUser;
