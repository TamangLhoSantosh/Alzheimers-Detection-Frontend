import useGetData from "../generic/useGetData";

export interface PatientData {
  id: number;
  first_name: String;
  middle_name: String;
  last_name: String;
  dob: String;
  gender: String;
  contact: String;
  address: String;
  user_id: String;
  hospital_id: String;
}

const useGetPatient = (query: string = "") => {
  const id = localStorage.getItem("hospital_id");
  return useGetData<PatientData[]>(
    `/hospital/${id}/patient`,
    "patients",
    query
  );
};

export default useGetPatient;
