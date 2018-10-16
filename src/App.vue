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
    const specials = await this.$store.dispatch("specials/fetchSpecials");
    this.$store.dispatch("articles/setFilterArticles", specials.articles);
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

:root {
  --primary-color: #ed1d24;
  --primary-color-tint: #ffdfe0;
  --primary-background-tint: #f3e3e3;
  --secondary-color: #159cd8;
  --secondary-color-tint: #cfedfa;
  --text-main-color: #000000;
  --text-accent-color: #ffffff;
  --text-secondary-color: #787878;
  --text-faded-color: #adacac;
  --title-font: Muli;
  --title-font__bold: 600;
  --title-font__normal: 400;
  --default-font: sans-serif;
  --text-font: Merriweather;
  --text-font__bold: 700;
  --text-font__normal: 400;
  --container-width: 996px;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  outline: none;
}
body {
  font-family: var(--default-font);
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: var(--text-main-color);
}
.block {
  display: block;
}
.top-banner {
  width: 100%;
  height: 90px;
}
#app {
  height: 100vh;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
#page-head {
  height: 4rem;
}
#page-footer {
  height: 3rem;
}
</style>
