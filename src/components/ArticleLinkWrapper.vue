<template>
  <router-link
    :to="'/article/' + id"
    :replace="replace"
    @click.native="selectArticle(id)"
    >
    <slot />
  </router-link>
</template>

<script>
export default {
  name: "ArticleLinkWrapper",
  props: {
    id: String,
    replace: Boolean
  },
  methods: {
    selectArticle(id) {
      this.$store.dispatch("articles/selectArticle", id);
    }
  }
};
</script>
