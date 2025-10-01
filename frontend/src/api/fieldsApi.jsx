import apiClient from "./apiClient";

export default async function getAllFields(page = 1, limit = 10) {
  try {
    const response = await apiClient.get(`/fields?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
