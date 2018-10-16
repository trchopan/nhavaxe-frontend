import { logger } from "@/helpers.js";

const storeName = "[layout]";
const log = logger(storeName);

// initial state
const state = {
  appScroll: 0,
  homeScrollTop: 0
};

const getters = {
  appScroll: state => state.appScroll,
  homeScrollTop: state => state.homeScrollTop
};

const actions = {
  appScroll({ commit }, value) {
    commit("appScrolled", value);
  },
  scrollTop(_, value) {
    document.querySelector("#app").scrollTop = value;
    log("Scrolling #app to", value);
  },
  setHomeScrollTop({ commit }, value) {
    commit("homeScrollTopChanged", value);
  }
};

const mutations = {
  appScrolled(state, value) {
    state.appScroll = value;
    log("App Scrolled", value);
  },
  homeScrollTopChanged(state, value) {
    state.homeScrollTop = value;
    log("Home ScrollTop changed", value);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
