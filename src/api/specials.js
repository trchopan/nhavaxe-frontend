import axios from "axios";

export const SpecialsApiUrl = process.env.VUE_APP_API + "/specials";

export const getSpecials = async function(api) {
  return await axios.get(api).then(respond => respond.data);
};
