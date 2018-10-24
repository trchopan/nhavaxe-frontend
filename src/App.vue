<template>
  <div id="app"
    :class="themeClass">
    <NavBar />
    <div id="page-head"></div>
    <LoadingIndicator />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
    <div id="page-footer"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import NavBar from "@/components/NavBar.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import { themes } from "@/store/modules/layout.js";

export default {
  name: "App",
  components: {
    NavBar,
    LoadingIndicator
  },
  computed: {
    ...mapGetters({
      theme: "layout/theme"
    }),
    themeClass() {
      return this.theme === themes.light
        ? { "light-theme": true }
        : { "dark-theme": true };
    }
  },
  async created() {
    const nowHour = new Date().getHours();
    if (nowHour > 17 || nowHour < 5)
      this.$store.dispatch("layout/changeTheme", themes.dark);
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("banner/fetchBannersList");
    this.$store.dispatch("bangGia/fetchBangGia");
    const result = await this.$store.dispatch("specials/fetchSpecials");
    this.$store.dispatch(
      "articles/setFilterArticles",
      result.specials.articles
    );
    this.$store.dispatch("articles/fetchCatArticles");
  },
  mounted() {
    let scrollWatcher;
    let lastScrollTop;
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
