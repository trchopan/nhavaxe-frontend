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
      .endBefore(Date.now() - 30 * 24 * 60 * 60 * 1000)
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
      var bangGiaLastMod = new Date(Date.now() - 60 * 60 * 1000).toISOString();
      var output = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        <url>
          <loc>https://nhavaxe.vn/bang-gia/nha</loc>
          <lastmod>${bangGiaLastMod}</lastmod>
        </url>
        <url>
          <loc>https://nhavaxe.vn/bang-gia/xe</loc>
          <lastmod>${bangGiaLastMod}</lastmod>
        </url>
        `;
      output += articles
        .map(article => {
          const publishAt = new Date(article.publishAt).toISOString();
          return `
            <url>
              <loc>https://nhavaxe.vn/article/${article.id}</loc>
              <lastmod>${publishAt}</lastmod>
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
