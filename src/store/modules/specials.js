import { logger } from "@/helpers.js";
import * as SpecialsApi from "@/api/specials.js";

const storeName = "[specials]";
const log = logger(storeName);

const SPECIAL_SPLIT = 2;

// initial state
const state = {
  title: null,
  articles: [],
  videos: [],
  selectedVideo: null,
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

const actions = deps => {
  async function fetchSpecials({ commit }) {
    log("Fetching...");
    commit("loading");
    try {
      const result = await deps.getSpecials(deps.SpecialsApiUrl);
      commit("dataChanged", result);
      return result;
    } catch (error) {
      commit("errorCatched", error);
      return null;
    }
  }

  function selectVideo({ commit }, video) {
    commit("videoSelected", video);
  }

  return { fetchSpecials, selectVideo };
};

const mutations = {
  dataChanged(state, data) {
    state.title = data.specials.title;
    state.articles = data.specials.articles;
    state.videos = data.videos;
    state.selectedVideo = data.videos[0];
    state.loading = false;
    log("list changed", data);
  },
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
  actions: actions(SpecialsApi),
  mutations
};
