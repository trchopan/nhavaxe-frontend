import articlesApi from "@/api/articles.js";
import { logger } from "../index.js";

const SPLIT_AMOUNT = 4;

// Initial articleMeta
const initArticleMeta = {
  id: "loading...",
  title: "loading...",
  sapo: "loading..."
};

// initial state
const state = {
  articlesList: [],
  selectedArticleMeta: null,
  selectedArticleBody: null,
  relatedList: [],
  loading: false,
  error: null
};

const getters = {
  articlesList: state => state.articlesList,
  topArticles: state => state.articlesList.slice(0, SPLIT_AMOUNT),
  remainArticles: state => state.articlesList.slice(SPLIT_AMOUNT),
  selectedArticleMeta: state => state.selectedArticleMeta,
  selectedArticleBody: state => state.selectedArticleBody,
  relatedList: state => state.relatedList,
  loading: state => state.loading,
  error: state => state.error
};

const actions = {
  flushArticles({ commit }) {
    commit("flushed");
  },
  fetchCatArticles({ commit, state, rootState }, categoryId) {
    // Do nothing if state is loading
    if (state.loading) {
      return;
    }

    let catId = categoryId || rootState.categories.selectedCat.id;

    logger("Fetching Articles...", catId);
    commit("loading");

    let arrayLength = state.articlesList.length;
    let startAfter;
    if (arrayLength > 0) {
      startAfter = state.articlesList[arrayLength - 1].publishAt;
    } else {
      let date = new Date();
      date.setMinutes(Math.floor(date.getMinutes() / 15) * 15);
      date.setSeconds(0);
      date.setMilliseconds(0);
      startAfter = date.getTime();
    }

    articlesApi.getArticlesList(
      catId,
      startAfter,
      data => commit("articlesListChanged", data),
      error => commit("errorCatched", error)
    );
  },
  selectArticle({ dispatch, commit, state }, articleId) {
    commit("loading");
    commit("clearArticleData");
    let article = state.articlesList.find(x => x.id === articleId);
    if (!article) {
      logger("Cannot find article meta in store. Searching...", articleId);
      articlesApi.getArticleMeta(
        articleId,
        data => {
          commit("articleMetaFound", data);
          dispatch("searchRelatedArticles", data.tags);
        },
        error => commit("errorCatched", error)
      );
    } else {
      commit("articleMetaFound", article);
      dispatch("searchRelatedArticles", article.tags);
    }
    articlesApi.getArticleBody(
      articleId,
      data => commit("articleBodyFound", data),
      error => commit("errorCatched", error)
    );
  },
  searchRelatedArticles({ commit }, tags) {
    articlesApi.getRelatedList(
      tags,
      data => commit("relatedArticlesFound", data),
      error => commit("errorCatched", error)
    );
  }
};

const mutations = {
  articlesListChanged(state, list) {
    state.articlesList.push(...list);
    state.loading = false;
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
    state.selectedArticleBody = null;
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
    logger("Articles body found", state.selectedArticleBody.slice(0, 100));
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
      .sort((a, b) => b.relevant - a.relevant);

    state.relatedList = result.filter(
      x => x.id != state.selectedArticleMeta.id
    );
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
  actions,
  mutations
};
