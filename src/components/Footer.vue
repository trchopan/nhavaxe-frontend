<template>
  <footer class="footer-wrapper">
    <div class="footer-container">
      <a href="https://nhavaxe.vn" @click.prevent="navigate(null)" class="logo" :style="logoBackground"></a>
      <p class="licence"><b>Giấy phép số:</b> 48/GP-STTT</p>
      <p class="address"><b>Địa chỉ:</b> 155 Chu Văn An, P.26, Q.Bình Thạnh, TP.HCM</p>
      <p class="legal"><b>Đại diện pháp luật:</b> Phạm Trường Thọ</p>
      <p class="company"><b>Đơn vị chủ quản:</b> Công ty TNHH truyền thông H&amp;M</p>
      <p class="email"><b>Email:</b><a href="mailto:nhavaxe.media@gmail.com"> nhavaxe.media@gmail.com</a></p>
      <p class="phone"><b>Điện thoại:</b><a href="tel:0975370297"> 097 537 0297</a></p>
      <p class="copyright">&copy; 2018 Kênh Tin Tức Nhà và Xe</p>
    </div>
  </footer>
</template>

<script>
import { mapGetters } from "vuex";
import { themes } from "@/store/modules/layout.js";

export default {
  name: "Footer",
  computed: {
    ...mapGetters({
      theme: "layout/theme"
    }),
    logoBackground() {
      return this.theme === themes.light
        ? { "background-image": "url('/logo-2018-light.png')" }
        : { "background-image": "url('/logo-2018-dark.png')" };
    }
  },
  methods: {
    navigate(cat) {
      this.$store.dispatch("layout/scrollYTo", 0);
      this.$store.dispatch("layout/setHomeScrollY", 0);
      this.$store.dispatch("categories/selectCategory", cat);
      this.$store.dispatch("articles/flushArticles");
      this.$store.dispatch("articles/fetchCatArticles", cat ? cat.id : null);
      this.$router.push("/");
    }
  }
};
</script>

<style scoped lang="scss">
.footer-wrapper {
  background-color: var(--secondary-color-tint);
}
.footer-container {
  max-width: var(--container-width);
  margin: auto;
  display: grid;
  grid-template:
    "logo licence address"
    "logo legal company"
    "logo email phone"
    "logo copyright copyright" / auto 1fr 1.29fr;
  grid-gap: 0.2rem 1rem;
  padding: 1rem 3rem;
  white-space: nowrap;
  @media (max-width: 769px) {
    font-size: 0.8rem;
  }
  @media (max-width: 599px) {
    grid-template:
      "licence licence"
      "address address"
      "legal legal"
      "company company"
      "email logo"
      "phone logo"
      "copyright logo" / 1fr auto;
    padding: 1rem;
    white-space: inherit;
  }
  @media (max-width: 320px) {
    font-size: 0.7rem;
  }
}
.logo {
  grid-area: logo;
  align-self: center;
  margin: 0 1rem;
  width: 6.3rem;
  height: 3.4rem;
  background-size: 100%;
  transform: scale(1);
  transition: transform 150ms ease-in;
  @media (max-width: 769px) {
    margin: 0 0.5rem;
    width: 4.7rem;
    height: 2.6rem;
  }
}
.logo:hover {
  transform: scale(1.05);
}
.licence {
  grid-area: licence;
}
.address {
  grid-area: address;
}
.legal {
  grid-area: legal;
}
.company {
  grid-area: company;
}
.email {
  grid-area: email;
}
.phone {
  grid-area: phone;
}
.copyright {
  grid-area: copyright;
}
</style>
