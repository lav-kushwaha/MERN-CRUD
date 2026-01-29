import axiosInstance from "./axiosIntance";

const authApi = {
  login: (formData, config = {}) =>
    axiosInstance.post("/auth/login", formData, config),

  logout: () =>
    axiosInstance.post("/auth/logout", {}, { withCredentials: true }), //Send the cookies that belong to this backend along with this request.

  checkAuth: () =>
    axiosInstance.get("/auth/checkauth", { withCredentials: true })
};

export default authApi;