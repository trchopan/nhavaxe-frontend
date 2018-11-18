<template>
  <div class="tag-container">
    <TagCloud />
    <form id="tagForm" @submit="onSubmit" method="get">
      <p>{{ query }}</p>
      <div class="tag-input">
        <input id="tagInput" type="text" v-model="tagInput" />
      </div>
      <button class="button">Tìm</button>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TagCloud from "@/components/TagCloud.vue";

export default {
  name: "Tag",
  components: {
    TagCloud
  },
  data: () => ({
    query: "",
    tagInput: ""
  }),
  computed: {
    ...mapGetters({ cloud: "tag/cloud" })
  },
  methods: {
    onSubmit(e) {
      // this.query += this.query.length ? "|" : "";
      // this.query += this.tagInput;
      this.$store.dispatch("tag/queryTags", this.tagInput);
      this.$router.replace({
        name: "tag-results",
        params: { id: this.tagInput }
      });
      this.tagInput = "";
      e.preventDefault();
    }
  },
  mounted() {
    if (this.cloud.length === 0) {
      this.$store.dispatch("tag/getCloudList");
    }
  },
  beforeRouteLeave(to, from, next) {
    this.$store.dispatch("tag/clearTagResult");
    next();
  }
};
</script>

<style lang="scss" scoped>
.tag-container {
  max-width: var(--container-width);
  margin: 0 auto;
}
#tagForm {
  text-align: center;
  margin: 1rem;
}
.tag-input {
  display: inline-block;
  position: relative;
  input {
    margin-right: 1rem;
    background: var(--background-color);
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    font: 600 1.1rem/1.2rem var(--title-font), sans-serif;
    color: var(--primary-color);
    padding: 1rem;
  }
  @media (max-width: 600px) {
    input {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
}
</style>
