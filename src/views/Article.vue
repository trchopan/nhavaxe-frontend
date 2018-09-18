<template>
  <transition name="fade">
    <div class="article-container">
      <BannerTop :banner="randomBanner(longTopBanners)" />
      <ArticleDetail />
      <RelatedList />
      <div class="grid-list">
        <ArticlesList :selectedCat="{ id: 'null' }"
          :articlesList="filteredArticlesList" />
        <div class="right-wrapper">
          <BannerRight :bannerList="shuffledRightBanners"/>
          <BannerSticky :banner="randomBanner(stickyBanners)" />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import { common } from "@/mixins.js";
import { shuffle } from "@/helpers.js";
import ArticleDetail from "@/components/ArticleDetail.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import RelatedList from "@/components/RelatedList.vue";
import BannerTop from "@/components/BannerTop.vue";
import BannerRight from "@/components/BannerRight.vue";
import BannerSticky from "@/components/BannerSticky.vue";

export default {
  name: "Article",
  components: {
    ArticleDetail,
    RelatedList,
    ArticlesList,
    BannerTop,
    BannerRight,
    BannerSticky
  },
  mixins: [common],
  computed: {
    ...mapGetters({
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
      return shuffle(this.rightBanners);
    }
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
  grid-template-columns: 2fr 1fr;
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
