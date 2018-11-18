import * as admin from "firebase-admin";
import { BANNER_CACHE, BANNER_SCACHE, CacheCollection } from "../config";
import { parseBanner, IBanner } from "./banner.model";

export const BannersCollection = "banners";
export const CacheBannerDocPath = "banner";
const ApiName = "Banner";

export async function getBannersList(): Promise<IBanner[]> {
  console.log(ApiName + " requested");

  try {
    let cacheResult = await admin
      .firestore()
      .collection(CacheCollection)
      .doc(CacheBannerDocPath)
      .get()
      .then(snapshot => {
        if (snapshot.exists && snapshot.data().timeStamp > Date.now()) {
          console.log(ApiName + " serve from cache");
          return snapshot.data().cache as IBanner[];
        } else {
          console.log(ApiName + " no cache found");
          return [];
        }
      });

    if (cacheResult.length > 0) {
      return cacheResult;
    }

    let result = await admin
      .firestore()
      .collection(BannersCollection)
      .orderBy("expire", "desc")
      .where("status", "==", "active")
      .where("expire", ">", Date.now())
      .get()
      .then(snapshot => {
        if (snapshot.size > 0) {
          return snapshot.docs.map(doc => parseBanner(doc.id, doc.data()));
        } else {
          return [];
        }
      });
    if (result.length > 0) {
      await admin
        .firestore()
        .collection(CacheCollection)
        .doc(CacheBannerDocPath)
        .set({
          cache: result,
          timeStamp: Date.now() + BANNER_CACHE * 1000
        });
    }
    console.log(
      `${ApiName} served from database. Results length: ${result.length}`
    );
    return result;
  } catch (error) {
    console.error(ApiName + " error", error);
    return [];
  }
}
