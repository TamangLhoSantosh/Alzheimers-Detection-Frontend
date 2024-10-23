import axiosClient from "./axiosClient";

const apis = {
  login(loginData: any) {
    return axiosClient.post("/auth/login", loginData);
  },

  createUserAccount(accountData: any) {
    return axiosClient.post("/user", accountData);
  },
};

export default apis;
