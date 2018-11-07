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
  expand: true,
  loading: false,
  error: null
};

const getters = {
  expand: state => state.expand,
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
  function setExpand({ commit }, value) {
    commit("expandSetted", value);
  }

  return { fetchBangGia, setExpand };
};

const mutations = {
  listChanged(state, list) {
    state.list = list;
    state.loading = false;
    log("List changed", list);
  },
  expandSetted(state, value) {
    state.expand = value;
    log("Expand setted", value);
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
  actions: actions(BangGiaApi),
  mutations
};
