<template>
  <div>
    <!-- 商品分类导航三级导航栏 === 已经注册为全局组件 ==此处无需再次注册  -->
    <TypeNav></TypeNav>
    <!-- 轮播图及左边列表 组件-->
    <ListContainer></ListContainer>
    <!-- 今日推荐组件 -->
    <TodayRecommend></TodayRecommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <Like></Like>
    <!-- floor -->
    <Floor v-for="floor in floors" :key="floor.id" :floorList="floor"></Floor>
    <!-- 商标 -->
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer";
import TodayRecommend from "@/pages/Home/TodayRecommend";
import Rank from "@/pages/Home/Rank";
import Like from "@/pages/Home/Like";
import Floor from "@/pages/Home/Floor";
import Brand from "@/pages/Home/Brand";

import {mapState} from "vuex";
export default {
  name: "Home",
  components: { ListContainer, TodayRecommend, Rank, Like, Floor, Brand },
  mounted(){
    this.$store.dispatch("getFloorList");
    // 获取用户信息
    this.$store.dispatch("getUserInfo");
  },
  computed:{
    ...mapState({
      floors:(state)=>{
        return state.home.floors;
      }
    })
  },
};
</script>

<style></style>
