import apiClient from "./apiClient";

export const registerUser = async (data) => {
  try {
    const result = await apiClient.post("/newUser", data);
    return result.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};

export const confirmUserEmail = async (token) => {
  try {
    const result = await apiClient.get(`confirm/${token}`);
    return result.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
};
