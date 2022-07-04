import Vue from 'vue';
import App from './App.vue';
// 引入三级导航组件
import TypeNav from "@/components/TypeNav"
// 引入分页器组件
import Pagenation from "@/components/Pagenation/index.vue"
//将三级导航组件注册为全局组件 
Vue.component('TypeNav',TypeNav);
// 将分页器注册为全局组件
Vue.component('Pagenation',Pagenation);

// 引入路由
import router from "@/router";
// 引入vuex仓库
import store from '@/store/index';

//引入mockServer.js  ---> mock虚拟数据
import '@/mock/mockServer';
// 引入swiper样式
import 'swiper/css/swiper.css';

Vue.config.productionTip = false

// 统一接口文件api文件夹里面全部请求函数
import * as API from "@/api/http";

// 按需引入element ui组件
import {  MessageBox } from "element-ui";
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;

// 引入图片懒加载插件 和 图片
import VueLazyload from 'vue-lazyload';
import loadImage from "./assets/logo.png";
// 注册插件
Vue.use(VueLazyload,{
  loading:loadImage,
})

//引入表单校验插件
import "@/plugins/validate";

new Vue({
  render: h => h(App),
  // 注册路由
  // 注册路由信息:当这里书写router时，组件身上都拥有$route,$router属性
  router:router,
  // 注册仓库：组件实例的身上会多了一个属性---》$store属性
  store:store,
  // 配置全局事件总线
  beforeCreate(){
    Vue.prototype.$bus = this;
    Vue.prototype.$api = API;
  }
}).$mount('#app')
