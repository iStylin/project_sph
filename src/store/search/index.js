//search模块的仓库 
import {reqGetSearchList} from "@/api/http";

// actions:可以书写自己的业务逻辑，也可以处理异步 ，但是不能修改state 
const actions = {
    searchList(context,params={}){
        // params参数：当用户派发action时，第二个参数传递过来的，至少是一个空对象
        reqGetSearchList(params).then(res => {
            context.commit("SEARCHLIST",res.data)
        })
    },
}
// mutations:修改state的唯一手段
const mutations = {
    SEARCHLIST(state,value){
        state.searchList = value;
    }
}
// state:仓库存储数据的地方
const state = {
    searchList:{},
}
// getters:可以理解为计算属性，用于简化仓库数组，让组件获取仓库的数据更加方便
const getters = {
    trademarkList(state){
        //state是当前仓库的state并非大仓库的state
        // 加入网络不通畅|没有网络，state.searchList.trademarkList应该返回的是一个undefined，那么页面遍历undefined会报错
        // 所以此处计算的新的属性的属性值至少是一个空数组
        return state.searchList.trademarkList || [];
    },
    attrsList(state){
        return state.searchList.attrsList || [];
    },
    goodsList(state){
        return state.searchList.goodsList || [];
    },

}

export default {
    actions,
    mutations,
    state,
    getters,
};