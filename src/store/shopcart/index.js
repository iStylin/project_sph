import { reqShopCart,reqDeleteShopCart } from "@/api/http";

const actions = {
    // 获取购物车列表
    async shopCartList(context,value){
        let result = await reqShopCart();
        if(result.code == 200){
            context.commit("SHOPCART",result.data);
        }
    },
    // 删除购物车条目
    async deleteShopCart(context,skuId){
        let result = await reqDeleteShopCart(skuId);
        if(result.code == 200){
            return 'success'
        }else{
            return Promise.reject(new Error('faile'));
        }
    }

};
const mutations = {
    SHOPCART(state,value){
        state.cartDate = value;
    }
};
const state = {
    cartDate : [],
};
const getters = {
    // 购物车列表
    cartList(state){
        return state.cartDate[0] || {};
    }
};

export default {
    actions,
    mutations,
    state,
    getters,
}