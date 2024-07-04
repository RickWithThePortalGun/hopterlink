import request from "@/utils/http-request";

export const getSearchResults = async (query: string) => {
  const uri = "/search";
  try {
    const result = await request.get(uri, {
      params: {
        query,
      },
    });
    return result.data.results;
  } catch (error) {
    console.error("Error fetching categories:", error);
  }
};
