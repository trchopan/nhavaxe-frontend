<template>
  <a v-if="randomBanner" target="_blank"
    :href="randomBanner.link">
    <div class="banner-top"
      :style="'background-image: url(' + randomBanner.contentLink + ');'">
    </div>
  </a>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "BannerTop",
  computed: {
    ...mapGetters({
      longTopBanners: "banner/longTopBanners"
    }),
    randomBanner() {
      if (!this.longTopBanners) return null;
      const bannerList = this.longTopBanners;
      const randomIndex = Math.floor(Math.random() * bannerList.length);
      return bannerList[randomIndex];
    }
  }
};
</script>

<style lang="scss" scoped>
.banner-top {
  width: 100%;
  padding-bottom: 25.77%;
  background-size: cover;
  background-position: 50%;
  margin: 0 auto 1rem;
}
</style>
