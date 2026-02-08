import api from "./api";

export const getProfileSummary = async () => {
  const response = await api.get("/profile/summary");
  return response.data.data;
};
