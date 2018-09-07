<template>
  <ul>
    <li v-for="article in articlesList"
      :key="article.id">
      <router-link :to="'/article/' + article.id">
        <div class="cover-image"
          :style="'background-image: url(' + article.coverImg + ');'">
          <p v-if="selectedCat.id === '/'" :class="'category cat-' + article.categoryId">
            {{ article.categoryName }}
          </p>
        </div>
        <div class="info">
          <p class="title">
            {{ article.title | trimText(maxTitle) }}
          </p>
          <p class="publish-at">
            {{ article.publishAt | parsePublishAt }}
            <span v-if="article.video">🎬</span>
            <br class="break-point" />
          </p>
          <p class="sapo">
            {{ article.sapo | trimText(maxSapo) }}
          </p>
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script>
export default {
  name: "ArticlesList",
  data() {
    return {
      maxTitle: 70,
      maxSapo: 0
    };
  },
  created() {
    let clientWidth = window.innerWidth;
    if (clientWidth > 799) {
      this.maxTitle = 120;
      this.maxSapo = 200;
    }
  },
  props: {
    articlesList: Array,
    selectedCat: Object
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
  max-width: calc(var(--container-width) - 56px);
  margin: auto;
  li > a {
    display: grid;
    grid-template-columns: 30% auto;
    position: relative;
    margin-bottom: 1rem;
    padding: 0 1rem;
    height: calc(100vw * 0.23);
    max-height: 150px;
    cursor: pointer;
  }
  li > a:hover {
    color: var(--secondary-color);
  }
}
div.cover-image {
  display: inline-block;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position-y: 23%;
}
p.category {
  position: absolute;
  color: white;
  padding: 0.2em 0.5em;
  left: 0.6rem;
  bottom: 0.5rem;
  font: 400 0.8rem var(--title-font);
}
p.cat-3WYMgrmpfuLornXzAnnY {
  background: var(--secondary-color);
}
p.cat-JfDm8uW3Bgt3GdHhmxnF {
  background: #ff8800;
}
p.cat-RWTkmXHmJca6Zap12f87 {
  background: var(--primary-color);
}
p.cat-iqs4rjIm4vsOsckd8ETf {
  background: #00aa09;
}
div.info {
  display: inline-block;
  padding: 0 1rem;
  p {
    margin-bottom: 0.3rem;
  }
  p.title {
    font: 600 1.1rem var(--title-font);
  }
  p.sapo {
    font: 400 1rem var(--title-font);
    color: var(--text-secondary-color);
  }
  p.publish-at {
    color: var(--text-faded-color);
    font: 400 0.8rem var(--title-font);
    padding: 0;
  }
  .break-point {
    display: none;
  }
}
@media (max-width: 599px) {
  li {
    padding: 0 0.5rem;
  }
  div.info {
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
    .break-point {
      display: block;
    }
  }
  p.category {
    font-size: 0.8rem;
    bottom: 0.2rem;
  }
}
</style>
