// import firebase from "../firebase.js";
import { stubCategories } from "./stubData.js";

function parseDoc(id, data) {
  return {
    id: id,
    name: data.name,
    position: data.position
  };
}

export default {
  getCategories(cb, errorCb) {
    if (!stubCategories) {
      errorCb({ code: "error" });
      return;
    }
    const data = stubCategories.map(doc => parseDoc(doc.id, doc));
    cb(data);
  }
};
