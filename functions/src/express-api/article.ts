import * as admin from "firebase-admin";
import { CacheCollection, ARTICLE_CACHE, ARTICLE_SCACHE } from "../config";
import {
  parseArticleMeta,
  parseArticleBody,
  parseArticleMetaMini,
  parseArticleMetaMicro,
  IArticleMicro,
  IArticleMini
} from "./article.model";
import {
  handleWrongParams,
  handleNotFound,
  handleResultJson,
  handleError,
  normText
} from "./helpers";

export const ArticlesCollection = "articles";
export const BodyCollection = "body";

const ApiName = "ArticleApi";
const ArticlesListLimit = 20;
const RelatedTagLimit = 5;

export async function getArticleHandler(req, res) {
  console.log(ApiName + " requested getArticleHandler", req.params);
  if (!req.params.id) {
    return handleWrongParams(res);
  }

  try {
    const meta = await getArticleMeta(req.params.id);
    if (!meta) return handleNotFound(res);

    const body = await getArticleBody(req.params.id);
    if (!body) return handleNotFound(res);

    const related = await getArticleRelated(req.params.id, meta.tags);

    return handleResultJson(
      res,
      { meta, body, related },
      ARTICLE_CACHE,
      ARTICLE_SCACHE
    );
  } catch (error) {
    return handleError(ApiName, res, error);
  }
}

export async function getArticlesListHandler(req, res) {
  console.log(ApiName + " requested", req.params);
  if (req.params.catId === undefined || req.params.startAfter === undefined) {
    return handleWrongParams(res);
  }

  try {
    let result;
    const startAfter = parseInt(req.params.startAfter, 10);
    if (!startAfter) {
      result = await getCachedArticles(req.params.catId);
    } else {
      result = await getArticlesByCategories(req.params.catId, startAfter);
    }
    if (result.length > 0) {
      return handleResultJson(res, result, ARTICLE_CACHE, ARTICLE_SCACHE);
    } else {
      return handleNotFound(res);
    }
  } catch (error) {
    return handleError(ApiName, res, error);
  }
}

export async function getArticleMeta(id) {
  return await admin
    .firestore()
    .collection(ArticlesCollection)
    .doc(id)
    .get()
    .then(meta => {
      if (
        !meta.exists ||
        meta.data().status !== "published" ||
        meta.data().publishAt > Date.now()
      ) {
        return null;
      }
      return parseArticleMeta(meta.id, meta.data());
    });
}

export async function getArticleBody(id) {
  return await admin
    .firestore()
    .collection(ArticlesCollection)
    .doc(id)
    .collection(BodyCollection)
    .orderBy("modifiedAt", "desc")
    .limit(1)
    .get()
    .then(bodies => {
      if (bodies.empty) {
        return "";
      }
      return parseArticleBody(bodies.docs[0].data());
    });
}

export async function getArticleRelated(
  id: string,
  tags: string[]
): Promise<IArticleMicro[]> {
  const tagsRelatedPromises = tags.map(tag =>
    admin
      .firestore()
      .collection(ArticlesCollection)
      .where("tagsNorm", "array-contains", normText(tag))
      .where("status", "==", "published")
      .where("publishAt", "<", Date.now())
      .orderBy("publishAt", "desc")
      .limit(5)
      .get()
      .then(res =>
        res.empty
          ? []
          : res.docs.map(doc => parseArticleMetaMicro(doc.id, doc.data()))
      )
  );

  return await Promise.all(tagsRelatedPromises).then((results: any) => {
    return results
      .reduce((acc, cur) => acc.concat(cur), [])
      .sort((a, b) => (a.id > b.id ? 1 : -1))
      .reduce((acc, cur) => {
        if (acc.length <= 0 || acc[acc.length - 1].article.id !== cur.id) {
          acc.push({ article: cur, relevant: 1 });
        } else {
          acc[acc.length - 1].relevant++;
        }
        return acc;
      }, [])
      .sort((a, b) => b.relevant - a.relevant)
      .map(x => x.article)
      .filter(x => x.id !== id);
  });
}

export async function getCachedArticles(catId): Promise<IArticleMini[]> {
  console.log(ApiName + " requested getCacheArticles");

  const result = await admin
    .firestore()
    .collection(CacheCollection)
    .doc(`cat_${catId}`)
    .get()
    .then(snapshot => {
      if (snapshot.exists && snapshot.data().timeStamp > Date.now()) {
        console.log(ApiName + " serve from cache");
        return snapshot.data().cache as IArticleMini[];
      } else {
        console.log(ApiName + " no cache found");
        return [];
      }
    });

  if (result.length > 0) {
    return result;
  } else {
    let docs = await getArticlesByCategories(catId, Date.now());
    await admin
      .firestore()
      .collection(CacheCollection)
      .doc(`cat_${catId}`)
      .set({
        cache: docs,
        timeStamp: Date.now() + ARTICLE_SCACHE * 1000
      });
    return docs;
  }
}

export async function getArticlesByCategories(
  catId: string,
  startAfter: number
) {
  let query = admin
    .firestore()
    .collection(ArticlesCollection)
    .orderBy("publishAt", "desc");
  if (catId !== "ALL") {
    query = query.where("categoryId", "==", catId);
  }
  let result = await query
    .where("status", "==", "published")
    .startAfter(startAfter)
    .limit(ArticlesListLimit)
    .get();

  if (result.empty) {
    return [];
  } else {
    return result.docs.map(doc => parseArticleMetaMini(doc.id, doc.data()));
  }
}

export function getRelatedArticleTagHandler(req, res) {
  console.log(ApiName + " requested", req.params);
  if (!req.params.tag) {
    return handleWrongParams(res);
  }

  return admin
    .firestore()
    .collection(ArticlesCollection)
    .orderBy("publishAt", "desc")
    .where("publishAt", "<", Date.now())
    .where("status", "==", "published")
    .where("tags", "array-contains", req.params.tag)
    .limit(RelatedTagLimit)
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        return handleNotFound(res);
      }

      const result = snapshot.docs.map(doc =>
        parseArticleMeta(doc.id, doc.data())
      );
      return handleResultJson(res, result, ARTICLE_CACHE, ARTICLE_SCACHE);
    })
    .catch(err => handleError(ApiName, res, err));
}
