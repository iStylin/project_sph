import {reqGoodsDetail,reqAddCartAndEditSkuNum} from "@/api/http";
import { getUUID } from "@/utils/getUUID";

const actions = {
    // 商品详情
    async getGoodInfo(context,skuid){
        let result = await reqGoodsDetail(skuid);
        if(result.code == 200){
            context.commit("GETGOODINFO",result.data);
        }
    },
    // 加入购物车和修改数量 此处无需存储数据到state中，因此无需走完vuex三连环
    async addCartAndEditSkuNum(context,{skuId,skuNum}){
        let result = await reqAddCartAndEditSkuNum(skuId,skuNum);
        if(result.code == 200){
            return 'success';
        }else{
            return Promise.reject(new Error('error!'));
        }
    }
};
const mutations = {
    GETGOODINFO(state,goodInfo){
        state.goodInfo = goodInfo;
    }  
};
const state = {
    goodInfo:{},
    // 存储游客id
    uuidToken:getUUID(),
};
const getters = {
    categoryView(state){
        return state.goodInfo.categoryView || {};
    },
    skuInfo(state){
        return state.goodInfo.skuInfo ||{};
    },
    spuSaleAttrList(state){
        return state.goodInfo.spuSaleAttrList || [];
    },
};

export default {
    actions,
    mutations,
    state,
    getters,
}