import { v4 as uuidv4 } from 'uuid';

export const getUUID = function(){
    let uuidToken = localStorage.getItem('UUIDTOKEN');
    if(!uuidToken){
        // 如果本地没有则生成
        uuidToken = uuidv4();
        // 本地存储一次
        localStorage.setItem("UUIDTOKEN",uuidToken);
    }
    return uuidToken;
} 