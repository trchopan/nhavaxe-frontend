<template>
  <div id="app">
    <NavBar />
    <div id="page-head"></div>
    <LoadingIndicator />
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
    <div id="page-footer"></div>
  </div>
</template>

<script>
import { logger } from "@/helpers.js";
import NavBar from "@/components/NavBar.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

export default {
  name: "App",
  components: {
    NavBar,
    LoadingIndicator
  },
  async created() {
    logger("App created");
    this.$store.dispatch("categories/getCategories");
    if (this.$route.name === "article") {
      this.$store.dispatch("articles/selectArticle", this.$route.params.id);
    }
    this.$store.dispatch("articles/fetchCatArticles");
    this.$store.dispatch("banner/fetchBannersList");
    this.$store.dispatch("bangGia/fetchBangGia");
    this.$store.dispatch("specials/fetchSpecials");
    // const specials = await this.$store.dispatch("specials/fetchSpecials");
    // this.$store.dispatch("articles/setFilterArticles", specials.articles);
  },
  mounted() {
    var scrollWatcher;
    document.querySelector("#app").addEventListener("scroll", event => {
      clearTimeout(scrollWatcher);
      scrollWatcher = setTimeout(() => {
        const scrollValues = {
          scrollTop: event.target.scrollTop,
          offsetHeight: event.target.offsetHeight,
          scrollHeight: event.target.scrollHeight,
          clientHeight: event.target.clientHeight
        };
        if (
          scrollValues.scrollTop >=
            scrollValues.scrollHeight - scrollValues.offsetHeight - 100 &&
          this.$route.path.split("/")[1] !== "bang-gia"
        ) {
          const catId = this.$store.state.categories.selectedCat.id;
          this.$store.dispatch("articles/fetchCatArticles", catId);
        }
      }, 200);
    });
  },
  computed: {
    articleError() {
      return this.$store.state.articles.error;
    },
    topBanner() {
      if (!this.longTopBanners) return null;

      const randomIndex = Math.floor(
        Math.random() * this.longTopBanners.length
      );
      return this.longTopBanners ? this.longTopBanners[randomIndex] : null;
    }
  },
  watch: {
    $route(to) {
      if (to.name === "article") {
        this.$store.dispatch("layout/scrollTop", 0);
        this.$store.dispatch("articles/selectArticle", to.params.id);
      }
    },
    articleError(newValue) {
      if (newValue.code === "not-found") {
        this.$router.push("/page-not-found");
      }
    }
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Muli:400,600|Merriweather:400,700");
@import "~normalize.css/normalize.css";
@import "assets/animation.scss";
@import "assets/table.scss";
@import "assets/quill.scss";
@import "assets/style.scss";
</style>
