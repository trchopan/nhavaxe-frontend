import * as ArticlesApi from "@/api/articles.js";
import stubArticles from "@/api/stubArticles.js";
import { logger } from "@/helpers.js";

const storeName = "[articles]";
const log = logger(storeName);

const LOADING_TEXT = "loading...";
const ARTICLE_SPLIT = 4;
const FETCH_LIMIT = 3;

// Initial setup
const initData =
  process.env.NODE_ENV !== "development"
    ? window.__initialData__
    : stubArticles;

const initArticleMeta = {
  title: LOADING_TEXT,
  sapo: LOADING_TEXT
};
const initArticleBody = LOADING_TEXT;

// initial state
const state = {
  initialized: false,
  fetchCounter: 0,
  fetchLimit: FETCH_LIMIT,
  articlesList: [],
  selectedArticleMeta: initArticleMeta,
  selectedArticleBody: initArticleBody,
  filterArticles: [],
  relatedList: [],
  loading: false,
  error: null
};

const getters = {
  initialized: state => state.initialized,
  articlesList: state => state.articlesList,
  firstArticle: state => state.articlesList[0],
  topArticles: state => state.articlesList.slice(1, ARTICLE_SPLIT),
  remainArticles: state => state.articlesList.slice(ARTICLE_SPLIT),
  selectedArticleMeta: state => state.selectedArticleMeta,
  selectedArticleBody: state => state.selectedArticleBody,
  relatedList: state => state.relatedList,
  reachedFetchLimit: state => state.fetchCounter >= state.fetchLimit,
  loading: state => state.loading,
  error: state => state.error
};

const actions = deps => {
  function flushArticles({ commit }) {
    commit("flushed");
  }

  function increaseFetchLimit({ commit }) {
    commit("fetchLimitIncreased");
  }

  async function fetchCatArticles({ commit, state }, categoryId) {
    // Do nothing if state is loading or fetchCounter reached
    if (state.loading || state.fetchCounter >= state.fetchLimit) {
      return;
    }

    let arrayLength = state.articlesList.length;
    let startAfter =
      arrayLength > 0 ? state.articlesList[arrayLength - 1].publishAt : 0;
    let catId = categoryId || "ALL";

    try {
      if (!state.initialized) {
        log("fetchCatArticles serve from initData");
        commit("articlesListChanged", initData.list);
        return true;
      }
      log("Fetching Articles...", catId);
      commit("loading");
      const list = await deps.getArticlesList(
        catId,
        startAfter,
        deps.articleParser
      );

      if (!list) {
        commit("errorCatched", { error: { code: "not-found" } });
        return false;
      }

      commit("articlesListChanged", list);
      return true;
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  }

  async function selectArticle({ dispatch, commit, state }, articleId) {
    if (!state.initialized) {
      log("selectArticle serve from initData");
      commit("articleMetaFound", initData.meta);
      commit("articleBodyFound", initData.body);
      dispatch("searchRelatedArticles", initData.meta.tags);
      return true;
    }
    commit("loading");
    commit("clearArticleData");

    try {
      const article = await deps.getArticle(articleId, deps.articleParser);

      if (!article) {
        commit("errorCatched", { error: { code: "not-found" } });
        return false;
      }
      commit("articleMetaFound", article.meta);
      commit("articleBodyFound", article.body);
      dispatch("searchRelatedArticles", article.meta.tags);
      return true;
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  }

  async function searchRelatedArticles({ commit }, tags) {
    try {
      const data = await deps.getRelatedList(tags);
      commit("relatedArticlesFound", data);
    } catch (error) {
      commit("errorCatched", error);
    }
  }

  function setFilterArticles({ commit }, articles) {
    commit("filterArticlesSetted", articles);
  }

  return {
    flushArticles,
    increaseFetchLimit,
    fetchCatArticles,
    selectArticle,
    searchRelatedArticles,
    setFilterArticles
  };
};

const mutations = {
  fetchLimitIncreased(state) {
    state.fetchLimit++;
    log("fetchLimit increased");
  },
  articlesListChanged(state, list) {
    const filteredList = list.filter(
      x => state.filterArticles.findIndex(v => v.id === x.id) < 0
    );
    state.articlesList.push(...filteredList);
    state.loading = false;
    state.initialized = true;
    state.fetchCounter++;
    log("list changed", state.articlesList);
  },
  loading(state) {
    state.loading = true;
  },
  flushed(state) {
    state.articlesList = [];
    state.fetchCounter = 0;
    log("flushed");
  },
  clearArticleData(state) {
    state.selectedArticleMeta = initArticleMeta;
    state.selectedArticleBody = initArticleBody;
    log("selected is cleared");
  },
  articleMetaFound(state, articleMeta) {
    state.selectedArticleMeta = articleMeta;
    window.ga("set", {
      page: "/article/" + articleMeta.id,
      title: articleMeta.title
    });
    window.ga("send", "pageView");
    log("meta found", state.selectedArticleMeta.id);
  },
  articleBodyFound(state, articleBody) {
    state.selectedArticleBody = articleBody;
    state.loading = false;
    log("body found", state.selectedArticleBody.length);
  },
  relatedArticlesFound(state, lists) {
    const result = lists
      .reduce((accResult, currResult) => {
        // Find the duplicate
        currResult.forEach((result, i) => {
          let foundDuplicate = accResult.findIndex(
            x => (x && result ? x.id === result.id : false)
          );
          // If found increase the relevant amount
          if (foundDuplicate >= 0) {
            accResult[foundDuplicate].relevant++;
            currResult[i] = null;
          }
        });
        return [...accResult, ...currResult.filter(x => x !== null)];
      }, [])
      .sort((a, b) => b.publishAt - a.publishAt)
      .sort((a, b) => b.relevant - a.relevant)
      .filter(x => x.id != state.selectedArticleMeta.id);

    state.relatedList = result;
    log("related found", state.relatedList);
  },
  filterArticlesSetted(state, articles) {
    state.filterArticles = articles;
    log("filter setted", articles);
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
  actions: actions(ArticlesApi),
  mutations
};
