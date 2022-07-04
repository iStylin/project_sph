import Mock from "mockjs";
// 把json数据格式引入【json数据格式没有对外暴露，但可以引入】
//  webpack默认对外暴露的：图片、json数据格式
import banners from './banners.json';
import floors from './floors.json';


//  mock数据：第一个参数是请求地址    第二个参数：请求数据
// 提供广告位轮播数据的接口
Mock.mock('/mock/banner',{
    code:200,
    data:banners
})

// 提供所有楼层数据的接口
Mock.mock('/mock/floor',{
    code:200,
    data:floors
})