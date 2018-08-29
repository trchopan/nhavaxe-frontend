<template>
  <transition name="slide">
    <div>
      <ArticlesTop :articlesList="topArticles" />
      <ArticlesList :selectedCat="selectedCat"
        :articlesList="remainArticles" />
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";
import ArticlesTop from "@/components/ArticlesTop.vue";
import ArticlesList from "@/components/ArticlesList.vue";

export default {
  name: "Home",
  components: {
    ArticlesTop,
    ArticlesList
  },
  computed: mapGetters({
    topArticles: "articles/topArticles",
    remainArticles: "articles/remainArticles",
    selectedCat: "categories/selectedCat"
  }),
  mounted() {
    const homeScrollTop = this.$store.state.layout.homeScrollTop;
    this.$store.dispatch("layout/scrollTop", homeScrollTop);

    document.title = process.env.VUE_APP_TITLE;
    window.ga("set", {
      page: "/",
      title: process.env.VUE_APP_TITLE
    });
    window.ga("send", "pageView");
  },
  beforeRouteLeave(to, from, next) {
    const app = document.querySelector("#app");
    this.$store.dispatch("layout/setHomeScrollTop", app.scrollTop);
    next();
  }
};
</script>

<style scoped lang="scss">
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s;
}
.slide-enter-to,
.slide-leave {
  transform: translateX(0);
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100vw);
}
</style>
