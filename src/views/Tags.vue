<template>
  <div class="tag-container">
    <label for="tag-input">Tag: </label>
    <input id="tag-input" type="text" />
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "Tags",
  mounted() {
    console.log("Mounted");
  }
};
</script>

<style lang="scss" scoped>
.tag-container {
  max-width: var(--container-width);
  margin: 0 auto;
}
</style>
