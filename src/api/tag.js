import axios from "axios";

export const TagApiUrl = process.env.VUE_APP_API + "/tag";
export const TagCloudApiUrl = process.env.VUE_APP_API + "/tagCloud";

export const getTagQueryResult = async function(api, tagQuery) {
  const result = await axios.get(`${api}/${tagQuery}`);
  return result.data;
};

export const getTagCloud = async function(api) {
  const result = await axios.get(`${api}`);
  return result.data;
};
