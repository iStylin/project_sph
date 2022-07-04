import {reqTradeInfo} from "@/api/http";

const actions = {
    async getTradeInfo(context){
        let result = await reqTradeInfo();
        if(result.code == 200){
            context.commit("GETTRADEINFO",result.data)
        }
    }
}
const mutations = {
    GETTRADEINFO(state,tradeInfo){
        state.tradeInfo = tradeInfo;
    }
}
const state = {
    tradeInfo:{}
}
const getters = {
    // 用户地址信息
    userAddressList(state){
        return state.tradeInfo.userAddressList || [];
    },
    // 商品清单
    detailArrayList(state){
        return state.tradeInfo.detailArrayList || [];
    }
}

export default {
    actions,
    mutations,
    state,
    getters,
}