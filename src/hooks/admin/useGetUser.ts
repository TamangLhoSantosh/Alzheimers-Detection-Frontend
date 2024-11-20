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
}

const useGetUser = (query: string = "") => {
  return useGetData<UserData[]>("/user", "users", query);
};

export default useGetUser;
