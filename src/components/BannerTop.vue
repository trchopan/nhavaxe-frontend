<template>
  <a v-if="banner"
    target="_blank"
    :href="banner.link">
    <div class="sponsor-image"
      :style="'background-image: url(' + banner.contentLink + ');'">
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
.sponsor-image {
  width: 100%;
  padding-bottom: 25.77%;
  background-size: cover;
  background-position: 50%;
  margin: 0 auto 1rem;
}
</style>
