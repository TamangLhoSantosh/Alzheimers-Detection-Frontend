import { useAuth } from "../../components/generic/authContext";
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
  const { user } = useAuth();
  if (user?.is_admin) {
    return useGetData<PatientData[]>("/patient", "patients", query);
  }
  return useGetData<PatientData[]>(
    `/hospital/${user?.hospital_id}/patient`,
    "patients",
    query
  );
};

export default useGetPatient;
