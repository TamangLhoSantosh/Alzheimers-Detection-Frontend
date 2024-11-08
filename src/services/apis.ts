import axiosClient from "./axiosClient";

const apis = {
  login(loginData: any) {
    return axiosClient.post("/auth/login", loginData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  createUserAccount(accountData: any) {
    return axiosClient.post("/user", accountData);
  },

  createHospital(hospitalData: any) {
    return axiosClient.post("/hospital", hospitalData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },

  getHospitalData() {
    return axiosClient.get("/hospital", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
  },
};

export default apis;
