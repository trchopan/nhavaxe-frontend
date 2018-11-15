import { getArticleRelated } from "./article";
import { handleNotFound, normText, handleResultJson } from "./helpers";
import { ARTICLE_CACHE, ARTICLE_SCACHE } from "../config";

const ApiName = "TagSearchApi";

export async function tagSearchHandler(req, res) {
  console.log(ApiName + " requested", req.params);
  let tags = req.params.id.split("|").map(x => normText(x));
  console.log(ApiName + " tags", tags);
  let result = await getArticleRelated(null, tags);
  return result.length > 0
    ? handleResultJson(res, result, ARTICLE_CACHE, ARTICLE_SCACHE)
    : handleNotFound(res);
}
