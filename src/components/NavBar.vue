<template>
  <nav>
    <ul>
      <li @click="navigate(null)"><div class="logo"></div></li>
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

export default {
  name: "NavBar",
  computed: mapGetters({
    categories: "categories/categories"
  }),
  methods: {
    navigate(cat) {
      this.$store.dispatch("layout/scrollTop", 0);
      this.$store.dispatch("layout/setHomeScrollTop", 0);
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
  width: 5rem;
  height: 2rem;
  background: url("../assets/logo.png");
  background-size: cover;
  transform: scale(1);
  transition: transform 150ms ease-in;
}
.logo:hover {
  transform: scale(1.1);
}
nav,
.nav-spacer {
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 3rem;
  flex-wrap: nowrap;
  width: 100%;
  overflow: hidden;
  position: fixed;
  top: 0;
  background: white;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.16), 0 0 0 1px rgba(0, 0, 0, 0.08);
}
nav > ul {
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  list-style: none;
  color: black;
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
    background: black;
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
@media (max-width: 799px) {
  nav {
    justify-content: flex-start;
    ul > li {
      padding: 0 1rem;
    }
    overflow: auto;
  }
}
</style>
