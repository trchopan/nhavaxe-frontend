<template>
  <form id="tagForm" @submit="onSubmit" method="get">
    <p>{{ query }}</p>
    <label for="tag-input">Tag: </label>
    <input id="tag-input" type="text" v-model="tagInput" />
    <button class="button">Tìm</button>
  </form>
</template>

<script>
export default {
  name: "TagForm",
  data: () => ({
    query: "",
    tagInput: ""
  }),
  methods: {
    onSubmit(e) {
      this.query += this.query.length ? "|" : "";
      this.query += this.tagInput;
      this.tagInput = "";
      this.$store.dispatch("tag/queryTags", this.query);
      this.$router.replace({ name: "tag-results", params: { id: this.query } });
      e.preventDefault();
    }
  }
};
</script>

<style lang="scss" scoped>
form {
  text-align: center;
}
</style>
