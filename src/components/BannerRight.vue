<template>
  <div>
    <a v-for="banner in bannerList.slice(0, maxBanner)"
      :key="banner.id"
      :href="banner.link"
      target="_blank">
      <div :class="'banner ' + banner.area"
        :style="'background-image: url(' + banner.contentLink + ');'">
      </div>
      <hr />
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
.banner {
  width: 100%;
  background-size: cover;
  background-position: 50%;
  margin: 0.5rem auto;
}
.big-right {
  height: 589px;
}
hr {
  border: 0;
  height: 1px;
  background: var(--secondary-color);
  margin-bottom: 0.5rem;
}
</style>
