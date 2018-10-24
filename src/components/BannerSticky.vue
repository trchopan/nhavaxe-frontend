<template>
  <div v-if="banner" class="sticky">
    <a :href="banner.id | parseRedirectBannerId" target="_blank">
      <div :class="'sponsor-image ' + banner.area"
        :style="'background-image: url(' + banner.contentLink + ');'">
      </div>
    </a>
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
  top: 4.5rem;
}
.sponsor-image {
  width: 100%;
  background-size: cover;
  background-position: 50%;
  margin: 0.5rem auto;
  padding-bottom: 200%;
}
</style>
