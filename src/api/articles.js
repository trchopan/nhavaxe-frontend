import axios from "axios";

const ApiUrl = "https://nhavaxe.vn/api";
const ListAllParams = "ALL";

function parseDoc(id, data) {
  return {
    id: id,
    coverImg: data.coverImg || null,
    title: data.title || null,
    sapo: data.sapo || null,
    video: data.video || null,
    style: data.style || "article",
    categoryId: data.categoryId || null,
    categoryName: data.categoryName || null,
    publisher: data.publisher || null,
    reference: data.reference || null,
    publishAt: data.publishAt || 0,
    tags: data.tags || []
  };
}

export default {
  getArticlesList(categoryId, startAfter, cb, errorCb) {
    let catId = categoryId === "/" ? ListAllParams : categoryId;

    axios
      .get(`${ApiUrl}/list/${startAfter}/${catId}`)
      .then(respond => {
        const data = respond.data.map(doc => parseDoc(doc.id, doc));
        cb(data);
      })
      .catch(error => errorCb(error));
  },
  getArticleMeta(id, cb, errorCb) {
    axios
      .get(`${ApiUrl}/meta/${id}`)
      .then(respond => {
        cb(respond.data);
      })
      .catch(error => errorCb(error));
  },
  getArticleBody(id, cb, errorCb) {
    axios
      .get(`${ApiUrl}/body/${id}`)
      .then(respond => {
        cb(respond.data.body);
      })
      .catch(error => errorCb(error));
  },
  getRelatedList(tags, cb, errorCb) {
    const tagsResultPromises = tags.map(tag =>
      axios.get(`${ApiUrl}/relate/${tag}`).then(respond => respond.data)
    );
    Promise.all(tagsResultPromises)
      .then(results => cb(results))
      .catch(error => errorCb(error));
  }
};
