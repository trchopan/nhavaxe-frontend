<template>
  <div class="tag-container">
    <TagCloud
      :tagsList="cloud"
      @selected="cloudSelectedHandler($event)"
    />
    <form
      class="tagForm"
      @submit.prevent="onSubmit"
      method="get"
    >
      <div class="tag-input">
        <transition name="slide-up">
          <label
            v-show="tagInput.length > 0"
            for="tagInput"
          >Nhập tag</label>
        </transition>
        <input
          id="tagInput"
          @keyup="updateTagInput($event)"
          type="text"
          placeholder="Nhập tag"
        >
        <ul
          class="autocomplete"
          v-if="filteredTagInput && filteredTagInput.length > 0"
        >
          <li
            v-for="(tag, i) in filteredTagInput"
            :key="'auto-complete-' + i"
            :class="{ even: i % 2 === 0}"
            @click="tagClickHandler(tag)"
          >{{ tag }}</li>
        </ul>
      </div>
      <button
        class="button"
        type="submit"
      >Tìm</button>
    </form>
    <div
      v-if="querryArray && querryArray.length > 0"
      class="selected-tags__container"
    >
      <div
        v-for="(q, i) in querryArray"
        :key="'query-' + i"
        class="selected-tags__item"
      >
        {{ q }}
        <svg
          class="cross-icon"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          @click="removeQuery(i)"
        >
          <path
            d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"
          ></path>
          <path
            d="M0 0h24v24H0z"
            fill="none"
          ></path>
        </svg>
      </div>
    </div>
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
    queryArray: [],
    tagInput: ""
  }),
  computed: {
    ...mapGetters({
      cloud: "tag/cloud",
      list: "tag/list",
      loading: "tag/loading"
    }),
    filteredTagInput() {
      if (!this.tagInput.trim()) {
        return [];
      }
      let normInput = normText(this.tagInput);
      return this.list
        .filter(x => normText(x).indexOf(normInput) >= 0)
        .map(x => x.trim())
        .sort(
          (a, b) =>
            normText(a).indexOf(normInput) - normText(b).indexOf(normInput)
        );
    },
    querryArray() {
      if (!this.query) {
        return [];
      }
      return this.query.split("|");
    }
  },
  methods: {
    cloudSelectedHandler(tag) {
      this.appendTag(tag);
    },
    updateTagInput(e) {
      this.tagInput = e.target.value;
    },
    async tagClickHandler(tag) {
      this.appendTag(tag);
      this.tagInput = "";
    },
    async appendTag(tag) {
      this.query += this.query.length ? "|" : "";
      this.query += tag;
      this.queryArray.push(tag);
      await this.$store.dispatch("tag/queryTags", this.query);
      this.$router.replace({
        name: "tag-results",
        params: { id: this.query || "search" }
      });
      this.tagInput = "";
    },
    async removeQuery(index) {
      let q = this.query.split("|");
      q.splice(index, 1);
      this.queryArray = q;
      this.query = q.join("|");
      if (!this.query) {
        this.$store.dispatch("tag/clearTagResult");
      } else {
        await this.$store.dispatch("tag/queryTags", this.query);
      }
      this.$router.replace({
        name: "tag-results",
        params: { id: this.query || "search" }
      });
    },
    async onSubmit() {
      if (!this.filteredTagInput[0]) {
        return;
      }

      if (this.tagInput != this.filteredTagInput[0]) {
        this.tagInput = this.filteredTagInput[0];
        return;
      }

      await this.appendTag(this.filteredTagInput[0]);
    }
  },
  mounted() {
    this.$store.dispatch("tag/clearTagResult");
    this.query =
      this.$route.params.id !== "search" ? this.$route.params.id : "";
    if (this.query) {
      this.$store.dispatch("tag/queryTags", this.query);
    }
    if (this.list.length === 0) {
      this.$store.dispatch("tag/getTagList");
    }
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
  width: 15rem;
  font: var(--title-font__bold) 1.1rem/1.2rem var(--title-font), sans-serif;
  label {
    position: absolute;
    top: -0.6rem;
    font-size: 0.7rem;
    margin-left: 1rem;
    padding: 0 0.2rem;
    background-color: var(--background-color);
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
  ul.autocomplete {
    position: absolute;
    max-height: 15rem;
    overflow-y: scroll;
    overflow-x: hidden;
    white-space: nowrap;
    margin-right: 1rem;
    width: 100%;
    background: var(--background-color);
    box-shadow: 0 2px 2px 0 var(--box-shadow), 0 0 0 1px var(--box-shadow-faded);
    li {
      padding: 0.5rem;
      overflow-x: hidden;
      text-overflow: ellipsis;
    }
    .even {
      background: var(--secondary-color-tint);
    }
  }
  @media (max-width: 600px) {
    input {
      font-size: 0.9rem;
      padding: 0.8rem;
    }
  }
}
.selected-tags__container {
  color: var(--primary-color);
  display: flex;
  justify-content: center;
  .selected-tags__item {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
  }
  .cross-icon {
    fill: var(--secondary-color);
  }
}
</style>
