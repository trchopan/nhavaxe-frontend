<template>
  <div class="container">
      <p v-if="cloud.length === 0 && filteredTaglist.length === 0"
        class="loading">
        Đang tải dữ liệu...
      </p>
      <ul v-if="cloud.length > 0 && filteredTaglist.length === 0"
        class="cloud">
        <router-link v-for="o in order"
          :to="cloud[o] ? '/tag/' + cloud[o].norm : '/'"
          :key="'tag-' + o"
          :class="['c' + o]"
          tag="li"
          @click.native="selectTag(cloud[o].norm)">
          {{ cloud[o] ? cloud[o].text : "" }}
        </router-link>
      </ul>
      <transition-group v-if="filteredTaglist.length > 0"
        name="list"
        tag="ul"
        class="cloud">
        <router-link v-for="(tag, i) in filteredTaglist"
          :to="'/tag/' + filteredTaglistNorm[i]"
          :key="'tag-key-' + tag"
          tag="li"
          :class="['list-item', 'c' + i]"
          @click.native="selectTag(tag)">
          {{ tag }}
        </router-link>
      </transition-group>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { normText } from "@/helpers.js";

export default {
  name: "TagCloud",
  props: {
    filteredTaglist: Array
  },
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
    ...mapGetters({ cloud: "tag/cloud" }),
    filteredTaglistNorm() {
      return this.filteredTaglist.map(x => normText(x));
    }
  },
  methods: {
    selectTag(tag) {
      this.$store.dispatch("tag/queryTags", tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin-bottom: 1.5rem;
}
.loading {
  text-align: center;
  color: var(--secondary-color);
}
.cloud {
  margin: auto;
  color: var(--secondary-color);
  max-width: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  height: 9rem;
  li {
    cursor: pointer;
    padding: 0.5em;
    white-space: nowrap;
    transform: scale(1);
    transition: transform 200ms ease-in;
  }
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active,
  .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to /* .list-leave-active below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
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
