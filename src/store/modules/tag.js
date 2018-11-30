import * as TagApi from "@/api/tag.js";
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
  list: [],
  cloud: [],
  loading: false,
  error: null
};

const getters = {
  tagResult: state => state.tagResult,
  list: state => state.list,
  cloud: state => state.cloud,
  loading: state => state.loading,
  error: state => state.error
};

const actions = deps => {
  async function getCloudList({ commit }) {
    try {
      const cloud = await deps.getTagByApi(deps.TagCloudApiUrl);
      commit("cloudChanged", cloud);
    } catch (error) {
      log("Error", error);
    }
  }

  async function getTagList({ commit }) {
    try {
      const list = await deps.getTagByApi(deps.TagListApiUrl);
      commit("listChanged", list);
    } catch (error) {
      log("Error", error);
    }
  }

  function clearTagResult({ commit }) {
    commit("tagResultCleared");
  }

  async function queryTags({ commit }, tagQuery) {
    commit("loading");
    try {
      const result = await deps.getTagQueryResult(deps.TagApiUrl, tagQuery);
      commit("tagQueryResultChanged", result);
      return;
    } catch (error) {
      log("Error", error);
      return;
    }
  }

  return Object.freeze({ getCloudList, getTagList, clearTagResult, queryTags });
};

const mutations = {
  cloudChanged(state, cloud) {
    state.cloud = cloud;
    log("Tag cloud changed", state.cloud);
  },
  listChanged(state, list) {
    state.list = list;
    log("Tag list changed", state.list.length);
  },
  tagResultCleared(state) {
    state.tagResult = [];
    log("Tag result cleared");
  },
  tagQueryResultChanged(state, result) {
    state.tagResult = result;
    state.loading = false;
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
  actions: actions(TagApi),
  mutations
};
