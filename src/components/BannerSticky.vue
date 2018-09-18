<template>
  <div v-if="banner" class="sticky">
    <div :class="'banner ' + banner.area"
      :style="'background-image: url(' + banner.contentLink + ');'">
    </div>
  </div>
</template>

<script>
export default {
  name: "BannerSticky",
  props: {
    banner: Object
  }
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 4rem;
}
.banner {
  width: 100%;
  background-size: cover;
  background-position: 50%;
  margin: 0.5rem auto;
}
.big-sticky {
  height: 589px;
}
</style>
