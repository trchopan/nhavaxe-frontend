import * as admin from "firebase-admin";
import { ArticlesCollection } from "../config";

export function managerUpdateInfoHandler(snap, context) {
  const logMessage = "Firestore manager <" + snap.after.id + "> ";
  var snapData = snap.after.data();
  var snapBefore = snap.before.data();
  if (
    snapData.fullname === snapBefore.fullname &&
    snapData.avatar === snapBefore.avatar
  ) {
    console.log(logMessage + "info unchanged");
    return null;
  } else {
    console.log(logMessage + "update info");
    return admin
      .firestore()
      .collection(ArticlesCollection)
      .where("managerId", "==", snap.after.id)
      .get()
      .then(snapshot => {
        var batch = admin.firestore().batch();
        snapshot.forEach(doc => {
          batch.update(
            admin
              .firestore()
              .collection(ArticlesCollection)
              .doc(doc.id),
            { managerName: snapData.fullname || "<empty>" }
          );
        });
        return batch.commit().then(() => {
          console.log(logMessage + "finish update");
        });
      })
      .catch(err => console.log(logMessage + "info error", err));
  }
}
