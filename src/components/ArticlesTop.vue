<template>
  <ul class="container">
    <li v-for="(article, i) of articlesList"
      :key="article.id"
      class="li-article"
      :class="'li-' + i">
      <div class="cover-image">
        <router-link v-if="article.publishAt"
          :to="'/article/' + article.id">
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
            :to="'/article/' + article.id">
            {{ article.title | trimText(maxTitle) }}
          </router-link>
        </p>
      </div>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ArticlesTop",
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
  li {
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
        background-position: 23%;
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
@media (max-width: 650px) {
  ul {
    grid-template-areas:
      "a a"
      "b c";
    li {
      a.cover-image > div.faded-mask {
        height: 7rem;
      }
      div.info > .title > a {
        color: var(--text-accent-color);
        font: 600 1.1rem/120% var(--title-font);
      }
    }
  }
}
</style>
