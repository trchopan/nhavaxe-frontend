<template>
  <a v-if="banner"
    target="_blank"
    class="banner-top"
    :href="banner.id | parseRedirectBannerId">
    <div class="container">
      <div class="sponsor-image"
        :style="'background-image: url(' + banner.contentLink + ');'">
      </div>
    </div>
  </a>
</template>

<script>
export default {
  name: "BannerTop",
  props: {
    banner: Object
  }
};
</script>

<style lang="scss" scoped>
.container {
  margin: auto;
  max-width: var(--container-width);
}
.sponsor-image {
  padding-bottom: 25.77%;
  background-size: cover;
  background-position: 50%;
  margin: 0 auto 1rem;
}
</style>
