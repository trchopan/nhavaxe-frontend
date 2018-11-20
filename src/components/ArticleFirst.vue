<template>
  <div class="container" v-if="article">
    <article-link-wrapper :id="article.id">
      <div class="cover-image"
        :style="'background-image: url(' + article.coverImg + ');'">
      </div>
      <div class="info">
        <p class="title">
          {{ article.title }}
        </p>
      </div>
    </article-link-wrapper>
  </div>
</template>

<script>
import ArticleLinkWrapper from "@/components/ArticleLinkWrapper.vue";

export default {
  name: "ArticleFirst",
  components: {
    ArticleLinkWrapper
  },
  props: {
    article: Object
  },
  methods: {
    selectArticle(article) {
      this.$store.dispatch("articles/selectArticle", article.id);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  grid-area: first;
  overflow: hidden;
  margin: 0.25rem;
  box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
  border-radius: 2px;
  .cover-image {
    width: 100%;
    height: 100%;
    background-size: cover;
    background-position: 50%;
    transition: transform 0.2s ease-in;
  }
  .cover-image:hover {
    transform: scale(1.03);
  }
  div.info {
    background: linear-gradient(rgba(0, 0, 0, 0.475), black);
    transform: translateY(-100%);
    padding: 0.25rem 0.5rem;
    .title {
      color: var(--text-accent-color);
      font: 600 1.2rem/130% var(--title-font);
    }
  }
}
</style>
