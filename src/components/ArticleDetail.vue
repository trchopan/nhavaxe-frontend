<template>
  <div> 
    <h1 class="article-title">
      {{ articleMeta.title }}
    </h1>
    <p class="article-info">
      <span class="category">{{ articleMeta.categoryName }}</span>&nbsp;
      <span class="publish-time">{{ articleMeta.publishAt | date }}</span>
    </p>
    <p class="article-sapo">
      {{ articleMeta.sapo }}
    </p>
    <hr>
    <div v-if="articleMeta.video"
      class="youtube-container">
      <div class="center youtube">
        <iframe
          :src="articleMeta.video | parseYoutubeLink"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
      </div>
    </div>
    <div v-html="articleBody"
      :class="'article-body ql-editor ' + articleMeta.style + '-style'">
    </div>
    <p class="article-source">
      Dẫn nguồn từ
      <span>{{ articleMeta.reference }}</span> &copy;
      <span>{{ articleMeta.publisher }}</span>
    </p>
    <hr>
    <ul class="article-tags">
      <span>Tags:</span>
      <li v-for="(tag, i) in articleMeta.tags" :key="i + tag">
        &#35; {{ tag }}
        <span v-if="i < articleMeta.tags.length - 1">&#44;</span>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import ArticlesList from "@/components/ArticlesList.vue";

export default {
  name: "ArticleDetail",
  components: {
    ArticlesList
  },
  computed: {
    ...mapGetters({
      articleMeta: "articles/selectedArticleMeta",
      articleBody: "articles/selectedArticleBody"
    })
  }
};
</script>

<style scoped lang="scss">
h1.article-title {
  margin: 1rem 0;
  padding: 0 1.5rem;
  font: 600 2.4rem/2.8rem var(--title-font), sans-serif;
}
p.article-info {
  padding: 0 1.5rem;
  .category {
    font: bold var(--default-font);
    background: black;
    color: white;
    padding: 0 0.5rem;
  }
  .publish-time {
    color: var(--text-faded-color);
  }
}
p.article-sapo {
  padding: 1rem 1.5rem;
  font: italic 1.1rem/1.8rem var(--text-font), serif;
  text-align: justify;
}
.article-publish-at {
  color: var(--text-faded-color);
  text-align: right;
  padding: 0 1rem;
}
.youtube-container {
  max-width: 560px;
  margin: 2rem auto;
}
.youtube {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
.article-body {
  padding: 1rem 1.5rem;
  font-family: var(--text-font);
  overflow: visible;
}
hr {
  border: 0;
  height: 1px;
  background-image: linear-gradient(
    to right,
    var(--background-color),
    var(--primary-color),
    var(--background-color)
  );
}
ul.article-tags {
  padding: 1rem;
  font-size: 0.9rem;
  span {
    color: var(--secondary-color);
    font: var(--default-font);
  }
  li {
    display: inline;
    color: var(--primary-color);
  }
}
.article-source {
  display: block;
  margin: 0 1.5rem 1rem;
  text-align: right;
  color: var(--text-faded-color);
  font: italic 1rem var(--text-font);
}
</style>
