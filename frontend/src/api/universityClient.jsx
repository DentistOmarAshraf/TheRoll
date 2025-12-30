import apiClient from "./apiClient";

export const getUniversities = async (page = 1, limit = 50) => {
  try {
    const result = await apiClient.get("/universities", {
      params: { page, limit },
    });
    return result.data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};
