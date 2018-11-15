import * as admin from "firebase-admin";
import { ArticlesCollection } from "../express-api/article";

export function categoryUpdateInfoHandler(snap, context) {
  var logMessage = "Firestore category <" + snap.after.id + ">";
  if (snap.after.data().name === snap.before.data().name) {
    console.log(logMessage + " info unchanged");
    return null;
  }
  console.log(logMessage + " updating info");
  return admin
    .firestore()
    .collection(ArticlesCollection)
    .where("categoryId", "==", snap.after.id)
    .get()
    .then(snapshot => {
      var batch = admin.firestore().batch();
      snapshot.forEach(doc => {
        batch.update(
          admin
            .firestore()
            .collection(ArticlesCollection)
            .doc(doc.id),
          { categoryName: snap.after.data().name }
        );
      });
      return batch.commit().then(() => {
        console.log(logMessage + " finish update");
      });
    })
    .catch(err => console.log(logMessage + " error", err));
}
