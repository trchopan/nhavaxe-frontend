import articlesApi from "@/api/articles.js";
import { logger } from "@/helpers.js";

export const LOADING_TEXT = "loading...";
const SPLIT_AMOUNT = 4;
const MAX_RELATE = 7;

// Initial articleMeta
const initArticleMeta = {
  title: LOADING_TEXT,
  sapo: LOADING_TEXT
};
const initArticleBody = LOADING_TEXT;

const initialArticleList = [];
for (var i = 0; i < 20; i++) {
  initialArticleList.push({ id: "article-init-" + i, ...initArticleMeta });
}

// initial state
const state = {
  initialized: false,
  articlesList: initialArticleList,
  selectedArticleMeta: initArticleMeta,
  selectedArticleBody: initArticleBody,
  relatedList: [],
  loading: false,
  error: null
};

const getters = {
  articlesList: state => state.articlesList,
  firstArticle: state => state.articlesList.slice(0, 1)[0],
  topArticles: state => state.articlesList.slice(1, SPLIT_AMOUNT),
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
    if (state.initialized) {
      startAfter = state.articlesList[arrayLength - 1].publishAt;
    } else {
      startAfter = 0;
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
    if (state.initialized) {
      state.articlesList.push(...list);
    } else {
      state.articlesList = list;
    }
    state.loading = false;
    state.initialized = true;
    logger("Articles List changed", state.articlesList.length);
  },
  loading(state) {
    state.loading = true;
    logger("Articles Loading");
  },
  flushed(state) {
    state.initialized = false;
    state.articlesList = initialArticleList;
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
      .filter(x => x.id != state.selectedArticleMeta.id)
      .slice(0, MAX_RELATE);

    state.relatedList = result;
    logger("Related Articles found", state.relatedList, true);
  },
  errorCatched(state, error) {
    console.log("hellow", state.articlesList);
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
