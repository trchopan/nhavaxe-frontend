<template>
  <div>
    <a
      v-for="banner in bannerList.slice(0, maxBanner)"
      :key="banner.id"
      :href="banner.id | parseRedirectBannerId"
      target="_blank"
    >
      <div
        :class="'sponsor-image ' + banner.area"
        :style="'background-image: url(' + banner.contentLink + ');'"
      ></div>
    </a>
  </div>
</template>

<script>
export default {
  name: "BannerRight",
  props: {
    bannerList: Array
  },
  data() {
    return {
      maxBanner: 3
    };
  }
};
</script>

<style lang="scss" scoped>
.sponsor-image {
  width: 100%;
  background-size: cover;
  background-position: 50%;
  padding-bottom: 200%;
  margin: 1rem auto;
}
.sponsor-image:first-child {
  margin-top: 0;
}
</style>
