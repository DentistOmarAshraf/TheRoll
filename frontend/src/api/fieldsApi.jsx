import axios from "axios";
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

export async function testing() {
  try {
    const response = await axios.get(
      "https://jsonplaceholder.typicode.com/todos/1"
    );
    return response.data;
  } catch (e) {
    console.error(e);
    throw error;
  }
}
