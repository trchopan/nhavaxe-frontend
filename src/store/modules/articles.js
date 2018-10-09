import * as ArticlesApi from "@/api/articles.js";
import stubArticles from "@/api/stubArticles.js";
import { logger } from "@/helpers.js";

export const LOADING_TEXT = "loading...";
const ARTICLE_SPLIT = 4;
const SPECIALS_SPLIT = 2;
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
  specialsTitle: null,
  specials: [],
  articlesList: initData.list,
  selectedArticleMeta: initData.meta,
  selectedArticleBody: initData.body,
  relatedList: [],
  loading: false,
  error: null
};

const getters = {
  specialsTitle: state => state.specialsTitle,
  specialsMain: state => state.specials.slice(0, SPECIALS_SPLIT),
  specialsSub: state => state.specials.slice(SPECIALS_SPLIT),
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
        logger("Fetching Specials...");
        commit("loading");
        const specials = await deps.getSpecials();
        commit("specialsChanged", specials);
      }

      logger("Fetching Articles...", catId);
      commit("loading");
      const list = await deps.getArticlesList(
        catId,
        startAfter,
        deps.articleParser
      );

      if (!list) throw { error: { code: "not-found" } };

      const filteredList = list.filter(
        item => !state.specials.find(x => x.id === item.id)
      );
      commit("articlesListChanged", filteredList);
    } catch (error) {
      commit("errorCatched", error);
    }
  }

  async function selectArticle({ dispatch, commit }, articleId) {
    commit("loading");
    commit("clearArticleData");

    try {
      const article = await deps.getArticle(articleId, deps.articleParser);

      if (!article) throw { error: { code: "not-found" } };
      commit("articleMetaFound", article.meta);
      commit("articleBodyFound", article.body);
      dispatch("searchRelatedArticles", article.meta.tags);
    } catch (error) {
      commit("errorCatched", error);
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
  specialsChanged(state, specials) {
    state.specialsTitle = specials.title;
    state.specials = specials.articles;
    state.loading = false;
    logger("Specials changed", state.specials);
  },
  articlesListChanged(state, list) {
    state.articlesList.push(...list);
    state.loading = false;
    state.initialized = true;
    logger("Articles List changed", state.articlesList.length);
  },
  loading(state) {
    state.loading = true;
    logger("Articles Loading");
  },
  flushed(state) {
    state.articlesList = [];
    logger("Articles flushed");
  },
  clearArticleData(state) {
    state.selectedArticleMeta = initArticleMeta;
    state.selectedArticleBody = initArticleBody;
    logger("Article data is cleared");
  },
  articleMetaFound(state, articleMeta) {
    state.selectedArticleMeta = articleMeta;
    window.ga("set", {
      page: "/article/" + articleMeta.id,
      title: articleMeta.title
    });
    window.ga("send", "pageView");
    logger("Articles meta found", state.selectedArticleMeta.id);
  },
  articleBodyFound(state, articleBody) {
    state.selectedArticleBody = articleBody;
    state.loading = false;
    logger("Articles body found", state.selectedArticleBody.length);
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
    logger("Related Articles found", state.relatedList, true);
  },
  errorCatched(state, error) {
    state.error = error;
    state.loading = false;
    logger("Error catched", state.error, true);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions: actions(ArticlesApi),
  mutations
};
