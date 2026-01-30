import axiosInstance from "./axiosIntance";

const authApi = {
  signup: (formData) =>
    axiosInstance.post("/auth/signup", formData),

  login: (formData) =>
    axiosInstance.post(
      "/auth/login",
      formData,
      { withCredentials: true }
    ),

  logout: () =>
    axiosInstance.post(
      "/auth/logout",
      {},
      { withCredentials: true }
    ),

  checkAuth: () =>
    axiosInstance.get(
      "/auth/checkauth",
      { withCredentials: true }
    )
};

export default authApi;
