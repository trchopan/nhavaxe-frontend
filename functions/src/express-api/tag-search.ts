import * as admin from "firebase-admin";
import { getArticleRelated } from "./article";
import {
  handleNotFound,
  normText,
  handleResultJson,
  handleError
} from "./helpers";
import {
  ARTICLE_CACHE,
  ARTICLE_SCACHE,
  TAG_CACHE,
  TAG_SCACHE
} from "../config";
import { IArticle } from "./article.model";
import { ITag } from "./tag.model";

const ApiName = "TagSearchApi";
const CLOUD_SEARCH_LENGTH = 3; // days
export const TagSearchAmount = 10;

export async function tagSearchHandler(req, res) {
  try {
    console.log(ApiName + " tagSearch requested", req.params);
    let tags = req.params.id.split("|").map(x => normText(x));
    console.log(ApiName + " tags", tags);
    let result = await getArticleRelated(null, tags, TagSearchAmount);
    return result.length > 0
      ? handleResultJson(res, result, ARTICLE_CACHE, ARTICLE_SCACHE)
      : handleNotFound(res);
  } catch (error) {
    return handleError(ApiName, res, error);
  }
}

export async function tagCloudHander(req, res) {
  console.log(ApiName + " tagCloud requested", req.params);
  try {
    let result = await admin
      .firestore()
      .collection("tags")
      .doc("cloud")
      .get();
    if (
      result.exists &&
      result.data().timeStamp &&
      result.data().timeStamp > Date.now()
    ) {
      result = result.data().cloud;
      return handleResultJson(res, result, TAG_CACHE, TAG_SCACHE);
    }

    let blackList = await admin
      .firestore()
      .collection("tags")
      .doc("blacklist")
      .get()
      .then(result => result.exists ? result.data().blacklist : []);

    let articlesSnaps = await admin
      .firestore()
      .collection("articles")
      .where("status", "==", "published")
      .orderBy("publishAt", "desc")
      .endBefore(Date.now() - 1000 * 60 * 60 * 24 * CLOUD_SEARCH_LENGTH)
      .get();

    if (articlesSnaps.empty) {
      return handleNotFound(res);
    }

    let cloud = _filterBlackList(articlesSnaps.docs
      .map(doc => doc.data())
      .map(x => {
        return x.tags
          ? x.tags.map((y, i) => ({
              text: y,
              norm: x.tagsNorm ? x.tagsNorm[i] : normText(y),
              relevant: 1
            }))
          : [];
      })
      .reduce((acc, cur) => acc.concat(cur), new Array<ITag>())
      .sort((a, b) => (a.norm >= b.norm ? 1 : -1))
      .reduce((acc, cur) => {
        if (acc.length <= 0 || acc[acc.length - 1].norm !== cur.norm) {
          acc.push(cur);
        } else {
          acc[acc.length - 1].relevant++;
        }
        return acc;
      }, new Array<ITag>())
      .sort((a, b) => b.relevant - a.relevant), blackList)
      .slice(0, 23);

    await admin
      .firestore()
      .collection("tags")
      .doc("cloud")
      .set({ cloud: cloud, timeStamp: Date.now() + TAG_CACHE * 1000 });

    return handleResultJson(res, cloud, TAG_CACHE, TAG_SCACHE);
  } catch (error) {
    return handleError(ApiName, res, error);
  }
}

function _filterBlackList(cloud: ITag[], blacklist: ITag[]) {
  return cloud.filter(x => !blacklist.find(y => y.norm === x.norm));
}