<template>
  <ul class="container">
    <template v-for="(article, index) in articlesList">
      <li :key="article.id">
        <article-link-wrapper :id="article.id">
          <div
            class="cover-image"
            :style="'background-image: url(' + article.coverImg + ');'"
          ></div>
        </article-link-wrapper>
        <div class="info">
          <p class="title">
            <article-link-wrapper
              :id="article.id"
            >{{ article.title | trimText(maxTitle) }}</article-link-wrapper>
          </p>
          <p class="publish-at">
            {{ article.publishAt | parsePublishAt }}
            <span
              v-if="article.video"
            >🎬</span>
          </p>
          <p class="sapo">{{ article.sapo | trimText(maxSapo) }}</p>
        </div>
      </li>
      <BannerArticleList
        v-if="index > 0 && index % ArticleBannerInterval === 0"
        :key="'banner-list-' + index"
        :banner="shuffledBanners[ index / ArticleBannerInterval ]"
      />
      <ArticlesSpecials
        v-if="index > 0 && index / ArticleBannerInterval === 1"
        :key="'specials-list-' + index"
      />
      <li :key="'tagcloud-' + index">
        <TagCloud
          v-if="smallScreen && index > 0 && index / ArticleBannerInterval === 1"
          class="tagcloud"
          :tagsList="cloud"
          @selected="$router.push('/tag/' + $event)"
        />
      </li>
    </template>
    <li
      v-show="reachedFetchLimit"
      class="load-more"
    >
      <button
        class="button"
        type="button"
        @click="loadMore()"
      >Tải thêm</button>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from "vuex";
import { shuffle } from "@/helpers";
import { ArticleBannerInterval } from "@/store/modules/banner.js";
import BannerArticleList from "@/components/BannerArticleList.vue";
import ArticlesSpecials from "@/components/ArticlesSpecials.vue";
import ArticleLinkWrapper from "@/components/ArticleLinkWrapper.vue";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "ArticlesList",
  components: {
    BannerArticleList,
    ArticlesSpecials,
    ArticleLinkWrapper,
    TagCloud
  },
  data() {
    return {
      ArticleBannerInterval,
      maxTitle: 999,
      maxSapo: 180,
      smallScreen: false
    };
  },
  props: {
    selectedCat: Object,
    articlesList: Array,
    replace: Boolean
  },
  computed: {
    ...mapGetters({
      articleBanners: "banner/articleBanners",
      reachedFetchLimit: "articles/reachedFetchLimit",
      cloud: "tag/cloud"
    }),
    shuffledBanners() {
      return shuffle(this.articleBanners);
    }
  },
  mounted() {
    let clientWidth = window.innerWidth;
    if (clientWidth < 769 && clientWidth > 500) {
      this.maxTitle = 95;
      this.maxSapo = 90;
    }
    if (clientWidth <= 500) {
      this.maxTitle = 75;
      this.maxSapo = 0;
    }
    if (clientWidth < 650) {
      this.smallScreen = true;
    }
  },
  methods: {
    loadMore() {
      this.$store.dispatch("articles/increaseFetchLimit");
      this.$store.dispatch("articles/fetchCatArticles", this.selectedCat.id);
    },
    selectArticle(article) {
      this.$store.dispatch("articles/selectArticle", article.id);
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
  .load-more {
    grid-template-columns: 1fr;
  }
}
.tagcloud {
  grid-column: span 2;
}
.cover-image {
  display: inline-block;
  width: 100%;
  padding-bottom: 80%;
  background-size: cover;
  background-position: 50%;
  cursor: pointer;
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
    font: var(--title-font__bold) 1.1rem var(--title-font);
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
