import Vue from "vue";
import VueRouter from "vue-router";

// 引入路由配置信息
import routes from "@/router/routes"
// 使用路由插件
Vue.use(VueRouter);

// 引入store
import store from "@/store/index";

//备份VueRouter原型对象的Push，Replace
let originPush = VueRouter.prototype.push;
let originReplace = VueRouter.prototype.replace;

// 重写push | replace
// 第一个参数(location)：告诉原来push方法，要往哪里跳（传递哪些参数）
// 第二、三个参数(resolve,reject):成功，失败的回调
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        //用户传递了成功，失败的回调函数
        // 直接调用originPush，this指向window，此处用call指定this指向
        // call || apply区别
        // 相同点：都可以调用一次函数，都可以篡改函数的this指向一次
        // 不同点：call与apply传递参数：call用逗号隔开，apply使用数组
        originPush.call(this, location, resolve, reject);
    } else {
        //用户没有传递成功，失败的回调 
        originPush.call(this, location, () => { }, () => { });
    }
}
// 重写replace
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject);
    } else {
        originReplace.call(this, location, () => { }, () => { });
    }
}


// 配置路由
const router = new VueRouter({
    // 配置路由(一级)
    routes: routes,
    scrollBehavior(to, from, savedPosition) {
        // 始终滚动到顶部
        return { y: 0 }
    },
});

// 全局路由守卫，前置守卫【在路由跳转前进行判断】
router.beforeEach(async (to, before, next) => {
    // to:可以获取到你要跳转到哪个路由信息
    // from：可以获取到你从哪个路由而来的信息
    // next:放行函数   写法1：next()全部放行    写法2：next("路由path")             写法3：next(false)  
    const token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    // 用户已经登录
    if (token) {
        // 如果要通过地址栏去登录页是不允许的
        if (to.path == "/login") {
            next("/home");
        } else {
            // 去往非登录页
            if (name) {
                // 获取到了用户信息,放行
                next();
            } else {
                // 解决问题：用户刷新页面，用户保存在vuex中的用户信息【userInfo】丢失
                try {
                    // 无用户信息就派发action进行获取
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    // 此处可能用户保存的token已经过期了
                    // 需要清空用户信息，跳转到登录页
                    await store.dispatch("userLogOut");
                    next("/login");
                }
            }
        }

    } else {
        // 用户还未登录
        // 用户未登录不能去交易相关的页面  应该跳转到登录页
        if(to.path == "/center/myorder" || to.path == "/pay" ||to.path == "/paysuccess" || to.path == "/trade"){
            next("/login");
        }else{
            next();
        }
    }
});

// 导出路由
export default router;