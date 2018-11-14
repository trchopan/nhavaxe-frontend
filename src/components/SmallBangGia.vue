<template>
  <div class="container">
    <router-link :to="'bang-gia/' + selected"
      tag="h2"
      class="bang-gia-title">
      Bảng Giá
    </router-link>
    <h2 class="bang-gia-selection"
      :class="{ active: selected === 'nha' }"
      @click="selected = 'nha'">
      BĐS
    </h2>
    <span>|</span>
    <h2 class="bang-gia-selection"
      :class="{ active: selected === 'xe' }"
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
      selected: Math.random() > 0.5 ? "nha" : "xe"
    };
  },
  computed: {
    ...mapGetters({
      list: "banggia/smallList"
    }),
    selectedComponent() {
      return this.selected === "nha" ? "SmallTableNha" : "SmallTableXe";
    }
  }
};
</script>

<style scoped lang="scss">
.container {
  grid-area: bangGia;
  padding: 0 0.2rem;
}
.container table {
  width: 100%;
}
h2 {
  display: inline-block;
  position: relative;
  font: 600 1.1rem var(--title-font);
  padding: 0.25rem;
  margin: 0 0.25rem;
  text-align: center;
  cursor: pointer;
}
h2.bang-gia-title {
  color: var(--primary-color);
}
h2.bang-gia-selection {
  color: var(--text-faded-color);
}
h2.bang-gia-selection:hover::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  border: solid 1px;
}
h2.active {
  color: var(--secondary-color);
}
</style>
