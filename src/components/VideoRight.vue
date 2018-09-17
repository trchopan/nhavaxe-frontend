<template>
  <div class="container">
    <h4>Video</h4>
    <hr />
    <div v-for="(video, i) in youtubeBanners" class="youtube-container"
      :key="'youtube-' + i">
      <iframe
        :src="video.contentLink | parseYoutubeLink"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "VideoRight",
  computed: mapGetters({
    youtubeBanners: "banner/youtubeBanners"
  })
};
</script>

<style lang="scss" scoped>
.container {
  grid-area: videoRight;
  background: var(--primary-background-tint);
  padding: 5px 10px 2px;
  margin-bottom: 0.5rem;
  h4 {
    font-family: var(--title-font);
    font-size: 1.5rem;
    padding-bottom: 0.5rem;
  }
  hr {
    border: 0;
    height: 1px;
    background: var(--secondary-color);
    margin-bottom: 1rem;
  }
  .youtube-container {
    position: relative;
    width: 100%;
    height: 238px;
    margin-bottom: 7px;
  }
}
</style>
