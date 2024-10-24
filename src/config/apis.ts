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
};

export default apis;
