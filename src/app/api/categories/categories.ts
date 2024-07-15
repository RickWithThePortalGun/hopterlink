import request from "@/utils/http-request";

export const getCategories = async () => {
  const uri = "/api/categories";
  try {
    const result = await request.get(uri);
    console.log(result);
    return result.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const getRecentReviews = async (page = 1) => {
  const uri = `/latest-reviews/?page=${page}`;
  try {
    const result = await request.get(uri);
    console.log(result);
    return result.data; // Adjusted to return the entire response
  } catch (error) {
    console.error("Error fetching reviews:", error);
  }
};

export const getCategory = async (id) => {
  const uri = `/api/categories/${id}`;
  try {
    const result = await request.get(uri);
    const response = result.data;
    console.log(response);
    return response;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};

export const getBusinessInfo = async (slug: string) => {
  const uri = "/businesses";
  try {
    const { data } = await request.get(`${uri}?slug=${slug}`);
    return data.results[0];
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
