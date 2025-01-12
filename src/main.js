import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css"; //需要注意的是，样式文件需要单独引入
import App from "./App.vue";
import router from "./router";
import store from "./store";
import api from "./js/request/request";
import i18n from "./js/i18n";
import utils from "./js/utils";
import "@/js/remote-js.js";
import htmlToPdf from "./js/htmlToPdf";
import moment from "moment";
import { Message } from "element-ui";

// 全局样式
import "./assets/common/variable.less";
import "./assets/common/iconfont/iconfont.css";

// markdown编辑器
import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";

// 全局组件
import FormLabelComp from "@/components/form-label";
import BackBar from "@/components/back-bar";
import ThumbBar from "@/components/thumb-bar";
import HelperText from "@/components/helper-text";
import OptionBar from "@/components/option-bar";
import PLink from "@/components/permission/link";
import PButton from "@/components/permission/btn";
import PDropdownItem from "@/components/permission/dropdown-item";

Vue.use(ElementUI);

// 组件注册
Vue.use(mavonEditor);
Vue.prototype.moment = moment;
Vue.filter("dateFormat", function (dateStr, pattern = "YYYY-MM-DD HH:mm") {
  if (!dateStr) {
    return dateStr;
  }
  return moment(dateStr).format(pattern);
});
Vue.filter("yearFormat", function (dateStr, pattern = "YYYY-MM-DD") {
  if (!dateStr) {
    return dateStr;
  }
  return moment(dateStr).format(pattern);
});
Vue.filter(
  "dateWholeFormat",
  function (dateStr, pattern = "YYYY-MM-DD HH:mm:ss") {
    if (!dateStr) {
      return dateStr;
    }
    return moment(dateStr).format(pattern);
  }
);
Vue.component("FormLabel", FormLabelComp);
Vue.component("BackBar", BackBar);
Vue.component("ThumbBar", ThumbBar);
Vue.component("HelperText", HelperText);
Vue.component("OptionBar", OptionBar);
Vue.component("PLink", PLink);
Vue.component("PButton", PButton);
Vue.component("PDropdownItem", PDropdownItem);

Vue.config.productionTip = false;

// api挂载
Vue.prototype.$api = api;
Vue.prototype.$utils = utils;
Vue.prototype.$htmlToPdf = htmlToPdf;

Vue.prototype.$message = function (msg) {
  return Message({
    message: msg,
    duration: 3000,
    customClass: "messageClass",
  });
};
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 3000,
    customClass: "messageClass",
  });
};
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 3000,
    customClass: "messageClass",
  });
};
Vue.prototype.$message.error = function (msg, duration) {
  return Message.error({
    message: msg,
    duration: duration === 0 ? 0 : 5000,
    showClose: true,
    customClass: "messageClass",
  });
};

Vue.directive("latex", function (el) {
  var reg1 = new RegExp("&nbsp;", "g");
  var reg2 = new RegExp("&amp;", "g");
  var reg3 = new RegExp("nbsp;", "g");
  var reg4 = new RegExp("amp;", "g");
  el.innerHTML = el.innerHTML.replace(reg1, "");
  el.innerHTML = el.innerHTML.replace(reg2, "&");
  el.innerHTML = el.innerHTML.replace(reg3, "");
  el.innerHTML = el.innerHTML.replace(reg4, "");
  window.renderMathInElement(el, {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    macros: {
      "\\ge": "\\geqslant",
      "\\le": "\\leqslant",
      "\\geq": "\\geqslant",
      "\\leq": "\\leqslant",
    },
    options: {
      skipHtmlTags: ["noscript", "style", "textarea", "pre", "code"],
      // 跳过mathjax处理的元素的类名，任何元素指定一个类 tex2jax_ignore 将被跳过，多个累=类名'class1|class2'
      ignoreHtmlClass: "tex2jax_ignore",
    },
    svg: {
      fontCache: "global",
    },
    throwOnError: false,
  });
});

utils.copyright();

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
}).$mount("#app");
