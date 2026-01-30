import axiosInstance from "./axiosIntance";

const notesApi = {
  create: (formData) => axiosInstance.post("/notes", formData),
  getAll: () => axiosInstance.get("/notes"),
  update: (id, data) => axiosInstance.put(`/notes/${id}`, data),
  remove: (id) => axiosInstance.delete(`/notes/${id}`)
};

export default notesApi;
