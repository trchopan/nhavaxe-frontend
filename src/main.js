import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./filters.js";

console.log(`version %c${process.env.VUE_APP_VERSION}`, "color: #159cd8");
console.log(`author %c${process.env.VUE_APP_AUTHOR}`, "color: #ed1d24");
console.log(`enviroment "${process.env.NODE_ENV}"`);

Vue.config.productionTip = false;
Vue.config.devtools = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
