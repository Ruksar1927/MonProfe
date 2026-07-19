import api from "../api/axios";

const getToken = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});

export const getSubjects = async () => {
  const response = await api.get("/subjects", getToken());
  return response.data;
};

export const createSubject = async (name) => {
  const response = await api.post(
    "/subjects",
    { name },
    getToken()
  );

  return response.data;
};

export const deleteSubject = async (id) => {
  await api.delete(
    `/subjects/${id}`,
    getToken()
  );
};

export const updateSubject = async (id, name) => {
  const response = await api.put(
    `/subjects/${id}`,
    { name },
    getToken()
  );

  return response.data;
};