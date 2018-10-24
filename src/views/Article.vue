<template>
  <transition name="fade">
    <div class="article-container">
      <BannerTop :banner="bannerTop" />
      <ArticleDetail />
      <RelatedList />
      <Videos />
      <div class="grid-list">
        <ArticlesList :selectedCat="{ id: 'null' }"
          :articlesList="filteredArticlesList" />
        <div class="right-wrapper">
          <BannerRight :bannerList="shuffledRightBanners"/>
          <BannerSticky :banner="bannerSticky" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffle, randomBanner } from "@/helpers.js";
import ArticleDetail from "@/components/ArticleDetail.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import RelatedList from "@/components/RelatedList.vue";
import BannerTop from "@/components/BannerTop.vue";
import BannerRight from "@/components/BannerRight.vue";
import BannerSticky from "@/components/BannerSticky.vue";
import Videos from "@/components/Videos.vue";

export default {
  name: "Article",
  data() {
    return {
      updateFlag: Math.random()
    };
  },
  components: {
    ArticleDetail,
    RelatedList,
    ArticlesList,
    BannerTop,
    BannerRight,
    BannerSticky,
    Videos
  },
  computed: {
    ...mapGetters({
      initialized: "articles/initialized",
      articleMeta: "articles/selectedArticleMeta",
      articleBody: "articles/selectedArticleBody",
      articlesList: "articles/articlesList",
      relatedList: "articles/relatedList",
      longTopBanners: "banner/longTopBanners",
      rightBanners: "banner/rightBanners",
      stickyBanners: "banner/stickyBanners",
      loading: "articles/loading"
    }),
    filteredArticlesList() {
      return this.articlesList.filter(
        x => this.relatedList.indexOf(x) < 0 && x.id !== this.articleMeta.id
      );
    },
    shuffledRightBanners() {
      this.updateFlag;
      return shuffle(this.rightBanners);
    },
    bannerTop() {
      this.updateFlag;
      return randomBanner(this.longTopBanners);
    },
    bannerSticky() {
      this.updateFlag;
      return randomBanner(this.stickyBanners);
    }
  },
  created() {
    this.$store.dispatch("articles/selectArticle", this.$route.params.id);
    this.$store.dispatch("layout/scrollTop", 0);
  },
  beforeRouteUpdate(to, from, next) {
    this.updateFlag = Math.random();
    this.$store.dispatch("articles/selectArticle", to.params.id);
    this.$store.dispatch("layout/scrollTop", 0);
    next();
  }
};
</script>

<style lang="scss" scoped>
.article-container {
  max-width: calc(var(--container-width) - 56px);
  margin: 0 auto;
}
.grid-list {
  display: grid;
  grid-template-columns: var(--article-list-ratio) 1fr;
  grid-template-areas: "articlesList .";
  .right-warpper {
    padding-top: 1rem;
  }
}
@media (max-width: 650px) {
  .grid-list {
    grid-template-areas: "articlesList";
    grid-template-columns: 1fr;
    .right-wrapper {
      display: none;
    }
  }
}
</style>
