import axiosClient from "./apiClient";

const apis = {
  createUserAccount(accountData: any) {
    return axiosClient.post("/user", accountData);
  },
};

export default apis;
