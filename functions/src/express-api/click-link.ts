import * as admin from "firebase-admin";
import { handleNotFound } from "./helpers";
import { BannersCollection } from "./banner";

const ApiName = "ClickLinkApi";

export async function clickLinkHandler(req, res) {
  console.log(ApiName + " requested", req.params);

  try {
    const docRef = admin
      .firestore()
      .collection(BannersCollection)
      .doc(req.params.linkId);

    const data = await docRef
      .get()
      .then(
        doc =>
          doc.exists && doc.data().status === "active" ? doc.data() : null
      );

    if (!data) return handleNotFound(res);

    const newCount = data.count ? data.count + 1 : 1;
    await docRef.update({ count: newCount });

    return res.status(302).redirect(data.link);
  } catch (error) {
    console.log(error);
    return handleNotFound(res);
  }
}
