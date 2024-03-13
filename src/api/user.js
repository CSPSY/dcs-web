/**
 * @description 用户接口
 */
import { API } from './base';

// 用户登录
export const userLogin = (ticket) => {
    return API.get('/user/login', { params: { ticket } });
};

// 获取用户信息
export const getUserData = () => {
    return API.get('/user/data');
};