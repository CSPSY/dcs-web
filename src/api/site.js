/**
 * @description 站点部分接口，site
 */
import { API } from './base.js';
import qs from 'qs'

// 获取用户站点列表
export const getUserSite = (offset, limit, search=null) => {
    return API.get('/site/', {
        params: {
            offset,
            limit,
            search
        }
    });
};

export const createSite = (data) => {
    const body = {
        ...data,
        domains: data.domains.join(','),
        configs: data.configs.join(',')
    };

    return API.post('/site/', qs.stringify(body));
};

// 获取具体站点信息
export const getSite = (id) => {
    return API.get(`/site/${id}`);
};

export const updateSite = (id, data) => {
    const body = {
        ...data,
        domains: data.domains.join(','),
        configs: data.configs.join(',')
    };

    return API.put(`/site/${id}`, qs.stringify(body));
};

export const delSite = (id) => {
    return API.delete(`/site/${id}`);
};
