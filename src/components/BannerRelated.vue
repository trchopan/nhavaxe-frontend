<template>
  <li>
    <p class="sponsor-text">- Tham khảo -</p>
    <a v-if="banner && banner.type === 'image'"
      target="_blank"
      :href="banner.id | parseRedirectBannerId">
      <div class="sponsor-image"
        :style="'background-image: url(' + banner.contentLink + ');'">
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
.sponsor-text {
  text-align: center;
  line-height: 2.7rem;
  color: var(--text-faded-color);
}
.sponsor-image {
  height: 200px;
  background-size: cover;
  background-position: 50%;
  margin: 0 -1rem -1rem;
}
</style>
