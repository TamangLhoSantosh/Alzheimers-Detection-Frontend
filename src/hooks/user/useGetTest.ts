import { useAuth } from "../../components/generic/authCotext";
import useGetData from "../generic/useGetData";

export interface TestData {
  id: number;
  patient_id: number;
  description: string;
  result: string;
}

const useGetTest = (
  patient_id: string | undefined,
  test_id: string | undefined,
  query: string = ""
) => {
  const { user } = useAuth();

  return useGetData<TestData[]>(
    test_id
      ? `/hospital/${user?.hospital_id}/patient/${patient_id}/test/${test_id}`
      : `/hospital/${user?.hospital_id}/patient/${patient_id}/test`,
    "tests",
    query
  );
};

export default useGetTest;
