import { logger } from "@/helpers.js";

const storeName = "[layout]";
const log = logger(storeName);

export const themes = {
  light: "light",
  dark: "dark"
};

// initial state
const state = {
  appScroll: 0,
  homeScrollTop: 0,
  theme: themes.light
};

const getters = {
  appScroll: state => state.appScroll,
  homeScrollTop: state => state.homeScrollTop,
  theme: state => state.theme
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
  },
  changeTheme({ commit }, theme) {
    commit("themeChanged", theme);
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
  },
  themeChanged(state, theme) {
    state.theme = theme;
    log("Theme changed", theme);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
