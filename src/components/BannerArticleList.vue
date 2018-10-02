<template>
  <li v-if="banner">
    <a target="_blank"
      :href="banner.id | parseRedirectBannerId">
      <p class="sponsor-text">- Tham khảo -</p>
      <div class="sponsor-image"
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
}
.sponsor-image {
  width: 100%;
  padding-bottom: 20%;
  background-size: cover;
  background-position: 50%;
  cursor: pointer;
}
.sponsor-text {
  text-align: center;
  color: var(--text-faded-color);
}
@media (max-width: 599px) {
  .sponsor-text {
    font-size: 0.63rem;
  }
}
</style>
