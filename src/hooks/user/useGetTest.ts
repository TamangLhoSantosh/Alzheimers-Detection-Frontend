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
  const id = localStorage.getItem("hospital_id");

  return useGetData<TestData[]>(
    test_id
      ? `/hospital/${id}/patient/${patient_id}/test/${test_id}`
      : `/hospital/${id}/patient/${patient_id}/test`,
    "tests",
    query
  );
};

export default useGetTest;
