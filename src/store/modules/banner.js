import bannersApi from "@/api/banner.js";
import { logger } from "@/helpers.js";

const storeName = "[banner]";
const log = logger(storeName);

export const ArticleBannerInterval = 5;
export const RelatedBannerInterval = 2;
export const YoutubeAmount = 2;

function filterByArea(list, value) {
  return list.filter(x => x.area === value);
}

// initial state
const state = {
  bannersList: [],
  loading: false,
  error: null
};

const getters = {
  bannersList: state => state.bannersList,
  longTopBanners: state => filterByArea(state.bannersList, "long-top"),
  articleBanners: state => filterByArea(state.bannersList, "article-list"),
  rightBanners: state => filterByArea(state.bannersList, "big-right"),
  stickyBanners: state => filterByArea(state.bannersList, "big-sticky"),
  relateBanners: state => filterByArea(state.bannersList, "small-relate"),
  youtubeBanners: state =>
    state.bannersList.filter(x => x.type === "youtube").slice(0, YoutubeAmount),
  loading: state => state.loading,
  error: state => state.error
};

const actions = {
  fetchBannersList({ commit }) {
    log("Fetching...")
    commit("loading");
    bannersApi.getBannersList(
      data => commit("bannersListChanged", data),
      error => commit("errorCatched", error)
    );
  }
};

const mutations = {
  bannersListChanged(state, list) {
    state.loading = false;
    state.bannersList = list;
    log("Banner List changed", state.bannersList.length);
  },
  loading(state) {
    state.loading = true;
    log("Banner Loading");
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
