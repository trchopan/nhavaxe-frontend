<template>
  <transition name="fade">
    <div class="article-container">
      <BannerTop :banner="bannerTop"/>
      <router-view></router-view>
      <RelatedList
        :list="relatedList"
        :relatedMax="10"
      />
      <Videos/>
      <div class="grid-list">
        <ArticlesList
          :selectedCat="{ id: 'null' }"
          :articlesList="filteredArticlesList"
          replace
        />
        <div class="right-wrapper">
          <BannerRight :bannerList="shuffledRightBanners"/>
          <TagCloud
            :tagsList="cloud"
            @selected="$router.push('/tag/' + $event)"
          />
          <BannerSticky :banner="bannerSticky"/>
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
import TagCloud from "@/components/TagCloud.vue";

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
    Videos,
    TagCloud
  },
  computed: {
    ...mapGetters({
      articleMeta: "articles/selectedArticleMeta",
      articlesList: "articles/articlesList",
      relatedList: "articles/relatedList",
      longTopBanners: "banner/longTopBanners",
      rightBanners: "banner/rightBanners",
      stickyBanners: "banner/stickyBanners",
      cloud: "tag/cloud",
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
  beforeRouteUpdate(to, from, next) {
    this.updateFlag = Math.random();
    this.$store.dispatch("layout/scrollYTo", 0);
    next();
  },
  mounted() {
    this.$store.dispatch("layout/scrollYTo", 0);
    document.title = this.articleMeta.title;
  },
  updated() {
    document.title = this.articleMeta.title;
  },
  methods: {
    handleTagSelected(tag) {
      this.$store.dispatch("tag/queryTags", tag);
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
