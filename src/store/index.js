import Vue from "vue";
import Vuex from "vuex"
Vue.use(Vuex);

// 导入各个模块的仓库
import home from "./home";
import search from "./search";
import detail from "./detail";
import shopcart from "./shopcart";
import user from "./user";
import trade from "./trade";

// 创建store
const store = new Vuex.Store({
    // 实现Vuex仓库模块化开发存储数据
    modules:{
        home,
        search,
        detail,
        shopcart,
        user,
        trade
    }
});

// 导出store
export default store;