<template>
  <div class="tag-container">
    <TagForm />
    <router-view></router-view>
  </div>
</template>

<script>
import TagForm from "@/components/TagForm.vue";

export default {
  name: "Tag",
  components: {
    TagForm
  }
};
</script>

<style lang="scss" scoped>
.tag-container {
  max-width: var(--container-width);
  margin: 0 auto;
}
</style>
