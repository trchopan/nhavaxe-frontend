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
  homeScrollY: 0,
  theme: themes.light
};

const getters = {
  appScroll: state => state.appScroll,
  homeScrollY: state => state.homeScrollY,
  theme: state => state.theme
};

const actions = {
  appScroll({ commit }, value) {
    commit("appScrolled", value);
  },
  scrollYTo(_, value) {
    window.scroll(0, value);
    log("Scrolling window to", value);
  },
  setHomeScrollY({ commit }, value) {
    commit("homeScrollYChanged", value);
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
  homeScrollYChanged(state, value) {
    state.homeScrollY = value;
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
