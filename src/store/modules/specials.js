import { logger } from "@/helpers.js";
import * as SpecialsApi from "@/api/specials.js";

const storeName = "[specials]";
const log = logger(storeName);

const SPECIAL_SPLIT = 2;

// initial state
const state = {
  title: null,
  articles: [],
  loading: false,
  error: null
};

const getters = {
  title: state => state.title,
  mains: state => state.articles.slice(0, SPECIAL_SPLIT),
  subs: state => state.articles.slice(SPECIAL_SPLIT)
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
  return { fetchSpecials };
};

const mutations = {
  dataChanged(state, data) {
    state.title = data.specials.title;
    state.articles = data.specials.articles;
    state.loading = false;
    log("list changed", state);
  },
  loading(state) {
    state.loading = true;
    log("loading");
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
  actions: actions(SpecialsApi),
  mutations
};
