import { logger } from "@/helpers.js";
import stubArticles from "@/api/stubArticles.js";

const storeName = "[specials]";
const log = logger(storeName);

const SPECIAL_SPLIT = 2;

// Initial setup
const initData =
  process.env.NODE_ENV !== "development"
    ? window.__initialData__
    : stubArticles;

// initial state
const state = {
  title: initData.specials.specials.title,
  articles: initData.specials.specials.articles,
  videos: initData.specials.videos,
  selectedVideo: initData.specials.videos[0],
  loading: false,
  error: null
};

const getters = {
  title: state => state.title,
  mains: state => state.articles.slice(0, SPECIAL_SPLIT),
  subs: state => state.articles.slice(SPECIAL_SPLIT),
  videos: state => state.videos,
  selectedVideo: state => state.selectedVideo
};

const actions = {
  selectVideo({ commit }, video) {
    commit("videoSelected", video);
  }
};

const mutations = {
  videoSelected(state, video) {
    state.selectedVideo = video;
    log("video selected", video);
  },
  loading(state) {
    state.loading = true;
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    log("Error catched", state.error);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
