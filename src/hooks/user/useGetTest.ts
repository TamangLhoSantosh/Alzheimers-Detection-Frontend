import useGetData from "../generic/useGetData";

export interface TestData {
  id: number;
  patient_id: number;
  description: string;
  result: string;
}

const useGetTest = (query: string = "") => {
  const id = localStorage.getItem("hospital_id");
  const patient_id = localStorage.getItem("patient_id");
  return useGetData<TestData[]>(
    `/hospital/${id}/patient/${patient_id}/test`,
    "tests",
    query
  );
};

export default useGetTest;
