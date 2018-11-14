<template>
  <div class="container" v-if="article">
    <div class="cover-image">
      <router-link v-if="article.publishAt"
        :to="'/article/' + article.id"
        @click.native="selectArticle(article)">
        <div v-if="article.publishAt"
          class="image"
          :style="'background-image: url(' + article.coverImg + ');'">
        </div>
      </router-link>
      <div v-else
        class="image-loading">
      </div>
    </div>
    <div v-if="article.publishAt" class="info">
      <p class="title">
        <router-link v-if="article.publishAt"
          :to="'/article/' + article.id"
          @click.native="selectArticle(article)">
          {{ article.title }}
        </router-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ArticleFirst",
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
  position: relative;
  .cover-image {
    position: absolute;
    top: 0.25rem;
    left: 0.25rem;
    bottom: 0.25rem;
    right: 0.25rem;
    overflow: hidden;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 2px;
    .image,
    .image-loading {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 50%;
      transition: transform 0.2s ease-in;
    }
    .image:hover {
      transform: scale(1.03);
    }
    .image-loading {
      background-image: url("/image-placeholder.png");
    }
  }
  div.info {
    position: absolute;
    bottom: 0.25rem;
    left: 0.25rem;
    right: 0.25rem;
    padding: 0.5rem;
    background: linear-gradient(rgba(0, 0, 0, 0), black);
    .title > a {
      color: var(--text-accent-color);
      font: 600 1.2rem/130% var(--title-font);
    }
    .publish-at,
    .sapo {
      display: none;
    }
  }
}
</style>
