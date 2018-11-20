<template>
  <div class="tag-container">
    <TagCloud :filteredTaglist="filteredTagInput" />
    <form class="tagForm" @submit="onSubmit" method="get">
      <p>{{ query }}</p>
      <div class="tag-input">
        <transition name="slide-up">
          <label v-show="tagInput.length > 0"
            for="tagInput">
            Nhập tag
          </label>
        </transition>
        <input id="tagInput" v-model="tagInput" type="text" placeholder="Nhập tag" />
      </div>
    </form>
    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import TagCloud from "@/components/TagCloud.vue";
import { normText } from "@/helpers.js";

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
    ...mapGetters({ cloud: "tag/cloud", list: "tag/list" }),
    filteredTagInput() {
      if (!this.tagInput) {
        return [];
      }
      return this.list
        .filter(x => normText(x).indexOf(normText(this.tagInput)) >= 0)
        .slice(0, 16);
    }
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
    if (this.list.length === 0) {
      this.$store.dispatch("tag/getTagList");
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
.tagForm {
  text-align: center;
  margin: 1rem;
}
.tag-input {
  display: inline-block;
  position: relative;
  font: 600 1.1rem/1.2rem var(--title-font), sans-serif;
  label {
    position: absolute;
    top: -0.6rem;
    font-size: 0.7rem;
    margin-left: 1rem;
    padding: 0 0.2rem;
    background-color: var(--background-color);
    // transform: translateY(0);
    // transition: transform 200ms ease-in;
  }
  input {
    margin-right: 1rem;
    background: var(--background-color);
    border: 1px solid var(--secondary-color);
    border-radius: 5px;
    padding: 1rem;
    color: var(--primary-color);
  }
  input::placeholder {
    color: var(--text-secondary-color);
  }
  @media (max-width: 600px) {
    input {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
}
</style>
