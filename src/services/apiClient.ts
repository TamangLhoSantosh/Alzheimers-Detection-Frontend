import axios from "axios";

// Create an Axios instance
const apiClient = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default apiClient;

apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const refreshToken = localStorage.getItem("refresh");
    if (error.response.status === 401) {
      // If refresh token is available, attempt to refresh the token
      if (refreshToken) {
        try {
          const response = await apiClient.post("/auth/refresh-token", {
            refresh_token: refreshToken,
          });
          localStorage.setItem("token", response.data.access_token); // Update the token
          error.config.headers[
            "Authorization"
          ] = `Bearer ${response.data.accessToken}`;
          return apiClient.request(error.config); // Retry the failed request
        } catch (refreshError) {
          console.error("Token refresh failed", refreshError);
        }
      }
      localStorage.clear();
      window.location.replace("/login");
    }
    return Promise.reject(error);
  }
);
