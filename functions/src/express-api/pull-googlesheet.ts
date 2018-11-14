import * as fetch from "isomorphic-fetch";
import * as admin from "firebase-admin";
import { CacheCollection } from "../config";
import { BangGiaDocPath } from "./banggia";

const ApiName = "PullFromGoogleSheet";
const GOOGLE_API_KEY = "AIzaSyBLkOnKLFTx_7_5XFT1c3R1g2H1aC_njYg";

const parseApiLink = (type, lastCollumn) =>
  "https://sheets.googleapis.com/v4/spreadsheets/" +
  "1L8lxQx8yFwUDqv1Lf5zWk-dpc4uySNzgiTghTMEiH4I/values:batchGet?" +
  "dateTimeRenderOption=FORMATTED_STRING&majorDimension=ROWS&" +
  "ranges=" +
  type +
  "!A2%3A" +
  lastCollumn +
  "&valueRenderOption=UNFORMATTED_VALUE&key=" +
  GOOGLE_API_KEY;

export async function pullFromGoogleSheetHandler(req, res) {
  console.log(ApiName + " requested");
  try {
    const nhaData = await fetch(parseApiLink("Nha", "K"))
      .then(result => result.json())
      .then(values =>
        values.valueRanges[0].values.map(doc => ({
          project: doc[0],
          investor: doc[1],
          location: doc[2],
          progress: doc[3],
          salePerks: doc[4],
          avgPrice: doc[5],
          avgResalePrice: doc[6],
          contacts: doc[7],
          others: doc[8],
          publishAt: doc[9],
          link: doc[10]
        }))
      );
    const xeData = await fetch(parseApiLink("Xe", "K"))
      .then(result => result.json())
      .then(values =>
        values.valueRanges[0].values.map(doc => ({
          model: doc[0],
          brand: doc[1],
          type: doc[2],
          origin: doc[3],
          listPrice: doc[4],
          salePrice: doc[5],
          engine: doc[6],
          power: doc[7],
          torque: doc[8],
          link: doc[9],
          contacts: doc[10]
        }))
      );

    await admin
      .firestore()
      .collection(CacheCollection)
      .doc(BangGiaDocPath)
      .set({ nha: JSON.stringify(nhaData), xe: JSON.stringify(xeData) });

    return res.status(200).json({ result: "success" });
  } catch (error) {
    return res.status(500).json({ error: error });
  }
}
