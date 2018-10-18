<template>
  <li class="sponsor-container">
    <a v-if="banner && banner.type === 'image'"
      target="_blank"
      :href="banner.id | parseRedirectBannerId">
      <div class="wrapper">
        <p class="sponsor-text">- Tham khảo -</p>
        <div class="sponsor-image"
          :style="'background-image: url(' + banner.contentLink + ');'">
        </div>
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
  grid-template-rows: 1fr auto;
}
.sponsor-text {
  text-align: center;
  line-height: 2.7rem;
  font-size: 0.8rem;
  color: var(--text-faded-color);
  align-self: end;
}
.sponsor-image {
  background-size: cover;
  background-position: 50%;
  padding-bottom: 75.31%;
}
</style>
