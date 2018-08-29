<template>
  <div id="app">
    <div id="page-head"></div>
    <NavBar />
    <LoadingIndicator />
    <router-view/>
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
          scrollValues.scrollHeight - scrollValues.offsetHeight - 100
        ) {
          this.$store.dispatch("articles/fetchCatArticles");
        }
      }, 100);
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
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro|Play|Merriweather");

:root {
  --primary-color: #ed1d24;
  --primary-color-tint: #ffdfe0;
  --secondary-color: #159cd8;
  --text-main-color: #000000;
  --text-accent-color: #ffffff;
  --text-secondary-color: #575757;
  --text-faded-color: #8a8a8a;
  --container-width: 1024px;
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
  font-family: "Source Sans Pro", "Courier New", Courier, monospace;
}
ul {
  list-style: none;
}
a {
  text-decoration: none;
  color: var(--text-main-color);
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
