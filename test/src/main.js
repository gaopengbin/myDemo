import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "lib-flexible";
import "sass-loader";
import VeeValidate from "vee-validate";
import MintUI from "mint-ui";
import "mint-ui/lib/style.css";
import ElementUI from "element-ui";
Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.$http = axios;

Vue.use(VeeValidate);
Vue.use(MintUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
