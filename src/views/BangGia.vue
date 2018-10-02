<template>
  <div class="container">
    <BannerTop :banner="randomBanner(longTopBanners)" />
    <h1>Bảng Giá</h1>
    <section class="selection">
      <router-link tag="h2" to="nha" replace active-class="active-nha">
        Bất Động Sản
      </router-link>
      <span>|</span>
      <router-link tag="h2" to="xe" replace active-class="active-xe">
        Xe
      </router-link>
    </section>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <p v-show="$route.name === 'nha'" class="note">
      * Giá CĐT bán là giá mở bán đợt đầu tiên của dự án
    </p>
    <p v-show="$route.name === 'nha'" class="note">
      * Giá Thị trường là giá bán trong thời điểm hiện tại
    </p>
    <p class="note">
      * Thông tin trên mang tính chất tham khảo. Vui lòng liên hệ để biết thông tin mới nhất.
    </p>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { common } from "@/mixins.js";
import BannerTop from "@/components/BannerTop.vue";

export default {
  name: "BangGia",
  mixins: [common],
  components: {
    BannerTop
  },
  computed: mapGetters({
    longTopBanners: "banner/longTopBanners"
  })
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  font-family: Play;
  max-width: var(--container-width);
  margin: auto;
}
h1 {
  font: 1.5rem var(--title-font);
}
span {
  display: inline;
  font-size: 1.5rem;
}
h2 {
  display: inline-block;
  position: relative;
  color: var(--text-faded-color);
  padding: 0.25rem;
  margin: 0 0.5rem 1rem;
  font: 1.5rem var(--title-font);
}
h2:hover::before {
  content: "";
  border: 1px solid;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.active-nha {
  color: var(--secondary-color);
}
.active-xe {
  color: var(--primary-color);
}
.note {
  margin-top: 0.5rem;
  font: 0.8rem var(--default-font);
  color: var(--text-secondary-color);
}
</style>
