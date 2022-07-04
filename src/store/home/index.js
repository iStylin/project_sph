//home模块的仓库 
import {reqCategoryList,reqBannerList,reqFloorList} from '@/api/http';

// actions:可以书写自己的业务逻辑，也可以处理异步 ，但是不能修改state 
const actions = {
    // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
    // 三级联动
    categoryList(context,value){
        reqCategoryList().then(res=>{
            // 请求成功，需要mutation修改state数据
            if(res.code === 200){
                context.commit('CATEGORYLIST',res.data);
            }
        });
    },

    // 大的轮播图
    bannerList(context,value){
        reqBannerList().then(res=>{
            // console.log("bannerlist  action",res);
            if(res.code === 200){
                context.commit('BANNERLIST',res.data);
            }
        })
    },

    // floor区域
    getFloorList(context,value){
        reqFloorList().then(res=>{
            if(res.code === 200){
                context.commit('GETFLOORLIST',res.data)
            }
        })
    },


}
// mutations:修改state的唯一手段
const mutations = {
    // 将三级联动的数据存储到state仓库中
    CATEGORYLIST:function(state,value){
        state.categoryList = value;
    },
    // 将大的轮播图数据存储到state仓库中
    BANNERLIST:function(state,value){
        state.bannerList = value;
    },
    // 将floor数据存储到仓库中
    GETFLOORLIST:function(state,value){
        state.floors = value;
    }
}
// state:仓库存储数据的地方
const state = {
    categoryList : [],
    bannerList:[],
    floors:[],
}
// getters:可以理解为计算属性，用于简化仓库数组，让组件获取仓库的数据更加方便
const getters = {}

export default {
    actions,
    mutations,
    state,
    getters,
};