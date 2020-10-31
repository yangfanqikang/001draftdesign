import Vue from "vue";

// 自动加载目录下的 .vue 结尾的文件
const componentsContext = require.context("./draft", true, /\.vue$/);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  // 兼容 import export 和 require module.export 两种规范
  const ctrl = componentConfig.default || componentConfig;
  Vue.component(ctrl.name, ctrl);
});
