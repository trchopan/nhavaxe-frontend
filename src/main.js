import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import filters from "./filters.js";

console.log("version", process.env.VUE_APP_VERSION);
console.log("author", process.env.VUE_APP_AUTHOR);
console.log("enviroment", process.env.VUE_APP_INITDATA);

Vue.config.productionTip = false;
Vue.config.devtools = false;
Vue.filter("parsePublishAt", filters.parsePublishAt);
Vue.filter("trimText", filters.trimText);
Vue.filter("date", filters.date);
Vue.filter("parseNumber", filters.parseNumber);
Vue.filter("parseMonthYear", filters.parseMonthYear);
Vue.filter("parseYoutubeLink", filters.parseYoutubeLink);
Vue.filter("randomBanner", filters.randomBanner);
Vue.filter("parseRedirectBannerId", filters.parseRedirectBannerId);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
