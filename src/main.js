import Vue from "vue"
import App from "./App.vue"
import ElementUI from "element-ui"
import "element-ui/lib/theme-chalk/index.css"
import cc from "./utils/cc"

Vue.config.productionTip = false
Vue.use(ElementUI)

Object.assign(Vue.prototype, {
  cc,
})

let res = new Vue({
  render: (h) => h(App),
}).$mount("#app")
console.log(
  "%c [ res ]-15",
  "font-size:13px; background:#3d0089; color:#8144cd;",
  res
)
