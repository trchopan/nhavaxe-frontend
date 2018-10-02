import axios from "axios";

export const BangGiaApiUrl = process.env.VUE_APP_API + "/getBangGia";

export const nhaParser = function(data) {
  return {
    ...data,
    salePerks:
      data.salePerks && typeof data.salePerks === "string"
        ? data.salePerks.split("//")
        : [],
    contacts:
      data.contacts && typeof data.contacts === "string"
        ? data.contacts.split("//")
        : [],
    others:
      data.others && typeof data.others === "string"
        ? data.others.split("//")
        : []
  };
};
export const xeParser = function(data) {
  return {
    ...data,
    contacts:
      data.contacts && typeof data.contacts === "string"
        ? data.contacts.split("//")
        : []
  };
};

export const getBangGia = async function(api, nhaParser, xeParser) {
  const result = await axios.get(api);
  const nha = result.data.nha.map(value => nhaParser(value));
  const xe = result.data.xe.map(value => xeParser(value));
  return { nha, xe };
};
