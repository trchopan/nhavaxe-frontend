import axios from "axios";

export const TagApiUrl = process.env.VUE_APP_API + "/tag";

export const getTagQueryResult = async function(api, tagQuery) {
  return await axios.get(`${api}/${tagQuery}`);
};
