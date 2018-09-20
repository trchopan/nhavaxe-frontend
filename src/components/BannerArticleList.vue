<template>
  <li v-if="banner">
    <p class="sponsor-text">- Tài trợ -</p>
    <a target="_blank"
      :href="banner.link">
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
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.sponsor-image {
  background-size: cover;
  background-position: 50%;
  width: 100%;
  padding-bottom: 20%;
}
.sponsor-text {
  grid-column: span 2;
  text-align: center;
  align-self: center;
  color: var(--text-faded-color);
}
@media (max-width: 599px) {
  .sponsor-text {
    font-size: 0.5rem;
  }
}
</style>
