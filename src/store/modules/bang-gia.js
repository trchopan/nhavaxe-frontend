import { logger } from "../index.js";
import bangGiaApi from "@/api/bang-gia.js";

const BANGGIA_AMOUNT = 7;

// initial state
const state = {
  list: {
    nha: [],
    xe: []
  },
  smallList: {
    nha: [],
    xe: []
  },
  loading: false,
  error: null
};

const getters = {
  list: state => state.list,
  smallList: state => state.smallList
};

const actions = {
  fetchBangGia({ commit }) {
    logger("Fetching Bang Gia...");
    commit("loading");
    bangGiaApi.getBangGia(
      data => commit("listChanged", data),
      error => commit("errorCatched", error)
    );
  }
};

const mutations = {
  listChanged(state, list) {
    state.list.nha = list.nha;
    state.list.xe = list.xe;
    state.smallList.nha = list.nha.slice(0, BANGGIA_AMOUNT);
    state.smallList.xe = list.xe.slice(0, BANGGIA_AMOUNT);
    state.loading = false;
    logger(
      "Bang Gia list changed",
      state.list.nha.length + "/" + state.list.xe.length
    );
  },
  loading(state) {
    state.loading = true;
    logger("Articles Loading");
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    logger("Error catched", state.error, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
