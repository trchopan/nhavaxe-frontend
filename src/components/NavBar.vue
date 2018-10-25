<template>
  <nav>
    <ul>
      <li @click="navigate(null)"><div class="logo"
        :style="logoBackground"></div></li>
      <li v-for="cat in categories"
        @click="navigate(cat)"
        :key="cat.id"
        class="nav-text">
        {{ cat.name }}
      </li>
    </ul>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout.js";

export default {
  name: "NavBar",
  computed: {
    ...mapGetters({
      theme: "layout/theme",
      categories: "categories/categories"
    }),
    logoBackground() {
      return this.theme === themes.light
        ? { "background-image": "url('/logo-2018-light.png')" }
        : { "background-image": "url('/logo-2018-dark.png')" };
    }
  },
  methods: {
    navigate(cat) {
      this.$store.dispatch("layout/scrollYTo", 0);
      this.$store.dispatch("layout/setHomeScrollY", 0);
      this.$store.dispatch("categories/selectCategory", cat);
      this.$store.dispatch("articles/flushArticles");
      this.$store.dispatch("articles/fetchCatArticles", cat ? cat.id : null);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
.logo {
  width: 6.3rem;
  height: 3.4rem;
  background-size: 100%;
  transform: scale(1);
  transition: transform 150ms ease-in;
  @media (max-width: 769px) {
    width: 4.7rem;
    height: 2.6rem;
  }
}
.logo:hover {
  transform: scale(1.05);
}
nav,
.nav-spacer {
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 4rem;
  @media (max-width: 769px) {
    height: 3rem;
  }
  flex-wrap: nowrap;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  background: var(--background-color);
  box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
}
nav > ul {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  white-space: nowrap;
  li {
    position: relative;
    padding: 0 2rem;
    font: 600 1rem var(--title-font);
    cursor: pointer;
  }
  li::after,
  li.selected::after {
    content: "";
    position: absolute;
    width: 0;
    height: 1px;
    background: var(--primary-color);
    bottom: -0.5rem;
    left: 25%;
    transition: width 150ms ease-in;
  }
  li.selected::after {
    width: 50%;
    background: var(--primary-color);
  }
  li.nav-text:hover::after {
    width: 50%;
  }
}
@media (max-width: 769px) {
  nav {
    justify-content: flex-start;
    ul > li {
      padding: 0 1rem;
      font-size: 0.9rem;
    }
    overflow: auto;
  }
}
</style>
