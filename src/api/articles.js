import axios from "axios";

const ApiUrl = process.env.VUE_APP_API;
const ListAllParams = "ALL";

export async function getArticlesList(categoryId, startAfter) {
  let catId = categoryId === "/" ? ListAllParams : categoryId;

  const result = await axios.get(`${ApiUrl}/list/${startAfter}/${catId}`);
  return result.data;
}

export async function getArticle(id) {
  const result = await axios.get(`${ApiUrl}/article/${id}`);
  return result.data;
}

export async function getRelatedList(tags) {
  const tagsResultPromises = tags.map(tag =>
    axios.get(`${ApiUrl}/relate/${tag}`).then(respond => respond.data)
  );
  return await Promise.all(tagsResultPromises);
}
