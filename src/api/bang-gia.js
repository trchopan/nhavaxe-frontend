import axios from "axios";

const ApiUrl = "https://nhavaxe.vn/api/bang-gia";

function parseNhaDoc(id, data) {
  return {
    id: id,
    project: data.project || "",
    investor: data.investor || "",
    location: data.location || "",
    progress: data.progress.split("//") || "",
    salePerks: data.salePerks.split("//") || [],
    avgPrice: data.avgPrice || 0,
    avgResalePrice: data.avgResalePrice || 0,
    contacts: data.contacts.split("//") || [],
    facilities: data.facilities.split("//") || [],
    publishAt: data.publishAt || 0,
    link: data.link || ""
  };
}

function parseXeDoc(id, data) {
  return {
    id: id,
    model: data.model || "",
    brand: data.brand || "",
    type: data.type || "",
    origin: data.origin || "",
    engine: data.engine || "",
    torque: data.torque || "",
    listPrice: data.listPrice || 0,
    salePrice: data.salePrice || 0,
    contacts: data.contacts.split("//") || [],
    publishAt: data.publishAt || 0
  };
}

export default {
  getBangGia(cb, errorCb) {
    const fetchNha = axios.get(`${ApiUrl}/nha`);
    const fetchXe = axios.get(`${ApiUrl}/xe`);

    Promise.all([fetchNha, fetchXe])
      .then(([nhaRes, xeRes]) => {
        const data = {};
        data.nha = nhaRes.data.map(doc => parseNhaDoc(doc.id, doc));
        data.xe = xeRes.data.map(doc => parseXeDoc(doc.id, doc));
        cb(data);
      })
      .catch(error => errorCb(error));
  }
};
