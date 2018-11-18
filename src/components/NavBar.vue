<template>
  <nav :class="navClass">
    <button :class="{ 'menu-icon': true, active: expand }" @click="expand = !expand">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M0 0h24v24H0z" fill="none"/><path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/></svg>
    </button>
    <ul>
      <li>
        <div class="logo" @click="navigate(null)">
          <img :src="logo" alt="logo" />
        </div>
      </li>
      <li v-for="cat in categories" :key="cat.id"
        :class="{'nav-text': true, selected: cat === selectedCat }">
        <router-link to="/"
          replace
          @click.native="navigate(cat)">
        {{ cat.name }}
        </router-link>
      </li>
    </ul>
    <router-link to="/tag/search" class="search-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/><path d="M0 0h24v24H0z" fill="none"/></svg>
    </router-link>
    <div v-show="expand" @click="expand = false" class="nav-mask"></div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout.js";

export default {
  name: "NavBar",
  data: () => ({
    miniLogo: process.env.VUE_APP_LOGO_MINI,
    smallScreen: window.innerWidth < 600,
    expand: false
  }),
  computed: {
    ...mapGetters({
      appScrollUp: "layout/appScrollUp",
      theme: "layout/theme",
      categories: "categories/categories",
      selectedCat: "categories/selectedCat"
    }),
    logo() {
      return this.theme === themes.light
        ? process.env.VUE_APP_LOGO_LIGHT
        : process.env.VUE_APP_LOGO_DARK;
    },
    navClass() {
      return { hide: this.appScrollUp, "nav-expand": this.expand };
    }
  },
  watch: {
    appScrollUp(newValue) {
      if (newValue) {
        this.expand = false;
      }
    }
  },
  methods: {
    navigate(cat) {
      this.expand = false;
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
nav {
  height: 4rem;
  display: flex;
  z-index: 1;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  position: fixed;
  top: 0;
  background: var(--background-color);
  box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
  transition: all 200ms ease-in;
}
nav > ul {
  z-index: 2;
  position: relative;
  display: grid;
  grid-template-columns: repeat(5, auto);
  align-items: center;
  justify-content: center;
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
    background: var(--secondary-color);
    bottom: -0.25rem;
    left: 25%;
    transition: width 200ms ease-in;
  }
  li.selected::after {
    width: 50%;
    background: var(--secondary-color);
  }
  li.nav-text:hover::after {
    width: 50%;
  }
}
.nav-mask {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
.logo {
  height: 3rem;
  transform: scale(1);
  transition: all 200ms ease-in;
  img {
    width: auto;
    height: 100%;
  }
}
.logo:hover {
  transform: scale(1.05);
}
.hide {
  transform: translateY(-100%);
}
.menu-icon {
  display: none;
  position: absolute;
  top: 0;
  left: 0.5rem;
  width: 3rem;
  height: 3rem;
  justify-content: center;
  align-items: center;
  transform: rotate(0deg);
  transition: transform 200ms ease-in;
}
.search-icon {
  position: absolute;
  display: flex;
  top: 0;
  right: 0.5rem;
  width: 4rem;
  height: 4rem;
  justify-content: center;
  align-items: center;
  transition: background-color 200ms ease-in;
}
.menu-icon:hover,
.search-icon:hover {
  background-color: var(--box-shadow-faded);
  svg {
    fill: var(--secondary-color);
  }
}
.menu-icon > svg,
.search-icon > svg {
  fill: var(--primary-color);
}
.active {
  transform: rotate(90deg);
}
@media (max-width: 769px) {
  .logo {
    height: 2rem;
  }
  nav {
    height: 3rem;
    justify-content: flex-start;
    ul > li {
      padding: 0 1rem;
      font-size: 0.9rem;
    }
    overflow: auto;
  }
  .search-icon {
    width: 3rem;
    height: 3rem;
  }
}
@media (max-width: 600px) {
  nav {
    overflow: hidden;
  }
  .nav-expand {
    height: 12rem;
  }
  nav > ul {
    grid-template-columns: 1fr;
    align-self: flex-start;
    grid-gap: 1rem;
    margin: 0.5rem auto;
    li {
      width: 100%;
      text-align: center;
    }
  }
  .menu-icon {
    display: flex;
  }
}
</style>
