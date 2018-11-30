<template>
  <div class="container">
    <h2 class="cloud-title">Đang nóng</h2>
    <ul class="cloud">
      <li
        v-for="o in order"
        :to="tagsList[o] ? '/tag/' + tagsList[o].text : '/'"
        :key="'tag-' + o"
        :class="['c' + o]"
        @click="selectTag(tagsList[o].text)"
      >{{ tagsList[o] ? tagsList[o].text : "" }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "TagCloud",
  props: {
    tagsList: Array,
    height: String
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
  methods: {
    selectTag(tag) {
      this.$emit("selected", tag);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  max-width: 500px;
  position: relative;
  margin-bottom: 1rem;
}
.container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  height: 38%;
  width: 62%;
  border-top: solid 1px var(--primary-color);
  border-left: solid 1px var(--primary-color);
}
.cloud::before {
  content: "";
  position: absolute;
  right: 0;
  bottom: -0.5rem;
  width: 38%;
  height: 38%;
  border-bottom: solid 1px var(--primary-color);
  border-right: solid 1px var(--primary-color);
}
.loading {
  text-align: center;
  color: var(--secondary-color);
}
.cloud-title {
  color: var(--primary-color);
  font: var(--title-font__bold) 1.2rem/130% var(--title-font);
  padding: 0.2rem 0.5rem;
}
.cloud {
  margin: 0.5rem;
  padding: 0.2rem;
  color: var(--secondary-color);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  li {
    cursor: pointer;
    padding: 0.3em 0.7em;
    white-space: nowrap;
    transform: scale(1);
    transition: transform 200ms ease-in;
  }
  li:hover {
    transform: scale(1.3);
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
    font-size: 0.95rem;
  }
  .c7 {
    font-size: 0.9rem;
  }
  .c8 {
    font-size: 0.85rem;
  }
  .c9 {
    font-size: 0.8rem;
  }
  .c10 {
    font-size: 0.75rem;
  }
  .c11 {
    font-size: 0.75rem;
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
    font-size: 0.7rem;
  }
  .active {
    border: solid 1px var(--box-shadow);
  }
}
</style>
