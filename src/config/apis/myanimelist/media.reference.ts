import {baseURL} from "./baseUrl";

export const getContentReferenceAPI = (malId: number) => {
    return {
        baseURL,
        getMediaFullInfo: `/anime/${malId}/full`,
        getMediaCharacters: `/anime/${malId}/characters`,
    };
};
