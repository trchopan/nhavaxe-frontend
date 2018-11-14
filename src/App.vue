<template>
  <div id="app"
    :class="themeClass">
    <NavBar />
    <div id="page-head"></div>
    <LoadingIndicator />
    <transition name="slide" mode="out-in">
      <router-view />
    </transition>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout.js";
import { debounce } from "@/helpers.js";
import NavBar from "@/components/NavBar.vue";
import LoadingIndicator from "@/components/LoadingIndicator.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    NavBar,
    LoadingIndicator,
    Footer
  },
  computed: {
    ...mapGetters({
      theme: "layout/theme",
      appScrollUp: "layout/appScrollUp"
    }),
    themeClass() {
      return this.theme === themes.light
        ? { "light-theme": true }
        : { "dark-theme": true };
    }
  },
  async created() {
    const nowHour = new Date().getHours();
    if (nowHour >= 17 || nowHour < 6) {
      this.$store.dispatch("layout/changeTheme", themes.dark);
    }
    this.$store.dispatch("categories/getCategories");
    this.$store.dispatch("banggia/fetchBangGia");
    this.$store.dispatch("articles/fetchCatArticles");
  },
  mounted() {
    let lastScrollY = 0;
    window.onscroll = () => {
      const scrollY = window.scrollY;
      if (scrollY > 300 && scrollY > lastScrollY && this.appScrollUp !== true) {
        this.$store.dispatch("layout/appScrollUp", true);
      } else if (scrollY < lastScrollY && this.appScrollUp !== false) {
        this.$store.dispatch("layout/appScrollUp", false);
      }
      lastScrollY = scrollY;

      debounce(() => {
        const offsetHeight = document.body.offsetHeight;
        const innerHeight = window.innerHeight;
        if (
          innerHeight + scrollY >= offsetHeight - 500 &&
          this.$route.path.split("/")[1] !== "bang-gia" &&
          this.$route.path.split("/")[1] !== "tags"
        ) {
          const catId = this.$store.state.categories.selectedCat.id;
          this.$store.dispatch("articles/fetchCatArticles", catId);
        }
      }, 200)();
    };
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
