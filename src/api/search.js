import requestWYY from "@/utils/request";
import { request } from "@/utils/request";
export const findsearchSuggest = ({ keywords, limit }) => {
  return requestWYY("/cloudsearch", "get", { keywords, limit });
};
export const searchSongs = ({ keywords }) => {
  return request("/searchMusic", "get", { keywords });
};
