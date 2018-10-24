<template>
  <li class="sponsor-container">
    <a v-if="banner && banner.type === 'image'"
      target="_blank"
      :href="banner.id | parseRedirectBannerId">
      <div class="wrapper">
        <div class="sponsor-image"
          :style="'background-image: url(' + banner.contentLink + ');'">
        </div>
        <p class="sponsor-text">- Tham khảo -</p>
      </div>
    </a>
  </li>
</template>

<script>
export default {
  name: "BannerRelated",
  props: {
    banner: Object
  }
};
</script>

<style lang="scss" scoped>
.sponsor-container {
  box-shadow: unset;
}
.wrapper {
  height: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
}
.sponsor-text {
  text-align: center;
  line-height: 2.7rem;
  font-size: 0.8rem;
  color: var(--text-faded-color);
  align-self: start;
}
.sponsor-image {
  background-size: cover;
  background-position: 50%;
  padding-bottom: 83.33%;
}
</style>
