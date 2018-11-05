<template>
  <nav :class="navClass">
    <ul>
      <li @click="logoClicked()">
        <div :class="{ logo: true, 'logo-mini': appScrollUp }">
          <img v-show="!appScrollUp" :src="logo" alt="logo" />
          <img v-show="appScrollUp" :src="miniLogo" alt="logo" />
        </div>
      </li>
      <li class="nav-text" v-if="expand" @click="navigate(null)">Trang chủ</li>
      <li v-for="cat in categories"
        @click="navigate(cat)"
        :key="cat.id"
        :class="{'nav-text': true, selected: cat === selectedCat }">
        {{ cat.name }}
      </li>
    </ul>
    <div v-if="expand" @click="expand = false" class="nav-mask"></div>
  </nav>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout.js";

export default {
  name: "NavBar",
  data: () => ({
    miniLogo: process.env.VUE_APP_LOGO_MINI,
    smallScreen: false,
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
    menuIcon() {
      return this.theme === themes.light
        ? "/menu-black.png"
        : "/menu-white.png";
    },
    navClass() {
      return {
        mini: this.appScrollUp,
        "nav-expand": this.expand
      };
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
    },
    logoClicked() {
      if (window.innerWidth < 600) {
        this.expand = !this.expand;
      } else {
        this.navigate(null);
      }
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
  z-index: 3;
  display: grid;
  grid-template-columns: repeat(5, auto);
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
    bottom: -0.25rem;
    left: 25%;
    transition: width 200ms ease-in;
  }
  li.selected::after {
    width: 50%;
    background: var(--primary-color);
  }
  li.nav-text:hover::after {
    width: 50%;
  }
}
.nav-mask {
  z-index: 2;
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
.logo-mini {
  height: 1.5rem;
}
.logo:hover {
  transform: scale(1.05);
}
.mini {
  height: 2.5rem;
}
@media (max-width: 769px) {
  .logo {
    height: 2rem;
  }
  .logo-mini {
    height: 1rem;
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
  .mini {
    height: 2rem;
  }
}
@media (max-width: 600px) {
  nav {
    overflow: hidden;
  }
  .nav-expand {
    height: 14rem;
  }
  nav > ul {
    width: 100%;
    grid-template-columns: 1fr;
    align-self: flex-start;
    grid-gap: 1rem;
    margin-top: 0.5rem;
    li {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
