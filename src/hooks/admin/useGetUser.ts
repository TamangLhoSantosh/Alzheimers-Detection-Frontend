import { useAuth } from "../../components/generic/authContext";
import useGetData from "../generic/useGetData";

export interface UserData {
  id: number;
  username: String;
  first_name: String;
  middle_name: String;
  last_name: String;
  dob: String;
  gender: String;
  contact: String;
  address: String;
  email: String;
  password: String;
  is_admin: boolean;
  is_hospital_admin: boolean;
  is_verified: boolean;
  hospital_id: String;
}

const useGetUser = (query: string = "") => {
  const { user } = useAuth();
  if (user?.is_admin === false) {
    const id = user?.hospital_id;
    query = `hospital_id=${id}`;
  }
  return useGetData<UserData[]>("/user", "users", query);
};

export default useGetUser;
