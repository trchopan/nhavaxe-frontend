<template>
  <li>
    <div v-if="banner && banner.type === 'youtube'" class="youtube-container">
      <div class="youtube">
        <iframe
          :src="banner.contentLink | parseYoutubeLink"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
      </div>
    </div>
    <a v-if="banner.type === 'image'"
      target="_blank"
      :href="banner.link">
      <div class="related-article__img"
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
.related-article__img {
  padding-bottom: 76%;
  background-size: cover;
  background-position: 50%;
  margin: -1rem -1rem;
}
.youtube-container {
  max-width: 560px;
  margin: -1rem;
}
.youtube {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  padding-top: 25px;
  height: 0;
}
.youtube iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
