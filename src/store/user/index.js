// 
import { reqCode, reqUserRegister, reqUserLogin ,reqUserInfo, reqLogOut} from '@/api/http'

const actions = {
    // 获取验证码
    async getCode(context,phoneNum){
        let result = await reqCode(phoneNum);
        if(result.code == 200){
            context.commit("GETCODE",result.data);
            return "success";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户注册
    async userRegister(context,registInfo){
        let result = await reqUserRegister(registInfo);
        if(result.code == 200){
            return "success"
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户登录
    async userLogin(context,loginInfo){
        let result = await reqUserLogin(loginInfo);
        if(result.code == 200){
            // 保存服务器返回的token
            context.commit("USERLOGIN",result.data.token);
            //将token永久保存 
            localStorage.setItem("TOKEN",result.data.token);
            return "success";
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 获取用户信息
    async getUserInfo(context){
        let result = await reqUserInfo();
        if(result.code == 200){
            context.commit("USERINFO",result.data);
            return "success"
        }else{
            return Promise.reject(new Error("faile"));
        }
    },
    // 用户退出登录
    async userLogOut(context){
        let result = await reqLogOut();
        if(result.code == 200){
            // 清除state中保存的用户数据，和token
            context.commit("CLEAR");
            return "success";
        }else{
            return Promise.reject(new Error("faile"));
        }
    }

}
const mutations = {
    // 验证码
    GETCODE(state,code){
        state.code = code;
    },
    // 保存服务器返回的token值
    USERLOGIN(state,token){
        state.token = token;
    },
    // 用户信息
    USERINFO(state,userInfo){
        state.userInfo = userInfo;
    },
    // 退出登录，清除用户信息
    CLEAR(state){
        // 清除state中的数据
        state.token = "";
        state.userInfo={};
        // 清除本地存储的token
        localStorage.removeItem("TOKEN");
    }

}
const state = {
    code :"",
    token:localStorage.getItem("TOKEN"),
    userInfo:{}
}
const getters = {
}

export default {
    actions,
    mutations,
    state,
    getters,
}