<template>
  <ul>
    <template v-for="(article, index) in relatedList">
      <li :key="article.id">
        <router-link :to="'/article/' + article.id">
          <div class="related-article__card">
            <p class="related-article__title">{{ article.title }}</p>
            <div class="related-article__img"
              :style="'background-image: url(' + article.coverImg + ');'">
            </div>
          </div>
        </router-link>
      </li>
      <BannerRelated v-if="index > 2 && index % RelatedBannerInterval === 0" 
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
  data() {
    return {
      RelatedBannerInterval: 2
    };
  },
  components: {
    BannerRelated
  },
  computed: {
    ...mapGetters({
      relatedList: "articles/relatedList",
      relateBanners: "banner/relateBanners"
    }),
    shuffledBanner() {
      return shuffle(this.relateBanners);
    }
  },
  methods: {
    getBanner(position) {
      let index =
        Math.floor(position / this.RelatedBannerInterval) -
        this.RelatedBannerInterval;
      index = index < this.shuffledBanner.length ? index : 0;
      return this.shuffledBanner[index];
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  padding-bottom: 0.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 0.7rem;
  @media (max-width: 769px) {
    padding: 0.5rem;
  }
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
  li {
    cursor: pointer;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  }
  .related-article__card {
    display: grid;
    grid-template-rows: 1fr auto;
    height: 100%;
  }
  .related-article__title {
    font: 600 1rem var(--title-font);
    padding: 0.8rem;
    align-self: center;
  }
  .related-article__img {
    background-size: cover;
    padding-bottom: 75.31%;
  }
}
</style>
