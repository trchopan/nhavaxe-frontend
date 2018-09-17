<template>
  <div v-if="randomBanner" class="container big-right">
    <a target="_blank"
      :href="randomBanner.link">
      <div :class="'banner ' + randomBanner.area"
        :style="'background-image: url(' + randomBanner.contentLink + ');'">
      </div>
    </a>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BannerRight",
  computed: {
    ...mapGetters({
      rightBanners: "banner/rightBanners"
    }),
    randomBanner() {
      if (!this.rightBanners) return null;
      const bannerList = this.rightBanners;
      const randomIndex = Math.floor(Math.random() * bannerList.length);
      return bannerList[randomIndex];
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  grid-area: bannerRight;
  position: sticky;
  top: 4rem;
  .banner {
    width: 100%;
    background-size: cover;
    background-position: 50%;
  }
  .big-right {
    height: 589px;
  }
}
</style>
