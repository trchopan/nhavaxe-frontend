<template>
  <div v-if="articleMeta && articleBody" class="article-container">
    <h1 class="article-title">
      {{ articleMeta.title }}
    </h1>
    <p class="article-info">
      <span class="category">{{ articleMeta.categoryName }}</span>&#124;
      <span class="publish-time">{{ articleMeta.publishAt | date }}</span>
    </p>
    <p class="article-sapo">
      {{ articleMeta.sapo }}
    </p>
    <hr>
    <div v-if="youtubeLink"
      class="youtube-container">
      <div class="center youtube">
        <iframe
          :src="'https://www.youtube.com/embed/' + youtubeLink"
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
    }),
    youtubeLink() {
      let video = this.$store.state.articles.selectedArticleMeta.video;

      if (!video) {
        return null;
      }

      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = video.match(regExp);
      return match && match[7].length == 11 ? match[7] : false;
    }
  },
  updated() {
    document.title = this.articleMeta.title;
  }
};
</script>

<style scoped lang="scss">
.article-container {
  background: white;
  margin: auto;
  max-width: var(--container-width);
}
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
hr {
  border: 0;
  height: 1px;
  background: var(--secondary-color);
  background-image: linear-gradient(
    to right,
    var(--primary-color-tint),
    var(--primary-color),
    var(--primary-color-tint)
  );
}
ul.article-tags {
  padding: 1rem;
  span {
    color: var(--secondary-color);
    font: var(--default-font);
  }
  li {
    display: inline;
    color: var(--primary-color);
  }
}
.article-body {
  padding: 1rem 1.5rem;
  font-family: var(--text-font);
  overflow: visible;
}
.article-source {
  padding: 1.5rem 1rem;
  text-align: right;
  color: rgba(0, 0, 0, 0.54);
  font: italic 1.1rem var(--text-font);
}
.article-cover-image {
  max-width: 100%;
}
.article-creator-detail {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: end;
  align-items: center;
  margin-right: 1rem;
}
.article-creator-name {
  padding: 0 1rem;
  white-space: nowrap;
}
.article-creator-avatar {
  grid-row: span 2;
  background-size: cover;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.article-publish-at {
  color: rgba(0, 0, 0, 0.54);
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
</style>
