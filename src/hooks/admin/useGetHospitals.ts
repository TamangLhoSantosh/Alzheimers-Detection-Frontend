import useGetData from "../generic/useGetData";

export interface HospitalData {
  id: number;
  name: string;
  address: string;
  contact: string;
  email: string;
}

const useGetHospitals = (query: string = "") => {
  return useGetData<HospitalData[]>("/hospital", "hospitals", query);
};

export default useGetHospitals;
