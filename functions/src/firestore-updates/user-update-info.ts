import * as admin from "firebase-admin";
import { ArticlesCollection } from "../config";

export function userUpdateInfoHandler(snap, context) {
  var logMessage = "Firestore user <" + snap.after.id + ">";
  if (
    snap.after.data().fullname === snap.before.data().fullname &&
    snap.after.data().avatar === snap.before.data().avatar
  ) {
    console.log(logMessage + " info unchanged");
    return null;
  }
  console.log(logMessage + " update info");
  return admin
    .firestore()
    .collection(ArticlesCollection)
    .where("creatorId", "==", snap.after.id)
    .get()
    .then(snapshot => {
      var batch = admin.firestore().batch();
      snapshot.forEach(doc => {
        batch.update(
          admin
            .firestore()
            .collection(ArticlesCollection)
            .doc(doc.id),
          {
            creatorName: snap.after.data().fullname || "Thành viên mới",
            creatorAvatar: snap.after.data().avatar || ""
          }
        );
      });
      return batch.commit().then(() => {
        console.log(logMessage + " finish update");
      });
    })
    .catch(err => console.log(logMessage + " info error", err));
}
