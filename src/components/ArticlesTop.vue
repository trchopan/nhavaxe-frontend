<template>
  <ul>
    <li v-for="(article, i) of articlesList"
      :key="article.id"
      class="li-article"
      :class="'li-'+i">
      <router-link :to="'/article/' + article.id">
        <div class="cover-image">
          <div class="image"
            :style="'background-image: url(' + article.coverImg + ');'">
          </div>
        </div>
        <div class="info">
          <p class="title">
            <a>
              {{ article.title }}
            </a>
          </p>
        </div>
      </router-link>
    </li>
    <li class="li-bang-gia"><SmallBangGia /></li>
  </ul>
</template>

<script>
import SmallBangGia from "@/components/SmallBangGia.vue";

export default {
  name: "ArticlesTop",
  components: {
    SmallBangGia
  },
  props: {
    articlesList: Array
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
    "a a a b b b" 38%
    "a a a b b b" 24%
    "c c d d e e" 38% / 1fr 1fr 1fr 1fr 1fr 1fr;
  li {
    position: relative;
    font-family: "Source Sans Pro", "Courier New", Courier, monospace;
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
  .image {
    transition: transform 0.2s ease-in;
  }
  .image:hover {
    transform: scale(1.03);
  }
  .li-bang-gia {
    grid-area: b;
  }
  .li-0 {
    grid-area: a;
  }
  .li-1 {
    grid-area: c;
  }
  .li-2 {
    grid-area: d;
  }
  .li-3 {
    grid-area: e;
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
    height: 1153px;
    grid-template:
      "a a" 1.5fr
      "b b" 1.8fr
      "c c" 1.5fr
      "d e" 1fr / 1fr 1fr;
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
