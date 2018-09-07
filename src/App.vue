<template>
  <div id="app">
    <div id="page-head"></div>
    <NavBar />
    <LoadingIndicator />
    <transition name="slide" mode="out-in">
      <router-view/>
    </transition>
    <div id="page-footer"></div>
  </div>
</template>

<script>
import { logger } from "@/store";
import NavBar from "@/components/NavBar.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";

export default {
  name: "App",
  components: {
    NavBar,
    LoadingIndicator
  },
  created() {
    logger("App created");
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("bangGia/fetchBangGia");
    if (this.$route.name === "home") {
      this.$store.dispatch("articles/fetchCatArticles");
    }
    if (this.$route.name === "article") {
      this.$store.dispatch("articles/selectArticle", this.$route.params.id);
    }
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
          this.$store.dispatch("articles/fetchCatArticles");
        }
      }, 200);
    });
  },
  computed: {
    articleError() {
      return this.$store.state.articles.error;
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
  --secondary-color: #159cd8;
  --text-main-color: #000000;
  --text-accent-color: #ffffff;
  --text-secondary-color: #787878;
  --text-faded-color: #adacac;
  --title-font: "Muli";
  --default-font: sans-serif;
  --text-font: Merriweather;
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
