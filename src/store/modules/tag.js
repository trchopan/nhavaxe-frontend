import { logger } from "@/helpers.js";
import stubArticles from "@/api/stubArticles.js";

const storeName = "[tag]";
const log = logger(storeName);


// Initial setup
const initData =
  process.env.NODE_ENV !== "development"
    ? window.__initialData__
    : stubArticles;

// initial state
const state = {
  tagResult: initData.related, 
  loading: false,
  error: null
};

const getters = {
  tagResult: state => state.tagResult,
  loading: state => state.loading,
  error: state => state.error
};

const actions = deps => {
  async function queryTags({ commit }, tagQuery) {
    const result = await deps.getTagQueryResult(tagQuery);
    commit("tagQueryResultChanged", result);
  }

  return Object.freeze({ queryTags })
};

const mutations = {
  tagQueryResultChanged(state, result) {
    state.tagResult = result;
    log("Tag query result changed", state.tagResult);
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
