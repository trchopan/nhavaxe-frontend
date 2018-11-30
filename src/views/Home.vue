<template>
  <div class="home-container">
    <section>
      <BannerTop :banner="bannerTop"/>
    </section>
    <section class="grid-top">
      <ArticleFirst :article="firstArticle"/>
      <SmallBangGia/>
      <ArticlesTop :articlesList="topArticles"/>
    </section>
    <Videos/>
    <section class="grid-list">
      <ArticlesList
        :selectedCat="selectedCat"
        :articlesList="remainArticles"
      />
      <div class="right-wrapper">
        <BannerRight :bannerList="shuffledRightBanners"/>
        <TagCloud
          :tagsList="cloud"
          @selected="$router.push('/tag/' + $event)"
        />
        <BannerSticky :banner="bannerSticky"/>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffle, randomBanner } from "@/helpers";
import ArticleFirst from "@/components/ArticleFirst.vue";
import ArticlesTop from "@/components/ArticlesTop.vue";
import ArticlesList from "@/components/ArticlesList.vue";
import BannerTop from "@/components/BannerTop.vue";
import BannerRight from "@/components/BannerRight.vue";
import BannerSticky from "@/components/BannerSticky.vue";
import SmallBangGia from "@/components/SmallBangGia.vue";
import Videos from "@/components/Videos.vue";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "Home",
  components: {
    ArticleFirst,
    ArticlesTop,
    ArticlesList,
    BannerTop,
    BannerRight,
    BannerSticky,
    SmallBangGia,
    Videos,
    TagCloud
  },
  computed: {
    ...mapGetters({
      initialized: "articles/initialized",
      firstArticle: "articles/firstArticle",
      topArticles: "articles/topArticles",
      remainArticles: "articles/remainArticles",
      longTopBanners: "banner/longTopBanners",
      rightBanners: "banner/rightBanners",
      stickyBanners: "banner/stickyBanners",
      selectedCat: "categories/selectedCat",
      cloud: "tag/cloud"
    }),
    shuffledRightBanners() {
      return shuffle(this.rightBanners);
    },
    bannerTop() {
      return randomBanner(this.longTopBanners);
    },
    bannerSticky() {
      return randomBanner(this.stickyBanners);
    }
  },
  mounted() {
    const homeScrollY = this.$store.state.layout.homeScrollY;
    this.$store.dispatch("layout/scrollYTo", homeScrollY);

    document.title = process.env.VUE_APP_TITLE;
    window.ga("set", {
      page: "/",
      title: process.env.VUE_APP_TITLE
    });
    window.ga("send", "pageView");
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("layout/setHomeScrollY", window.scrollY);
    next();
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  max-width: calc(var(--container-width) - 56px);
  margin: 0 auto;
}
.grid-top {
  list-style: none;
  display: grid;
  height: 596px;
  grid-template:
    "first bangGia" 1.61fr
    "top top" 1fr / 1fr 1fr;
}
.grid-list {
  display: grid;
  grid-template: "articlesList ." / var(--article-list-ratio) 1fr;
  .right-wrapper {
    padding-top: 1rem;
  }
}
@media (max-width: 650px) {
  .grid-top {
    height: 1153px;
    grid-template:
      "first" 1.5fr
      "bangGia" 1.8fr
      "top" 2.5fr / 1fr;
  }
  .grid-list {
    grid-template: "articlesList" / 1fr;
    .right-wrapper {
      display: none;
    }
  }
}
</style>
