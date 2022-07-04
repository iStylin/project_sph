<template>
  <div id="app">
    <!-- 头部组件 -->
    <Header></Header>

    <!-- 路由组件展示区  -->
    <router-view></router-view>

    <!-- 底部组件 -->
    <Footer v-show="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from "./components/Header/index.vue";
import Footer from "./components/Footer/index.vue";
export default {
  name: "App",
  components: { Header, Footer },
  // 组件挂载完毕，就可以向服务器发请求，获取数据
  // 将发送请求发在app组件，可以优化性能，app组件只会挂载一次，此项目中数据无需多次请求，而其余组件间的切换会导致组件反复挂载与销毁
  //  如果将数据请求放入其他组件中就会导致，每一次组件切换都会发送请求，影响性能 
  mounted() {
    // 通知Vuex发请求，获取数据，存储于仓库中
    // 三级联动
    this.$store.dispatch("categoryList");
    // 大的轮播图
    this.$store.dispatch("bannerList");
  },
};
</script>

<style></style>
