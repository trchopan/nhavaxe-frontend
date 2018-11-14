import * as admin from "firebase-admin";
import { CacheCollection, BANGGIA_CACHE, BANGGIA_SCACHE } from "../config";
import { handleResultJson, handleNotFound, handleError } from "./helpers";

const ApiName = "BangGiaApi";
export const BangGiaDocPath = "bang-gia";

export async function getBangGiaHandler(req, res) {
  console.log(ApiName + " requested");

  try {
    let result = await getBangGia();
    if (!result) return handleNotFound(res);

    return handleResultJson(
      res,
      { nha: JSON.parse(result.nha), xe: JSON.parse(result.xe) },
      BANGGIA_CACHE,
      BANGGIA_SCACHE
    );
  } catch (error) {
    return handleError(ApiName, res, error);
  }
}

export async function getBangGia() {
  return await admin
  .firestore()
  .collection(CacheCollection)
  .doc(BangGiaDocPath)
  .get()
  .then(snapshot => {
    if (!snapshot.exists) {
      return null;
    } else {
      return snapshot.data();
    }
  })
}