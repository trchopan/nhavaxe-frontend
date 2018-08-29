<template>
  <ul>
    <li v-for="(article, i) of articlesList"
      :key="article.id"
      :class="'li-'+i"
      @click="select(article)">
      <a class="cover-image"> 
        <div class="image"
          :style="'background-image: url(' + article.coverImg + ');'">
        </div>
      </a>
      <div class="info">
        <p class="title">
          <a>
            {{ article.title }}
          </a>
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
  methods: {
    select(article) {
      this.$router.push("/article/" + article.id);
    }
  }
};
</script>

<style scoped lang="scss">
ul {
  margin: 0 auto 1rem;
  max-width: calc(var(--container-width) - 56px);
  list-style: none;
  display: grid;
  height: 596px;
  grid-template:
    "a a b" 38%
    "a a c" 24%
    "d e f" 38% / 1fr 1fr 1fr;
  li {
    position: relative;
    a.cover-image {
      position: absolute;
      top: 0.25rem;
      left: 0.25rem;
      bottom: 0.25rem;
      right: 0.25rem;
      box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
        0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      border-radius: 2px;
      div.image {
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position-y: 23%;
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
        font: 400 1.2rem/130% Roboto;
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
  .li-3 {
    grid-area: d;
  }
  .li-4 {
    grid-area: e;
  }
  .li-5 {
    grid-area: f;
  }
}
@media (max-width: 650px) {
  ul {
    height: 100vh;
    grid-template:
      "a a" 1.2fr
      "b b" 1fr
      "c d" 1fr
      "e f" 1fr / 1fr 1fr;
    li {
      a.cover-image > div.faded-mask {
        height: 7rem;
      }
      div.info > .title > a {
        color: var(--text-accent-color);
        font: 400 1rem/120% Roboto;
      }
    }
  }
}
</style>
