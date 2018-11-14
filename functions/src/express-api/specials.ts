import * as admin from "firebase-admin";
import { CacheCollection } from "../config";
import { ISpecials } from "./specials.model";

const ApiName = "SpecialsApi";
const SpecialsDocPath = "specials";
const VideosDocPath = "videos";

export async function getSpecials(): Promise<ISpecials> {
  console.log(ApiName + " requested");
  try {
    const firestore = admin.firestore();
    const cacheCollection = firestore.collection(CacheCollection);
    const specialsRef = cacheCollection.doc(SpecialsDocPath);
    const videosRef = cacheCollection.doc(VideosDocPath);
    const results = await Promise.all([specialsRef.get(), videosRef.get()]);
    const specialsArticles = results[0].exists
      ? results[0]
          .data()
          .articles.filter(article => article !== null)
          .map(article => ({
            id: article.id,
            title: article.title,
            coverImg: article.coverImg
          }))
      : [];
    const specials = {
      title: results[0].data().title || "",
      articles: specialsArticles
    };
    const videos = results[1].exists ? results[1].data().videos : [];
    return { specials, videos };
  } catch (error) {
    console.error(ApiName + " error", error);
    return null;
  }
}
