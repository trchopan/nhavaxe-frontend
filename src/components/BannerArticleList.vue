<template>
  <li v-if="banner">
    <a target="_blank"
      :href="banner.link">
      <div class="banner-image"
      :style="'background-image: url(' + banner.contentLink + ');'">
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "BannerArticleList",
  props: {
    banner: Object
  }
};
</script>

<style lang="scss" scoped>
a {
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.banner-image {
  background-size: cover;
  background-position: 50%;
  width: 100%;
  padding-bottom: 20%;
}
</style>
