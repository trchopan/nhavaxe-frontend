<template>
  <ul class="container">
    <li v-for="(article, i) of articlesList"
      :key="article.id"
      class="li-article"
      :class="'li-' + i">
      <article-link-wrapper :id="article.id">
        <div class="cover-image"
          :style="'background-image: url(' + article.coverImg + ');'">
        </div>
        <div class="info">
          <p class="title">
            {{ article.title | trimText(maxTitle) }}
          </p>
        </div>
      </article-link-wrapper>
    </li>
  </ul>
</template>

<script>
import ArticleLinkWrapper from "@/components/ArticleLinkWrapper.vue";

export default {
  name: "ArticlesTop",
  components: {
    ArticleLinkWrapper
  },
  props: {
    articlesList: Array
  },
  data() {
    return {
      maxTitle: 999
    };
  },
  mounted() {
    let clientWidth = window.innerWidth;
    if (clientWidth < 769 && clientWidth > 500) {
      this.maxTitle = 95;
    }
    if (clientWidth <= 500) {
      this.maxTitle = 75;
    }
  },
  methods: {
    selectArticle(article) {
      this.$store.dispatch("articles/selectArticle", article.id);
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  grid-area: top;
}
ul {
  list-style: none;
  display: grid;
  grid-template-areas: "a b c";
  grid-gap: 0.5rem;
  padding: 0.25rem;
  li {
    position: relative;
    overflow: hidden;
    border-radius: 2px;
    box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
    .cover-image {
      width: 100%;
      height: 100%;
      background-size: cover;
      background-position: 23%;
      transition: transform 0.2s ease-in;
    }
    .cover-image:hover {
      transform: scale(1.03);
    }
    .info {
      background: linear-gradient(rgba(0, 0, 0, 0.475), black);
      width: 100%;
      height: auto;
      transform: translateY(-100%);
      padding: 0.25rem 0.5rem;
      .title {
        color: var(--text-accent-color);
        font: 600 1.2rem/130% var(--title-font);
      }
    }
  }
  .li-0 {
    grid-area: a;
  }
  .li-1 {
    grid-area: b;
  }
  .li-2 {
    grid-area: c;
  }
}
@media (max-width: 600px) {
  ul {
    grid-template-areas:
      "a a"
      "b c";
    li {
      a.cover-image > div.faded-mask {
        height: 7rem;
      }
      div.info > .title {
        color: var(--text-accent-color);
        font: 600 1.1rem/120% var(--title-font);
      }
    }
  }
}
</style>
