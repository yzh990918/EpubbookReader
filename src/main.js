import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/styles/icon.css";
import "./assets/styles/global.styl";
import { Icon, Toast } from "vant";
Vue.use(Icon);
Vue.use(Toast);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
