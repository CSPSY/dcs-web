<script setup>
import { ENV } from '../../utils/env.js';

defineOptions({
    name: 'UserLogin'
});

// 登录，跳转到 SSO 登录中心
const handleLogin = () => {
    window.location.href = `${ENV.SSO}/callback/${ENV.SSO_ID}`;
};
</script>

<template>
    <div class="main">
        <!-- <span>——></span> -->
        <el-button class="button" @click="handleLogin">登录</el-button>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    align-items: center;
    font-size: 1rem;
}
.main .button {
    margin-left: 13px;
}
.button {
    width: 100%;
    color: black;
}
.button:focus,
.button:hover {
    color: #0052d9;
}
</style>