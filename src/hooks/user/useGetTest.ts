import { useAuth } from "../../components/generic/authContext";
import useGetData from "../generic/useGetData";

export interface TestData {
  id: number;
  description: string;
  result: string;
  test_images?: [
    {
      image_url: string;
      patient_id: number;
      id: number;
    }
  ];
}

const useGetTest = (
  patient_id: string | undefined,
  test_id: string | undefined,
  query: string = ""
) => {
  const { user } = useAuth();

  return useGetData<TestData | TestData[]>(
    test_id
      ? `/hospital/${user?.hospital_id}/patient/${patient_id}/test/${test_id}`
      : `/hospital/${user?.hospital_id}/patient/${patient_id}/test`,
    "tests",
    query
  );
};

export default useGetTest;
