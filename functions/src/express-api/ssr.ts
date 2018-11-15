import { indexHtml } from "./index.html";
import { SiteUrl, ARTICLE_CACHE, ARTICLE_SCACHE } from "../config";
import { IArticle, IArticleMini, IArticleMicro } from "./article.model";
import {
  getCachedArticles,
  getArticleMeta,
  getArticleBody,
  getArticleRelated
} from "./article";
import { getSpecials } from "./specials";
import { ISpecials } from "./specials.model";
import { getBannersList } from "./banner";
import { IBanner } from "./banner.model";
import { normText } from "./helpers";

const ApiName = "SSR";
const defaultMeta = {
  title: "Kênh Tin Tức Nhà và Xe",
  sapo:
    "Thông tin 24h về thị trường địa ốc, bất động sản, nhà, xe ô tô, xe máy",
  tags: [
    "kênh tin tức",
    "thông tin",
    "bất động sản",
    "nhà",
    "xe",
    "ô tô",
    "xe máy",
    "địa ốc",
    "nhà ở",
    "tin tức",
    "thị trường",
    "bảng giá",
    "giá đất",
    "giá nhà",
    "giá ô tô",
    "giá xe",
    "news channel",
    "information",
    "real estate",
    "tphcm",
    "prices",
    "houses",
    "cars",
    "apartments"
  ],
  id: "",
  categoryId: "",
  coverImg: "/logo.png",
  categoryName: "Trang chủ",
  publishAt: new Date().getTime()
};

const BangGiaMeta = {
  ...defaultMeta,
  title: "Bảng giá - Kênh Tin Tức Nhà và Xe",
  sapo: "Bảng giá Bất động sản và Xe. Được cập nhật liên tục và chính xác.",
  categoryName: "Bảng giá",
  categoryId: "bang-gia",
  id: Math.random() > 0.5 ? "nha" : "xe"
};

const TagMeta = {
  ...defaultMeta,
  title: "Tag - Kênh Tin Tức Nhà và Xe",
  sapo: "Tìm kiếm nội dung theo tags",
  categoryName: "Tag",
  categoryId: "tag",
};

const NotFoundMeta = {
  ...defaultMeta,
  title: "404 Not found - Không tìm thấy bài viết",
  categoryName: "404 Not found",
};

export async function ssrHandler(req, res) {
  console.log(ApiName + " requested", req.params.module, req.params.id);

  try {
    const specials: ISpecials = await getSpecials();
    const banners: IBanner[] = await getBannersList();
    let list: IArticleMini[] = [];
    let meta: IArticle = NotFoundMeta as IArticle;
    let body: string = "";
    let related: IArticleMicro[] = [];

    if (!req.params.module) {
      meta = defaultMeta as IArticle;
      list = await getCachedArticles("ALL");
    }
    if (req.params.module === "article") {
      meta = await getArticleMeta(req.params.id);
      if (meta) {
        meta.categoryId = "article"
        body = await getArticleBody(req.params.id);
      } else {
        meta = NotFoundMeta as IArticle;
      }
      list = await getCachedArticles("ALL");
      related = await getArticleRelated(meta.id, meta.tags);
    }
    if (req.params.module === "bang-gia") {
      meta = BangGiaMeta as IArticle;
    }
    if (req.params.module === "tag") {
      meta = TagMeta as IArticle;
      meta.id = req.params.id as string;
      const tags = meta.id.split("|").map(x => normText(x));
      related = await getArticleRelated(null, tags);
    }

    return handleResult(
      res,
      indexHtml,
      { meta, body, list, related, specials, banners },
      ARTICLE_CACHE,
      ARTICLE_SCACHE
    );
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}

const handleResult = (
  res,
  html: string,
  data: {
    meta: IArticle;
    body: string;
    list: IArticleMini[];
    related: IArticleMicro[];
    specials: ISpecials;
    banners: IBanner[];
  },
  cacheMax,
  cacheSMax
) => {
  let output = html.replace("{ initialData: null }", JSON.stringify(data));
  output = output.replace(
    "<!-- BODY LIST SEO -->",
    generateArticleList(data.list)
  );
  output = output.replace("<!-- HEAD TAGS SEO -->", generateHead(data.meta));
  output = output.replace(
    "<!-- BODY CONTENT SEO -->",
    generateContent(data.meta)
  );
  output = output.replace(/\r?\n|\r/g, "");
  output = output.replace(/>\s*</g, "><");
  return res
    .set(`Cache-Control", "public, max-age=${cacheMax}, s-maxage=${cacheSMax}`)
    .status(200)
    .send(output);
};

const encodeSpecialChar = (html: string) =>
  html
    .replace(/&/g, "&amp;")
    .replace(/\'/g, "&#x27;")
    .replace(/\"/g, "&quot;")
    .replace(/>/g, "&gt;")
    .replace(/</g, "&lt;")
    .replace(/\//g, "&#x2F;");

function generateHead(data) {
  const tags = data.tags && data.tags.length ? data.tags.join() : "";
  return `
  <title>${data.title}</title>
  <meta name="description" content="${data.sapo}"/>
  <meta name="keywords" content="${tags}"/>
  <meta name="metakeywords" content="${tags}"/>
  <meta name="news_keywords" content="${tags}"/>
  <meta property="og:locale" content="vi_VN"/>
  <meta property="og:type" content="article"/>
  <meta property="og:title" content="${data.title}"/>
  <meta property="og:description" content="${data.sapo}"/>
  <meta property="og:url" content="${SiteUrl}/${data.categoryId}/${data.id}"/>
  <meta property="og:image" content="${data.coverImg}"/>
  <meta property="og:image:alt" content="${data.title}"/>
  <meta property="twitter:card" content="summary" />
  <meta property="twitter:site" content="${SiteUrl}" />
  <meta property="twitter:title" content="${data.title}" />
  <meta property="twitter:image" content="${data.coverImg}" />
  `;
}

function generateContent(article) {
  let title = encodeSpecialChar(article.title);
  let sapo = encodeSpecialChar(article.sapo);
  let publishAt = new Date(article.publishAt).toLocaleString();

  return `
  <div class="article-container">
    <h1 class="article-title">${title}</h1>
    <h2 class="article-category">${article.categoryName}</h2>
    <h3 class="article-sapo">${sapo}</h3>
    <div class="publish-at">${publishAt}</div>
  </div>
  `;
}

function generateArticleList(articles) {
  let list = articles.map(article => {
    let title = encodeSpecialChar(article.title);
    let sapo = encodeSpecialChar(article.sapo);
    let publishAt = new Date(article.publishAt).toLocaleString();
    return `
    <li>
      <a href="${SiteUrl}/article/${article.id}">
        <h4>${title}</h4>
      </a>
      <h5>${sapo}</h5>
      <span>${publishAt}</span>
    </li>
    `;
  });
  list = list.join("");
  let listHtml = `<div class="related-articles"><ul>${list}</ul></div>`;
  return listHtml;
}
