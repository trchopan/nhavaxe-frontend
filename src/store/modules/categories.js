import categories from "@/api/categories.js";
import { logger } from "../index.js";

const rootCategory = {
  id: "/",
  name: "root",
  position: 0
};

// initial state
const state = {
  categories: [],
  selectedCat: rootCategory,
  loading: false,
  error: null
};

const getters = {
  categories: state => state.categories,
  selectedCat: state => state.selectedCat,
  loading: state => state.loading,
  error: state => state.error
};

const actions = {
  getCategories({ commit }) {
    logger("Getting Categories...");
    commit("loading");
    categories.getCategories(
      data => commit("categoriesChanged", data),
      error => commit("errorCatched", error)
    );
  },
  selectCategory({ commit }, category) {
    logger("Selecting Categories...");
    commit("categorySelected", category || rootCategory);
  }
};

const mutations = {
  categoriesChanged(state, categories) {
    state.categories = categories;
    state.loading = false;
    logger("Categories changed", state.categories.length);
  },
  categorySelected(state, category) {
    state.selectedCat = category;
    logger("Category selected", state.category);
  },
  loading(state) {
    state.loading = true;
    logger("Categories Loading");
  },
  errorCatched(state, error) {
    state.error = error;
    logger("Error catched", state.error);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
