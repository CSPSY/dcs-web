<script setup>
import { onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { userLogin } from '../api/user.js';
import { useGlobalStore } from '../stores/store.js';

const route = useRoute();
const router = useRouter();

const { userStore } = useGlobalStore();

const login = (ticket) => {
    userLogin(ticket).then(res => {
        if (res.data.code !== 0) {
            throw new Error(res.data.msg);
        }

        userStore.login(res.data.data.user);
        localStorage.setItem('DCS_TOKEN', `Bearer ${res.data.data.token}`);
        ElMessage({ message: '登陆成功', type: 'success' });
        router.push('/');
    }).catch(err => {
        ElMessage.error(err.msg);
    });
};

onMounted(() => {
    const { ticket } = route.query;
    login(ticket);
});
</script>

<template>
    <div
        style="width: 100%; height: 84vh;"
        v-loading="true"
        element-loading-text="登陆中 ..."
        element-loading-background="rgba(152, 152, 152, 0.2)"
    ></div>
</template>

<style scoped>
</style>