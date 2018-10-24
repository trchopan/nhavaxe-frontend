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
      <img v-if="!startPlay && selectedVideo"
        :src="selectedVideo.coverImg"
        alt="thumbnail"
        class="first-thumbnail"
        @click="startPlay = true"/>
      <iframe
        v-if="startPlay && selectedVideo"
        :src="selectedVideo.link | parseYoutubeLink"
        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen></iframe>
    </section>
    <section class="videos-list">
      <div v-for="(video, i) in videos"
        :key="'youtube-' + i"
        @click="select(video)"
        class="video-item">
        <div :style="'background-image: url(' + video.coverImg + ');'"
          class="video-thumbnail"></div>
        <p class="video-title">{{ video.title }}</p>
      </div>
    </section>
    <div></div>
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
  display: grid;
  grid-template:
    "head head"
    "youtube list" / 1fr 1fr;
  .head {
    grid-area: head;
    h4 {
      font-family: var(--title-font);
      font-size: 1.5rem;
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
    grid-area: youtube;
    position: relative;
    width: 100%;
    padding-bottom: 56.25%;
    .first-thumbnail {
      position: absolute;
      background-size: cover;
      width: 100%;
      height: 100%;
      cursor: pointer;
    }
  }
  .videos-list {
    grid-area: list;
    overflow-y: scroll;
    max-height: 240px;
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
  }
}

@media (max-width: 599px) {
  .container {
    grid-template: "head" "youtube" "list" / 1fr;
    .videos-list {
      margin-top: 0.2rem;
      max-height: 15rem;
      .video-item {
        margin: 0;
        padding: 0.2rem 0;
        .video-title {
          margin: 0 0 0 0.5rem;
          font-size: 0.9rem;
          text-align: left;
        }
      }
    }
  }
}
</style>
