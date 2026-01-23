export const getContentReferenceAPI = (malId: number) => {
  return {
    baseURL: "https://api.jikan.moe/v4",
    getMediaFullInfo: `/anime/${malId}/full`,
  };
};
