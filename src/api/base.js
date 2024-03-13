/**
 * @description api 接口
 */
import axios from 'axios';
import { ENV } from '../utils/env';

// SSO 登录
const APISSO = axios.create({
    baseURL: ENV.APISSO
});

// dcs 接口
const API = axios.create({
    baseURL: ENV.API
});

// API 请求拦截器
API.interceptors.request.use((req) => {
    const dcsToken = localStorage.getItem('DCS_TOKEN');
    if (dcsToken) {
        req.headers.Authorization = dcsToken;
    }
    return req;
});

export { API, APISSO };