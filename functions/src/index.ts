import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from "cors";

import { userUpdateInfoHandler } from "./firestore-updates/user-update-info";
import { managerUpdateInfoHandler } from "./firestore-updates/manager-update-info";
import { categoryUpdateInfoHandler } from "./firestore-updates/category-update-info";
import { bannerUpdateHandler } from "./firestore-updates/banner-update";

import { ssrHandler } from "./express-api/ssr";
import { sitemapHandler } from "./express-api/sitemap";
import {
  getArticleHandler,
  getArticlesListHandler
} from "./express-api/article";
import { clickLinkHandler } from "./express-api/click-link";
import { pullFromGoogleSheetHandler } from "./express-api/pull-googlesheet";
import { getBangGiaHandler } from "./express-api/banggia";
import {
  tagSearchHandler,
  tagCloudHandler,
  tagListHandler
} from "./express-api/tag-search";

admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore();
firestore.settings({ timestampsInSnapshots: true });

// Firestore Updates
export const userUpdateInfo = functions.firestore
  .document("/users/{userId}")
  .onUpdate(userUpdateInfoHandler);

export const managerUpdateInfo = functions.firestore
  .document("/managers/{managerId}")
  .onUpdate(managerUpdateInfoHandler);

export const categoryUpdateInfo = functions.firestore
  .document("/categories/{categoryId}")
  .onUpdate(categoryUpdateInfoHandler);

export const bannerUpdate = functions.firestore
  .document("/banners/{bannerId}")
  .onUpdate(bannerUpdateHandler);

// Express API
const app = express();
// app.use(cors({ origin: [/localhost/, /nhavaxe\.vn/] }));
app.use(cors());
app.get("/api/article/:id", getArticleHandler);
app.get("/api/list/:startAfter/:catId", getArticlesListHandler);
app.get("/api/click/:linkId", clickLinkHandler);
app.get("/api/tag/:query", tagSearchHandler);
app.get("/api/tagList", tagListHandler);
app.get("/api/tagCloud", tagCloudHandler);
app.get("/api/pullGoogleSheet", pullFromGoogleSheetHandler);
app.get("/api/getBangGia", getBangGiaHandler);
export const api = functions.https.onRequest(app);

// Express SSR
const ssrApp = express();
ssrApp.use(cors({ origin: true }));
ssrApp.get("/:module/:id", ssrHandler);
ssrApp.get("/**", ssrHandler);
export const ssr = functions.https.onRequest(ssrApp);

//Express Sitemap
const sitemapApp = express();
sitemapApp.use(cors({ origin: true }));
sitemapApp.get("/**", sitemapHandler);
export const sitemap = functions.https.onRequest(sitemapApp);
