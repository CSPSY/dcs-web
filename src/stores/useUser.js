/**
 * @description user
 */
import { ref, reactive } from 'vue';
import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', () => {
    const isLogin = ref(false);

    const userInfo = reactive({
        avator: '',
        email: '',
        id: 0
    });

    const login = (data) => {
        userInfo.avator = data.avatar
        userInfo.email = data.email
        userInfo.id = data.id
        isLogin.value = true
    }

    const logout = () => {
        userInfo.avator = '';
        userInfo.email = '';
        userInfo.id = 0;
        isLogin.value = false;
        localStorage.removeItem('DCS_TOKEN');
    };

    return { isLogin, userInfo, login, logout };
});