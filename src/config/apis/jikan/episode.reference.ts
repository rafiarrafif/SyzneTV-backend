import { baseURL } from "./baseUrl";

export const getEpisodeReferenceAPI = (malId: number) => {
  return {
    baseURL,
    getEpisodeList: `/anime/${malId}/episodes`,
  };
};
