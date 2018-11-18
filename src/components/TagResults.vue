<template>
  <div>
    <RelatedList :list="tagResult" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import RelatedList from "@/components/RelatedList.vue";

export default {
  name: "TagResults",
  components: {
    RelatedList
  },
  computed: {
    ...mapGetters({
      tagResult: "tag/tagResult"
    })
  }
};
</script>
