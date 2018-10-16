import { logger } from "@/helpers.js";
import * as BangGiaApi from "@/api/bang-gia.js";

const storeName = "[bangGia]";
const log = logger(storeName);

const SLICE_AMOUNT = 7;

// initial state
const state = {
  list: {
    nha: [],
    xe: []
  },
  loading: false,
  error: null
};

const getters = {
  list: state => state.list,
  smallList: state => ({
    nha: state.list.nha.slice(0, SLICE_AMOUNT),
    xe: state.list.xe.slice(0, SLICE_AMOUNT)
  })
};

const actions = deps => {
  async function fetchBangGia({ commit }) {
    log("Fetching...");
    commit("loading");
    try {
      const result = await deps.getBangGia(
        deps.BangGiaApiUrl,
        deps.nhaParser,
        deps.xeParser
      );
      commit("listChanged", result, SLICE_AMOUNT);
    } catch (error) {
      commit("errorCatched", error);
    }
  }
  return { fetchBangGia };
};

const mutations = {
  listChanged(state, list) {
    state.list = list;
    state.loading = false;
    log("List changed", state.list.nha.length + "/" + state.list.xe.length);
  },
  loading(state) {
    state.loading = true;
    log("Articles Loading");
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
  actions: actions(BangGiaApi),
  mutations
};
