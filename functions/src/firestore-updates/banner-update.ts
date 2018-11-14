import * as admin from "firebase-admin";
import { CacheCollection } from "../config";
import { CacheBannerDocPath } from "../express-api/banner";

export async function bannerUpdateHandler(snap, context) {
  const logMessage = "Firestore banner updated > ";

  console.log(logMessage + " clearing cache");
  try {
    await admin
      .firestore()
      .collection(CacheCollection)
      .doc(CacheBannerDocPath)
      .delete();

    console.log(logMessage + " finished!");
  } catch (error) {
    console.log(logMessage + " error!", error);
  }
}
