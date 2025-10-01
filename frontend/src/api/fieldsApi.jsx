import apiClient from "./apiClient";

export default async function getAllFields(page = 1, limit = 20) {
  try {
    const response = await apiClient.get("/fields");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}
