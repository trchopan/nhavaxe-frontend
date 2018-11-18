<template>
  <ul>
    <template v-for="(article, index) in list.slice(0, relatedMax)">
      <li :key="article.id">
        <router-link :to="'/article/' + article.id"
          @click.native="selectArticle(article)">
          <div class="related-article__card">
            <div class="related-article__img"
              :style="'background-image: url(' + article.coverImg + ');'">
            </div>
            <p class="related-article__title">
              {{ article.title | trimText(maxTitle) }}
            </p>
          </div>
        </router-link>
      </li>
      <BannerRelated v-if="shouldShowBanner(index)" 
        :key="'banner' + article.id"
        :banner="getBanner(index)"/>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffle } from "@/helpers.js";
import BannerRelated from "@/components/BannerRelated.vue";

export default {
  name: "RelatedList",
  components: {
    BannerRelated
  },
  props: {
    list: Array
  },
  data() {
    return {
      maxTitle: 999,
      relatedMax: 10,
      relatedBannerInterval: 3
    };
  },
  computed: {
    ...mapGetters({
      // relatedList: "articles/relatedList",
      relateBanners: "banner/relateBanners"
    }),
    shuffledBanner() {
      return shuffle(this.relateBanners);
    }
  },
  methods: {
    shouldShowBanner(index) {
      return (
        index >= this.relatedBannerInterval + 1 &&
        index % this.relatedBannerInterval === 0
      );
    },
    getBanner(position) {
      let index = Math.floor(position / this.relatedBannerInterval);
      index = index < this.shuffledBanner.length ? index : 0;
      return this.shuffledBanner[index];
    },
    selectArticle(article) {
      this.$store.dispatch("articles/selectArticle", article.id);
    }
  },
  mounted() {
    let clientWidth = window.innerWidth;
    if (clientWidth < 769 && clientWidth > 500) {
      this.maxTitle = 95;
      this.relatedMax = 7;
      this.relatedBannerInterval = 2;
    }
    if (clientWidth < 500) {
      this.maxTitle = 75;
      this.relatedMax = 4;
      this.relatedBannerInterval = 1;
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  padding-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-gap: 0.7rem;
  li {
    cursor: pointer;
    box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
  }
  .related-article__card {
    display: grid;
    background-color: var(--background-color-faded);
    grid-template-rows: auto 1fr;
    height: 100%;
  }
  .related-article__title {
    font: 600 1rem var(--title-font);
    padding: 0.8rem;
    align-self: start;
  }
  .related-article__img {
    background-size: cover;
    padding-bottom: 83.33%;
  }
  @media (max-width: 769px) {
    grid-template-columns: 1fr 1fr 1fr;
    padding: 0.5rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr 1fr;
    .related-article__title {
      font-size: 0.9rem;
    }
  }
}
</style>
