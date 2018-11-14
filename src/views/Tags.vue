<template>
  <div class="about">
    <h1>This is tag page</h1>
    <pre>{{ this.tags }}</pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Tags",
  computed: {
    ...mapGetters({ articlesList: "articles/articlesList" }),
    tags() {
      return this.articlesList.reduce((acc, cur) => acc.concat(cur.tags), []);
    }
  }
};
</script>
