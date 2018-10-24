<template>
  <ul class="container">
    <template v-for="(article, index) in articlesList">
      <li :key="article.id">
        <router-link v-if="article.publishAt"
          :to="'/article/' + article.id">
          <div 
            class="cover-image"
            :style="'background-image: url(' + article.coverImg + ');'">
          </div>
        </router-link>
        <div v-else
          class="cover-image-loading">
        </div>
        <div class="info">
          <p v-if="article.publishAt" class="title">
            <router-link :to="'/article/' + article.id">
              {{ article.title | trimText(maxTitle) }}
            </router-link>
          </p>
          <p v-else class="title">...loading</p>
          <p class="publish-at">
            {{ article.publishAt | parsePublishAt }}
            <span v-if="article.video">🎬</span>
          </p>
          <p class="sapo">
            {{ article.sapo | trimText(maxSapo) }}
          </p>
        </div>
      </li>
      <BannerArticleList v-if="index > 0 && index % ArticleBannerInterval === 0"
        :key="'banner-list-' + index"
        :banner="shuffledBanners[ index / ArticleBannerInterval ]" />
      <ArticlesSpecials v-if="index > 0 && index / ArticleBannerInterval === 1"
        :key="'specials-list-' + index"/>
    </template>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffle } from "@/helpers";
import { ArticleBannerInterval } from "@/store/modules/banner.js";
import BannerArticleList from "@/components/BannerArticleList.vue";
import ArticlesSpecials from "@/components/ArticlesSpecials.vue";

export default {
  name: "ArticlesList",
  components: {
    BannerArticleList,
    ArticlesSpecials
  },
  data() {
    return {
      ArticleBannerInterval,
      maxTitle: 999,
      maxSapo: 180
    };
  },
  props: {
    selectedCat: Object,
    articlesList: Array
  },
  computed: {
    ...mapGetters({
      articleBanners: "banner/articleBanners"
    }),
    shuffledBanners() {
      return shuffle(this.articleBanners);
    }
  },
  mounted() {
    let clientWidth = window.innerWidth;
    if (clientWidth < 799 && clientWidth > 500) {
      this.maxTitle = 95;
      this.maxSapo = 90;
    }
    if (clientWidth <= 500) {
      this.maxTitle = 75;
      this.maxSapo = 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  grid-area: articlesList;
  li {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 25% auto;
    position: relative;
    padding: 0 1rem;
  }
}
.cover-image,
.cover-image-loading {
  display: inline-block;
  width: 100%;
  padding-bottom: 80%;
  background-size: cover;
  background-position: 50%;
  cursor: pointer;
}
.cover-image-loading {
  background-image: url("/image-placeholder.png");
}
.info {
  display: flex;
  padding: 0 1rem;
  flex-direction: column;
  justify-content: center;
  p {
    margin-bottom: 0.3rem;
  }
  p.title {
    a:hover {
      color: var(--secondary-color);
      cursor: pointer;
    }
    font: 600 1.1rem var(--title-font);
  }
  p.sapo {
    font: 400 0.9rem var(--title-font);
    color: var(--text-secondary-color);
  }
  p.publish-at {
    color: var(--text-faded-color);
    font: 400 0.8rem var(--title-font);
    padding: 0;
  }
}
@media (max-width: 599px) {
  ul.container {
    grid-template-areas: "article article article";
    li {
      padding: 0 0.5rem;
      margin: 0.5rem auto;
    }
    .info {
      p {
        margin: 0;
      }
      p.title {
        font-size: 0.9rem;
      }
      p.publish-at {
        font-size: 0.8rem;
      }
      p.sapo {
        display: none;
      }
    }
  }
}
</style>
