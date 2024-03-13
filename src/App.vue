<script setup>
import { onMounted, watch } from 'vue';
import HeaderNav from '@/components/layout/header-nav.vue';
import { useGlobalStore } from '@/stores/store.js';
import { getUserData } from './api/user';
import { useRouter } from 'vue-router';

const { userStore } = useGlobalStore();
const router = useRouter();

onMounted(() => {
    if (localStorage.getItem('DCS_TOKEN')) {
        getUserData().then((res) => {
            if (res.data.code !== 0) {
                return;
            }
            userStore.login({
                ...res.data?.data
            });
        }).catch(err => {
            ElMessage.error(err.msg);
        });
    }
});

watch(
    () => userStore.isLogin,
    (newVal) => {
        if (!newVal) {
            router.push('/');
        }
    },
);
</script>

<template>
    <div>
        <el-container>
            <el-header><HeaderNav /></el-header>
            <el-main>
                <router-view :key="$route.fullPath"></router-view>
            </el-main>
            <el-footer class="footer">DCS 动态配置系统</el-footer>
        </el-container>
    </div>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    box-sizing: border-box;
}

a {
    text-decoration: none;
}

/* footer 样式 */
.footer {
    padding: 16px;
    text-align: center;
}
</style>
