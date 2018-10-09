<template>
  <li>
    <p class="sponsor-text">- Tham khảo -</p>
    <div v-if="banner && banner.type === 'youtube'" class="sponsor-youtube-container">
      <div class="youtube">
        <iframe
          :src="banner.contentLink | parseYoutubeLink"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
      </div>
    </div>
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
.sponsor-youtube-container {
  max-width: 560px;
  margin: 0 -1rem -1rem;
}
.youtube {
  position: relative;
  height: 200px;
}
.youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
