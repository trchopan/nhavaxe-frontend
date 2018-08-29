import { logger } from "../index.js";

// initial state
const state = {
  homeScrollTop: 0
};

const getters = {
  homeScrollTop: state => state.homeScrollTop
};

const actions = {
  scrollTop(_, value) {
    document.querySelector("#app").scrollTop = value;
    logger("Scrolling #app to", value);
  },
  setHomeScrollTop({ commit }, value) {
    commit("homeScrollTopChanged", value);
  }
};

const mutations = {
  homeScrollTopChanged(state, value) {
    state.homeScrollTop = value;
    logger("Home ScrollTop changed", value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
