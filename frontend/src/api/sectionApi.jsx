import apiClient from "./apiClient";

const getAllSection = async (page = 1, limit = 20) =>{
  try {
    const response = await apiClient.get("/sections");
    return response.data;
  } catch (error) {
    console.error(error);
    throw(error);
  }
}

const createNewSection = async (name) => {
  try {
    const response = await apiClient.post("/section");
    return response.data;
  } catch (error) {
    console.error(error);
    throw(error);
  }
}

export default {createNewSection, getAllSection};