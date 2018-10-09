import axios from "axios";

const ApiUrl = process.env.VUE_APP_API + "/banner";

function parseDoc(id, data) {
  return {
    ...data,
    id: id
  };
}

export default {
  getBannersList(cb, errorCb) {
    axios
      .get(ApiUrl)
      .then(respond => {
        const data = respond.data.map(doc => parseDoc(doc.id, doc));
        cb(data);
      })
      .catch(error => errorCb(error));
  }
};
