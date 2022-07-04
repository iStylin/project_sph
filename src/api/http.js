// 当前这个模块：API进行统一管理
import instance from './request';
import mockAjax from './mockAjax';

// 三级联动的接口
export const reqCategoryList = ()=>{
    //发送请求
    return instance({
        method:'GET',
        url:'/product/getBaseCategoryList',
    });
};

// 获取banner(home首页轮播图接口)
export const reqBannerList = ()=>{
    return mockAjax({
        method:'GET',
        url:'/banner',
    });
};
// floor接口
export const reqFloorList = ()=>{
    return mockAjax({
        method:'GET',
        url:'/floor',
    });
};

// 获取搜索模块数据 地址：/api/list 请求方式：post 
// 当前这个接口，给服务器传递参数params，至少是一个空对象
export const reqGetSearchList = (params)=>{
    return instance({
        method:'POST',
        url:'/list',
        data:params,
    })
};

// 获取商品详情数据 地址：/api/item/{ skuId }
export const reqGoodsDetail = (skuId)=>{
    return instance({
        method:'GET',
        url:`/item/${skuId}`,
    })
}; 

// 加入购物车接口 请求方式：post  接口：/api/cart/addToCart/{ skuId }/{ skuNum }
export const reqAddCartAndEditSkuNum = (skuId,skuNum)=>{
    return instance({
        method:'POST',
        url:`/cart/addToCart/${skuId}/${skuNum}`,
    });
};

// 获取购物车列表 接口：/api/cart/cartList  方式：get
export const reqShopCart = ()=>{
    return instance({
        method:'GET',
        url:`/cart/cartList`,
    });
};

//  删除购物车商品 接口：/api/cart/deleteCart/{skuId}  方式：DELETE
export const reqDeleteShopCart = (skuId)=>{
    return instance({
        url:`/cart/deleteCart/${skuId}`,
        method:'DELETE',
    });
};

// 注册页 - 获取验证码  url:/api/user/passport/sendCode/{phone}   方式：get
export const reqCode = (phone)=>{
    return instance({
        url:`/user/passport/sendCode/${phone}`,
        method:'GET',
    });
}

// 用户注册  url:/api/user/passport/register  方式：post  参数：phone、password、code
export const reqUserRegister = (data)=>{
    return instance({
        url:'/user/passport/register',
        method:'POST',
        data:data,
    });
}

// 用户登录 url：/api/user/passport/login  方式：POST  参数：phone，password
export const reqUserLogin = (data)=>{
    return instance({
        url:'/user/passport/login',
        method:'POST',
        data:data
    });
}

// 获取用户信息 url：/api/user/passport/auth/getUserInfo  方式：get 
// 【需要带着用户的token向服务器要用户信息】
export const reqUserInfo = ()=>{
    return instance({
        url:'/user/passport/auth/getUserInfo',
        method:'GET',
    });
}

// 用户退出登录  url:/api/user/passport/logout  方式：get
export const reqLogOut = ()=>{
    return instance({
        url:'/user/passport/logout',
        method:'GET',
    });
}

// 订单交易页 url:/api/order/auth/trade  GET
export const reqTradeInfo = ()=>{
    return instance({
        url:'/order/auth/trade',
        method:"GET",
    });
}

// 提交订单 url:/api/order/auth/submitOrder?tradeNo={tradeNo}  POST
export const reqSubmitOrder = (tradeNo,data)=>{
    return instance({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        data,
        method:'POST',
    });
}

// 获取订单支付信息 url:  /api/payment/weixin/createNative/{orderId} GET
export const reqOrderPay = (orderId)=>{
    return instance({
        url:`/payment/weixin/createNative/${orderId}`,
        method:"GET",
    });
}

// 获取支付状态 url:/api/payment/weixin/queryPayStatus/{orderId}  get
export const reqPayStatus = (orderId)=>{
    return instance({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'GET',
    });
}
 
//获取我的订单列表 url:/api/order/auth/{page}/{limit}   GET
export const reqMyOrder = (page,limit)=>{
    return instance({
        url:`/order/auth/${page}/${limit}`,
        method:'GET',
    });
} 



