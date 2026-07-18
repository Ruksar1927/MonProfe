import api from "../api/axios";

export const getDashboardData = async () => {
  const token = localStorage.getItem("token");

  const response = await api.get("/dashboard", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};