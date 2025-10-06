import apiClient from "./apiClient";

export const getAllSection = async (page = 1, limit = 20) => {
  try {
    const response = await apiClient.get("/sections");
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createNewSection = async (name) => {
  try {
    const response = await apiClient.post("/section", { name });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
