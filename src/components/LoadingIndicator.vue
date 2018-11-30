<template>
  <div v-if="loading"
    class="lds-ripple float-bottom">
    <div></div>
    <div></div>
  </div>
</template>

<script>
export default {
  name: "LoadingIndicator",
  computed: {
    loading() {
      return (
        this.$store.state.articles.loading ||
        this.$store.state.categories.loading ||
        this.$store.state.tag.loading
      );
    }
  }
};
</script>

<style scoped lang="scss">
.lds-ripple {
  display: inline-block;
  position: relative;
  width: 64px;
  height: 64px;
}
.lds-ripple div {
  position: absolute;
  border: 4px solid var(--secondary-color);
  opacity: 1;
  border-radius: 50%;
  animation: lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite;
}
.lds-ripple div:nth-child(2) {
  animation-delay: -0.5s;
}
@keyframes lds-ripple {
  0% {
    top: 28px;
    left: 28px;
    width: 0;
    height: 0;
    opacity: 1;
  }
  100% {
    top: -1px;
    left: -1px;
    width: 58px;
    height: 58px;
    opacity: 0;
  }
}
.float-bottom {
  position: fixed;
  left: calc(50vw - 32px);
  bottom: 2rem;
  z-index: 2;
}
</style>
