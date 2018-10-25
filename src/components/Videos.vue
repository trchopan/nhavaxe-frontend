<template>
  <div class="container">
    <section class="head">
      <h4>
        <a href="https://www.youtube.com/channel/UCzv3YTAJTG7hCNHEHl7qeqg/videos"
          target="_blank">
          Kênh Videos Tin Tức
        </a>
      </h4>
      <hr />
    </section>
    <section class="youtube-container">
      <div class="youtube-view">
        <div v-if="!startPlay && selectedVideo"
          :style="'background-image: url(' + selectedVideo.coverImg + ')'"
          alt="thumbnail"
          class="first-thumbnail"
          @click="startPlay = true" />
        <iframe
          v-if="startPlay && selectedVideo"
          :src="selectedVideo.link | parseYoutubeLink"
          style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
          frameborder="0"
          allow="autoplay; encrypted-media"
          allowfullscreen></iframe>
      </div>
      <div class="videos-list">
        <ul>
          <li v-for="(video, i) in videos"
            :key="'youtube-' + i"
            @click="select(video)"
            class="video-item">
            <div :style="'background-image: url(' + video.coverImg + ');'"
              class="video-thumbnail"></div>
            <p class="video-title">{{ video.title }}</p>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Videos",
  data() {
    return {
      startPlay: false
    };
  },
  computed: mapGetters({
    videos: "specials/videos",
    selectedVideo: "specials/selectedVideo"
  }),
  methods: {
    select(video) {
      this.startPlay = false;
      setTimeout(() => (this.startPlay = true), 1200);
      this.$store.dispatch("specials/selectVideo", video);
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  position: relative;
  background: var(--primary-background-tint);
  color: white;
  padding: 1rem;
  margin: 0.5rem auto 0;
  .head {
    h4 {
      font: var(--title-font__bold) 1.2rem var(--title-font);
      @media (max-width: 599px) {
        font-size: 1.1rem;
      }
      padding-bottom: 0.5rem;
      a {
        color: white;
      }
      a:hover {
        color: var(--secondary-color);
      }
    }
    hr {
      border: 0;
      height: 1px;
      background: var(--secondary-color);
      margin-bottom: 1rem;
    }
  }
  .youtube-container {
    height: 16rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    @media (max-width: 599px) {
      height: 25rem;
      grid-template-columns: 1fr;
    }
    .youtube-view {
      position: relative;
      width: 100%;
      padding-bottom: 56.25%;
      .first-thumbnail {
        position: absolute;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        cursor: pointer;
      }
    }
    .videos-list {
      overflow-y: scroll;
      .video-item {
        margin: 0 1rem 0.5rem;
        padding: 0.5rem 0.5rem;
        cursor: pointer;
        display: grid;
        grid-template-columns: auto 1fr;
        align-items: center;
        .video-thumbnail {
          width: 5.2rem;
          height: 3rem;
          background-size: cover;
          background-position: 50%;
        }
        .video-title {
          margin: 0.2rem 0 0 0.5rem;
          text-align: justify;
        }
      }
      .video-item:hover {
        background: var(--secondary-color-tint);
      }
      @media (max-width: 599px) {
        font-size: 0.9rem;
        .video-item {
          margin: 0;
          padding: 0.5rem 0;
        }
      }
    }
  }
}
</style>
