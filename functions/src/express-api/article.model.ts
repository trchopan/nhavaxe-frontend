export interface IArticle {
  id: string;
  coverImg: string;
  title: string;
  sapo: string;
  video: string;
  style: string;
  categoryId: string;
  categoryName: string;
  publisher: string;
  reference: string;
  publishAt: number;
  tags: string[];
  tagsNorm: string[];
}

export interface IArticleMini {
  id: string;
  coverImg: string;
  title: string;
  sapo: string;
  publishAt: number;
}

export interface IArticleMicro {
  id: string;
  coverImg: string;
  title: string;
}

export interface IArticleBody {
  body: string;
}

export const parseArticleBody = bodyData => bodyData.body as string || ""

export const parseArticleMetaMicro = (id, articleData) =>
  ({
    id: id,
    coverImg: articleData.coverImg || null,
    title: articleData.title || null
  } as IArticleMicro);

export const parseArticleMetaMini = (id, articleData) =>
  ({
    id: id,
    coverImg: articleData.coverImg || null,
    title: articleData.title || null,
    sapo: articleData.sapo || null,
    publishAt: articleData.publishAt || 0
  } as IArticleMini);

export const parseArticleMeta = (id, articleData) =>
  ({
    id: id,
    coverImg: articleData.coverImg || null,
    title: articleData.title || null,
    sapo: articleData.sapo || null,
    video: articleData.video || null,
    style: articleData.style || "article",
    categoryId: articleData.categoryId || null,
    categoryName: articleData.categoryName || null,
    publisher: articleData.publisher || null,
    reference: articleData.reference || null,
    publishAt: articleData.publishAt || 0,
    tags: articleData.tags || []
  } as IArticle);
