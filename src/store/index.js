import Vue from "vue";
import Vuex from "vuex";
import layout from "./modules/layout.js";
import articles from "./modules/articles.js";
import categories from "./modules/categories.js";
import bangGia from "./modules/bang-gia.js";
import banner from "./modules/banner.js";

Vue.use(Vuex);

export function logger(message, value, object) {
  process.env.NODE_ENV === "development" &&
    console.log(
      message,
      object === true
        ? value
        : value !== undefined
          ? JSON.stringify(value, null, 2)
          : ""
    );
}

export default new Vuex.Store({
  modules: {
    layout,
    articles,
    categories,
    bangGia,
    banner
  },
  strict: process.env.NODE_ENV !== "production"
});
