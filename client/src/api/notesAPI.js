import axiosInstance from "./axiosIntance";

const notesApi = {
  create: (data) => axiosInstance.post("/notes", data),
  getAll: () => axiosInstance.get("/notes"),
  update: (id, data) => axiosInstance.put(`/notes/${id}`, data),
  remove: (id) => axiosInstance.delete(`/notes/${id}`)
};

export default notesApi;
