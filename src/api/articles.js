import axios from "axios";

const ApiUrl = process.env.VUE_APP_API;
const ListAllParams = "ALL";

export const articleParser = function(data) {
  return {
    ...data,
    style: data.style || "article",
    publishAt: data.publishAt || 0,
    tags: data.tags || []
  };
};

export async function getArticlesList(categoryId, startAfter, parser) {
  let catId = categoryId === "/" ? ListAllParams : categoryId;

  const result = await axios.get(`${ApiUrl}/list/${startAfter}/${catId}`);
  return result.data.map(value => parser(value));
}
export async function getArticle(id, parser) {
  const result = await axios.get(`${ApiUrl}/article/${id}`);
  return parser(result.data);
}
export async function getRelatedList(tags) {
  const tagsResultPromises = tags.map(tag =>
    axios.get(`${ApiUrl}/relate/${tag}`).then(respond => respond.data)
  );
  return await Promise.all(tagsResultPromises);
}
