import * as admin from "firebase-admin";
import { parseArticleMeta } from "./article.model";
import { ArticlesCollection } from "./article";

const ApiName = "Sitemap";

export async function sitemapHandler(req, res) {
  console.log(ApiName + " requested", req.params);

  try {
    const articles = await admin
      .firestore()
      .collection(ArticlesCollection)
      .orderBy("publishAt", "desc")
      .where("publishAt", "<", Date.now())
      .where("status", "==", "published")
      .endBefore(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .get()
      .then(
        snapshot =>
          snapshot.empty
            ? []
            : snapshot.docs.map(doc => parseArticleMeta(doc.id, doc.data()))
      );

    if (articles.length <= 0) {
      return res.status(200).send("no article found");
    } else {
      var output = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
      `;
      output += articles
        .map(article => {
          const publishAt = new Date(article.publishAt).toISOString();
          return `
            <url>
              <loc>https://nhavaxe.vn/article/${article.id}</loc>
              <lastmod>${publishAt}</lastmod>
              <news:news>
                <news:publication>
                  <news:name>Kênh Tin Tức Nhà và Xe</news:name>
                  <news:language>vi</news:language>
                </news:publication>
                <news:publication_date>${publishAt}</news:publication_date>
                <news:title>${article.title}</news:title>
                <news:keywords>${article.tags.join()}</news:keywords>
              </news:news>
            </url>
          `;
        })
        .join("\r\n");
      output += `
        </urlset>
      `;
      return res.status(200).send(output);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
}
