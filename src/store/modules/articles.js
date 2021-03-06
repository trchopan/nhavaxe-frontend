import * as ArticlesApi from "@/api/articles.js";
import stubArticles from "@/api/stubArticles.js";
import { logger } from "@/helpers.js";

const storeName = "[articles]";
const log = logger(storeName);

const LOADING_TEXT = "Đang tải dữ liệu...";
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
  fetchCounter: 0,
  fetchLimit: FETCH_LIMIT,
  articlesList: initData.list,
  selectedArticleMeta: initData.meta,
  selectedArticleBody: initData.body,
  filterArticles: initData.specials.specials.articles,
  relatedList: initData.related,
  loading: false,
  error: null
};

const getters = {
  inited: state => state.inited,
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
  function init({ commit }) {
    commit("inited");
  }

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

  async function selectArticle({ commit }, articleId) {
    commit("loading");
    commit("selectedArticleCleared");

    try {
      const article = await deps.getArticle(articleId, deps.articleParser);

      if (!article) {
        commit("errorCatched", { error: { code: "not-found" } });
        return false;
      }
      commit("articleMetaFound", article.meta);
      commit("articleBodyFound", article.body);
      commit("relatedArticlesFound", article.related);
      return true;
    } catch (error) {
      commit("errorCatched", error);
      return false;
    }
  }

  function setFilterArticles({ commit }, articles) {
    commit("filterArticlesSetted", articles);
  }

  return {
    init,
    flushArticles,
    increaseFetchLimit,
    fetchCatArticles,
    selectArticle,
    setFilterArticles
  };
};

const mutations = {
  inited(state) {
    state.articlesList = initData.list;
    state.selectedArticleMeta = initData.meta;
    state.selectedArticleBody = initData.body;
    state.relatedList = initData.related;
    state.inited = true;
    log("inited");
  },
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
    state.fetchLimit = FETCH_LIMIT;
    log("flushed");
  },
  selectedArticleCleared(state) {
    state.selectedArticleMeta = initArticleMeta;
    state.selectedArticleBody = initArticleBody;
    state.relatedList = [];
    log("selected is cleared");
  },
  articleMetaFound(state, articleMeta) {
    if (process.env.NODE_ENV !== "development") {
      window.ga("set", {
        page: "/article/" + articleMeta.id,
        title: articleMeta.title
      });
      window.ga("send", "pageView");
    }
    state.selectedArticleMeta = articleMeta;
    state.selectInited = true;
    log("meta found", state.selectedArticleMeta.id);
  },
  articleBodyFound(state, articleBody) {
    state.selectedArticleBody = articleBody;
    state.loading = false;
    log("body found", state.selectedArticleBody.length);
  },
  relatedArticlesFound(state, lists) {
    state.relatedList = lists;
    log("related found", state.relatedList);
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
