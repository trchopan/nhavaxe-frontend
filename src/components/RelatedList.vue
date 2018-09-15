<template>
<ul>
  <li v-for="article in relatedList"
    :key="article.id">
    <router-link :to="'/article/' + article.id">
      <div class="related-article__card">
        <p class="related-article__title">{{ article.title }}</p>
        <div class="related-article__img"
          :style="'background-image: url(' + article.coverImg + ');'">
        </div>
      </div>
    </router-link>
  </li>
</ul>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "RelatedList",
  computed: mapGetters({
    relatedList: "articles/relatedList"
  })
};
</script>

<style scoped lang="scss">
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  li {
    cursor: pointer;
    width: 289px;
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2),
      0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    @media (max-width: 500px) {
      width: 100%;
      margin: 1rem;
    }
  }
  .related-article__card {
    width: 100%;
    height: 100%;
  }
  .related-article__title {
    font: 600 1rem var(--title-font);
    padding-bottom: 0.3rem;
  }
  .related-article__img {
    height: 200px;
    background-size: cover;
    margin: 0rem -1rem -1rem;
  }
}
</style>
