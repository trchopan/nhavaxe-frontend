<template>
  <div class="container">
    <BannerTop :banner="bannerTop" />
    <h1>Bảng Giá</h1>
    <section class="selection">
      <router-link tag="h2" to="/bang-gia/nha" replace active-class="banggia-active">
        Bất Động Sản
      </router-link>
      <span class="vertical-bar">|</span>
      <router-link tag="h2" to="/bang-gia/xe" replace active-class="banggia-active">
        Xe
      </router-link>
    </section>
    <section>
      <button class="button mb-1" :class="{ 'expand-button': expand }"
        @click="switchExpand()">
        Hiển thị {{ expand ? "ngắn gọn" : " đầy đủ"}}
      </button>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </section>
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
import { randomBanner } from "@/helpers";
import BannerTop from "@/components/BannerTop.vue";

export default {
  name: "BangGia",
  components: {
    BannerTop
  },
  mounted() {
    if (window.innerWidth < 600) {
      this.$store.dispatch("bangGia/setExpand", false);
    }
  },
  computed: {
    ...mapGetters({
      longTopBanners: "banner/longTopBanners",
      expand: "bangGia/expand"
    }),
    bannerTop() {
      return randomBanner(this.longTopBanners);
    }
  },
  methods: {
    switchExpand() {
      if (this.expand) {
        this.$store.dispatch("bangGia/setExpand", false);
      } else {
        this.$store.dispatch("bangGia/setExpand", true);
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  margin: auto;
}
h1 {
  font: 1.5rem var(--title-font);
}
.vertical-bar {
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
.banggia-active {
  color: var(--secondary-color);
}
.expand-button {
  display: none;
}
.note {
  margin: 0.3rem;
  font: 0.8rem var(--default-font);
  color: var(--text-secondary-color);
}
@media (max-width: 600px) {
  .expand-button {
    display: block;
  }
  .note {
    font-size: 0.7rem;
  }
}
</style>
