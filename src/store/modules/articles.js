import * as ArticlesApi from "@/api/articles.js";
import stubArticles from "@/api/stubArticles.js";
import { logger } from "@/helpers.js";

const storeName = "[articles]";
const log = logger(storeName);

const LOADING_TEXT = "loading...";
const ARTICLE_SPLIT = 4;
const MAX_RELATE = 7;

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
  articlesList: [],
  selectedArticleMeta: initArticleMeta.meta,
  selectedArticleBody: initArticleBody.body,
  relatedList: [],
  loading: false,
  error: null
};

const getters = {
  articlesList: state => state.articlesList,
  firstArticle: state => state.articlesList.slice(0, 1)[0],
  topArticles: state => state.articlesList.slice(1, ARTICLE_SPLIT),
  remainArticles: state => state.articlesList.slice(ARTICLE_SPLIT),
  selectedArticleMeta: state => state.selectedArticleMeta,
  selectedArticleBody: state => state.selectedArticleBody,
  relatedList: state => state.relatedList.slice(0, MAX_RELATE),
  loading: state => state.loading,
  error: state => state.error
};

const actions = deps => {
  function flushArticles({ commit }) {
    commit("flushed");
  }

  async function fetchCatArticles({ commit, state }, categoryId) {
    // Do nothing if state is loading
    if (state.loading) {
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

  return {
    flushArticles,
    fetchCatArticles,
    selectArticle,
    searchRelatedArticles
  };
};

const mutations = {
  articlesListChanged(state, list) {
    state.articlesList.push(...list);
    state.loading = false;
    state.initialized = true;
    log("Articles List changed", list);
  },
  loading(state) {
    state.loading = true;
  },
  flushed(state) {
    state.articlesList = [];
    log("Articles flushed");
  },
  clearArticleData(state) {
    state.selectedArticleMeta = initArticleMeta;
    state.selectedArticleBody = initArticleBody;
    log("Article data is cleared");
  },
  articleMetaFound(state, articleMeta) {
    state.selectedArticleMeta = articleMeta;
    window.ga("set", {
      page: "/article/" + articleMeta.id,
      title: articleMeta.title
    });
    window.ga("send", "pageView");
    log("Articles meta found", state.selectedArticleMeta.id);
  },
  articleBodyFound(state, articleBody) {
    state.selectedArticleBody = articleBody;
    state.loading = false;
    log("Articles body found", state.selectedArticleBody.length);
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
    log("Related Articles found", state.relatedList);
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
