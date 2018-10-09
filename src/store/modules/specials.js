import { logger } from "@/helpers.js";
import * as SpecialsApi from "@/api/specials.js";

const SPECIAL_SPLIT = 2;

const storeName = "Specials";

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
    logger("Fetching Specials...");
    commit("loading");
    try {
      const result = await deps.getSpecials(deps.SpecialsApiUrl);
      commit("dataChanged", result);
    } catch (error) {
      commit("errorCatched", error);
    }
  }
  return { fetchSpecials };
};

const mutations = {
  dataChanged(state, data) {
    state.title = data.title;
    state.articles = data.articles;
    state.loading = false;
    logger(`${storeName} list changed`, state);
  },
  loading(state) {
    state.loading = true;
    logger(`${storeName} loading`);
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    logger(`${storeName} Error catched`, state.error, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions: actions(SpecialsApi),
  mutations
};
