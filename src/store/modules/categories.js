import categories from "@/api/categories.js";

const rootCategory = {
  id: "ALL",
  name: "All",
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
    commit("loading");
    categories.getCategories(
      data => commit("categoriesChanged", data),
      error => commit("errorCatched", error)
    );
  },
  selectCategory({ commit }, category) {
    commit("categorySelected", category || rootCategory);
  }
};

const mutations = {
  categoriesChanged(state, categories) {
    state.categories = categories;
    state.loading = false;
  },
  categorySelected(state, category) {
    state.selectedCat = category;
  },
  loading(state) {
    state.loading = true;
  },
  errorCatched(state, error) {
    state.error = error;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
