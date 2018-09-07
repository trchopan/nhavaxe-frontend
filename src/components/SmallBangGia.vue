<template>
  <div>
    <h3>Bảng Giá</h3>
    <h2 :class="{ active: selected === 'nha' }"
      @click="selected = 'nha'">
      BĐS
    </h2>
    <span>|</span>
    <h2 :class="{ active: selected === 'xe' }"
      @click="selected = 'xe'">
      Xe
    </h2>
    <router-link :to="'/bang-gia/' + selected">
      <transition name="fade" mode="out-in">
        <component :is="selectedComponent" :list="list"></component>
      </transition>
    </router-link>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SmallTableNha from "@/components/SmallTableNha.vue";
import SmallTableXe from "@/components/SmallTableXe.vue";

export default {
  name: "SmallBangGia",
  components: {
    SmallTableNha,
    SmallTableXe
  },
  data() {
    return {
      selected: "nha"
    };
  },
  computed: {
    ...mapGetters({
      list: "bangGia/smallList"
    }),
    selectedComponent() {
      return this.selected === "nha" ? "SmallTableNha" : "SmallTableXe";
    }
  }
};
</script>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-to,
.fade-leave {
  opacity: 1;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.container {
  display: relative;
}
.container table {
  display: absolute;
  top: 0;
  left: 0;
}
h2,
h3 {
  display: inline-block;
  position: relative;
  font: 1.2rem var(--title-font);
  padding: 0.25rem;
  margin: 0 0.25rem;
  text-align: center;
  color: #c3c3c3;
  cursor: pointer;
}
h3 {
  font-size: 1rem;
  color: var(--primary-color);
}
h2:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px;
}
.active {
  color: var(--secondary-color);
}
</style>
