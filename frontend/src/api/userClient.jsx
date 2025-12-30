import apiClient from "./apiClient";

export const confirmUserEmail = async (token) => {
  try {
    const result = await apiClient.get(`confirm/${token}`);
    return result.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
