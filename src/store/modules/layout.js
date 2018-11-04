import { logger } from "@/helpers.js";

const storeName = "[layout]";
const log = logger(storeName);

export const themes = {
  light: "light",
  dark: "dark"
};

// initial state
const state = {
  appScrollUp: false,
  homeScrollY: 0,
  theme: themes.light
};

const getters = {
  appScrollUp: state => state.appScrollUp,
  homeScrollY: state => state.homeScrollY,
  theme: state => state.theme
};

const actions = {
  appScrollUp({ commit }, value) {
    commit("appScrollUped", value);
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
  appScrollUped(state, value) {
    state.appScrollUp = value;
    log("App Scrolled Up", value);
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
