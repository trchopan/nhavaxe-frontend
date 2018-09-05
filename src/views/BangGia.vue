<template>
  <div class="container">
    <h1>Bảng Giá</h1>
    <section class="selection">
      <router-link tag="h2" to="nha" replace active-class="active-nha">
        Bất Động Sản
      </router-link>
      <span>|</span>
      <router-link tag="h2" to="xe" replace active-class="active-xe">
        Xe
      </router-link>
    </section>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
    <p class="note">
      * Thông tin trên mang tính chất tham khảo. Vui lòng liên hệ để biết thông tin mới nhất.
    </p>
  </div>
</template>

<script>
export default {
  name: "BangGia"
};
</script>

<style lang="scss" scoped>
.container {
  text-align: center;
  font-family: Play;
  max-width: var(--container-width);
  margin: auto;
}
h1 {
  font-size: 1.5rem;
}
span {
  display: inline;
  font-size: 1.5rem;
}
h2 {
  display: inline-block;
  position: relative;
  color: var(--text-faded-color);
  padding: 0.25rem;
  margin: 0 0.5rem 1rem;
  font-size: 1.5rem;
}
h2:hover::before {
  content: "";
  border: 1px solid;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
}
.active-nha {
  color: var(--secondary-color);
}
.active-xe {
  color: var(--primary-color);
}
.note {
  margin-top: 1rem;
  font-size: 0.8rem;
  color: var(--text-secondary-color);
}
</style>
