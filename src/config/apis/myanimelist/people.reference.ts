import { baseURL } from "./baseUrl";

export const getPeopleAPI = (malId: number) => {
  return {
    baseURL,
    getPeopleInfo: `/people/${malId}`,
  };
};
