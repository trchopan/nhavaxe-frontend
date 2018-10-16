<template>
  <li>
    <div class="preview">
      <div class="title-preview">
        <p class="title">{{ title }}</p>
        <hr />
      </div>
      <div class="subs-preview">
        <p v-for="(sub, i) in subs"
          :key="'specials-sub-' + i"
          class="sub-item">
          <router-link :to="'/article/' + sub.id">
            {{ sub.title }}
          </router-link>
        </p>
      </div>
      <div class="mains-preview">
        <div v-for="(main, i) in mains"
          :key="'specials-main-' + i">
          <router-link :to="'/article/' + main.id">
            <div class="preview-main-cover"
              :style="'background-image: url(' + main.coverImg + ');'"></div>
            <p class="mains-title">
                {{ main.title | trimText(100) }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </li>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "ArticlesSpecials",
  computed: mapGetters({
    title: "specials/title",
    mains: "specials/mains",
    subs: "specials/subs"
  })
};
</script>

<style lang="scss" scoped>
.preview {
  grid-column: span 2;
  margin: 0.5rem auto;
  max-width: 626px;
  background: #323232;
  display: grid;
  grid-template-columns: 1.15fr 1fr;
  grid-template-areas:
    "title title"
    "subs mains";
  .title-preview {
    grid-area: title;
    margin: 0;
    padding: 0.5rem;
    font-weight: var(--text-font__bold);
    .title {
      margin: 0.5rem 0;
      font-size: 1.2rem;
      color: white;
    }
  }
  .subs-preview {
    grid-area: subs;
    padding: 0.5rem;
    .sub-item {
      position: relative;
      padding-left: 1rem;
      margin-bottom: 0.7rem;
      a {
        font-family: var(--title-font);
        text-align: justify;
        color: white;
      }
    }
    .sub-item::before {
      position: absolute;
      top: 0;
      left: 0;
      content: ">";
      color: var(--primary-color);
      font-family: var(--title-font);
    }
  }
  .mains-preview {
    grid-area: mains;
    padding: 0.5rem;
    div {
      position: relative;
      padding-bottom: 4%;
      margin-bottom: 1rem;
    }
    .preview-main-cover {
      background-size: cover;
      background-position: 5%;
      padding-bottom: 56%;
    }
    .mains-title {
      font-family: var(--title-font);
      text-align: justify;
      position: absolute;
      left: 5%;
      bottom: -2%;
      right: 5%;
      background: white;
      padding: 8px;
      border-radius: 5px;
    }
  }
  hr {
    border: 0;
    height: 1px;
    background: var(--secondary-color);
    margin-bottom: 0.5rem;
  }
}
@media (max-width: 599px) {
  .preview {
    grid-template-columns: 1fr;
    grid-template-areas:
      "title"
      "mains"
      "subs";
  }
}
</style>
