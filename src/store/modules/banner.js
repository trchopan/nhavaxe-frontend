import stubArticles from "@/api/stubArticles.js";
import { logger } from "@/helpers.js";

const storeName = "[banner]";
const log = logger(storeName);

export const ArticleBannerInterval = 5;

function filterByArea(list, value) {
  return list.filter(x => x.area === value);
}

// Initial setup
const initData =
  process.env.NODE_ENV !== "development"
    ? window.__initialData__
    : stubArticles;

// initial state
const state = {
  bannersList: initData.banners,
  loading: false,
  error: null
};

const getters = {
  bannersList: state => state.bannersList,
  longTopBanners: state => filterByArea(state.bannersList, "long-top"),
  articleBanners: state => filterByArea(state.bannersList, "article-list"),
  rightBanners: state => filterByArea(state.bannersList, "big-right"),
  stickyBanners: state => filterByArea(state.bannersList, "big-sticky"),
  relateBanners: state =>
    filterByArea(state.bannersList, "small-relate").filter(
      i => i.type !== "youtube"
    ),
  loading: state => state.loading,
  error: state => state.error
};

const actions = {};

const mutations = {
  bannersListChanged(state, list) {
    state.loading = false;
    state.bannersList = list;
    log("List changed", list, true);
  },
  loading(state) {
    state.loading = true;
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    log("Error catched", state.error, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
