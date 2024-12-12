import usePostData from "../generic/usePostData";
import { AxiosError } from "axios";
import { useAuth } from "../../components/generic/authContext";

interface Props {
  patient_id: string | undefined;
  test_id: string | undefined;
}

interface UploadImageProps {
  image: File;
}

const useUploadImage = ({ patient_id, test_id }: Props) => {
  const { user } = useAuth();

  // Define the API endpoint dynamically using template literals
  const { mutate, isLoading, error } = usePostData<void>(
    `/hospital/${user?.hospital_id}/patient/${patient_id}/test/${test_id}/test_image`,
    {
      "Content-Type": "multipart/form-data",
    }
  );

  // Function to handle image upload
  const uploadImage = ({ image }: UploadImageProps) => {
    mutate(
      { image: image },
      {
        onSuccess: () => {
          // Handle success logic here (optional)
          console.log("Image uploaded successfully");
        },
        onError: (err: unknown) => {
          if (err instanceof AxiosError) {
            // Log specific Axios error
            console.error(
              "Error uploading image:",
              err.response?.data || err.message
            );
          } else {
            // Log any other unexpected errors
            console.error("Unexpected error:", err);
          }
        },
      }
    );
  };

  return {
    isLoading,
    error,
    uploadImage,
  };
};

export default useUploadImage;
