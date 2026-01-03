import apiClient from "./apiClient";

export const getMe = async () => {
  const result = await apiClient.get("/user/me");
  return result.data
};

export const login = async (data) => {
  const result = await apiClient.post("/user/login", data);
  return result.data
};

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
