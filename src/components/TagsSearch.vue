<template>
  <div>
    <pre>{{ tagResult }}</pre>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TagsSearch",
  computed: {
    ...mapGetters({
      tagResult: "tag/tagResult"
    })
  }
};
</script>
