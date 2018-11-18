<template>
  <div class="container">
    <ul class="cloud">
      <router-link v-for="o in order"
        :to="cloud[o] ? '/tag/' + cloud[o].norm : '/'"
        :key="'tag-' + o"
        :class="['c' + o]"
        tag="li"
        @click.native="selectTag(cloud[o])">
        {{ cloud[o] ? cloud[o].text : "" }}
      </router-link>
    </ul> 
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "TagCloud",
  data: () => ({
    order: [
      14,
      13,
      12,
      11,
      10,
      9,
      8,
      7,
      6,
      3,
      1,
      0,
      2,
      4,
      5,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ]
  }),
  computed: {
    ...mapGetters({ cloud: "tag/cloud" })
  },
  methods: {
    selectTag(tag) {
      this.$store.dispatch("tag/queryTags", tag.norm);
      this.$router.replace({
        name: "tag-results",
        params: { id: tag.norm }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 1.5rem;
}
.cloud {
  margin: auto;
  color: var(--secondary-color);
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  li {
    cursor: pointer;
    padding: 0.5em;
    white-space: nowrap;
    transform: scale(1);
    transition: transform 200ms ease-in;
  }
  li:hover {
    transform: scale(1.5);
  }
  .c0 {
    font-size: 1.4rem;
  }
  .c1 {
    font-size: 1.3rem;
  }
  .c2 {
    font-size: 1.2rem;
  }
  .c3 {
    font-size: 1.1rem;
  }
  .c4 {
    font-size: 1rem;
  }
  .c5 {
    font-size: 1rem;
  }
  .c6 {
    font-size: 0.9rem;
  }
  .c7 {
    font-size: 0.9rem;
  }
  .c8 {
    font-size: 0.8rem;
  }
  .c9 {
    font-size: 0.8rem;
  }
  .c10 {
    font-size: 0.7rem;
  }
  .c11 {
    font-size: 0.7rem;
  }
  .c12,
  .c13,
  .c14,
  .c15,
  .c16,
  .c17,
  .c18,
  .c19,
  .c20,
  .c21,
  .c22,
  .c23 {
    font-size: 0.6rem;
  }
}
</style>
