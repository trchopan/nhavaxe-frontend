<template>
  <transition name="fade">
    <div>
      <ArticleDetail />
      <div v-if="articleMeta && articleBody">
        <RelatedList/>
        <ArticlesList :selectedCat="{ id: 'null' }"
          :articlesList="filteredArticlesList" />
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import ArticleDetail from "../components/ArticleDetail.vue";
import RelatedList from "../components/RelatedList.vue";
import ArticlesList from "../components/ArticlesList.vue";

export default {
  name: "Article",
  components: {
    ArticleDetail,
    RelatedList,
    ArticlesList
  },
  computed: {
    ...mapGetters({
      articleMeta: "articles/selectedArticleMeta",
      articleBody: "articles/selectedArticleBody",
      articlesList: "articles/articlesList",
      relatedList: "articles/relatedList",
      loading: "articles/loading"
    }),
    filteredArticlesList() {
      return this.articlesList.filter(
        x => this.relatedList.indexOf(x) < 0 && x.id !== this.articleMeta.id
      );
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
</style>
