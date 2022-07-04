// 此文件专门用于配置各组件路由信息 

// 引入路由组件

// 路由懒加载
// 更高效，调用到的时候才会加载组件，原始的引入多少就加载多少

const home = ()=>{return import("@/pages/Home")}

import Search from "../pages/Search";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Detail from "../pages/Detail";
import AddCartSuccess from '../pages/AddCartSuccess';
import ShopCart from "../pages/ShopCart";
import Trade from "../pages/Trade";
import Pay from "../pages/Pay";
import PaySuccess from "../pages/PaySuccess";
import Center from "../pages/Center";
// 引入二级路由组件
import MyOrder from "../pages/Center/MyOrder";
import GroupOrder from "../pages/Center/GroupOrder";


export default [
    {
        name: 'center',
        path: '/center',
        component: Center,
        meta: { show: true },
        // 二级路由
        children: [
            {
                name: 'myorder',
                path: 'myorder',
                component: MyOrder,
            },
            {
                name: 'grouporder',
                path: 'grouporder',
                component: GroupOrder,
            },
            // 设置重定向，一上来默认显示myorder
            {
                path: '/center',
                redirect: '/center/myorder'
            }
        ]
    },
    {
        name: 'paysuccess',
        path: '/paysuccess',
        component: PaySuccess,
        meta: { show: true }
    },
    {
        name: 'pay',
        path: '/pay',
        component: Pay,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有从trade来的才可以进入pay页
            if (from.path == "/trade") {
                next();
            } else {
                // 其余的留在当前页
                next(false);
            }
        }
    },
    {
        name: 'trade',
        path: '/trade',
        component: Trade,
        meta: { show: true },
        // 路由独享守卫
        beforeEnter: (to, from, next) => {
            // 只有从购物车来的才可以进入trade页
            if (from.path == "/shopcart") {
                next();
            } else {
                // 其余的留在当前页
                next(false);
            }
        }
    },
    {
        name: 'shopcart',
        path: '/shopcart',
        component: ShopCart,
        meta: { show: true }
    },
    {
        name: 'addcartsuccess',
        path: '/addcartsuccess',
        component: AddCartSuccess,
        meta: { show: true }
    },
    {
        name: 'home',
        path: '/home',
        component: home,
        meta: { show: true }
    },
    {
        name: 'search',
        path: '/search/:keyword?',
        component: Search,
        meta: { show: true }
    },
    {
        name: 'login',
        path: '/login',
        component: Login,
        meta: { show: false }
    },
    {
        name: 'register',
        path: '/register',
        component: Register,
        meta: { show: false }
    },
    {
        name: 'detail',
        path: '/detail/:skuid',
        component: Detail,
        meta: { show: true }
    },
    //  重定向：项目跑起来的时候，访问/，立马让他定向到首页
    {
        path: '/',
        redirect: '/home',
    }
]