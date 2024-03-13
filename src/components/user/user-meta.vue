<script setup lang="ts">
import { useGlobalStore } from '@/stores/store.js';

defineOptions({
    name: 'UserMeta'
});

const { userStore } = useGlobalStore();
</script>

<template>
    <div class="main">
        <section class="item avator">
            <el-avatar style="align-self: center;" :size="72">User</el-avatar>
        </section>
        <section class="item">
            <el-tag :disable-transitions="true">用户 ID</el-tag>
            <span>{{ userStore.userInfo.id }}</span>
        </section>
        <section class="item">
            <el-tag :disable-transitions="true">用户邮箱</el-tag>
            <span>{{ userStore.userInfo.email }}</span>
        </section>
        <el-button type="primary" @click="userStore.logout">退出</el-button>
    </div>
</template>

<style scoped>
.main {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 2px;
}
.avator {
    display: flex;
    flex-direction: column;
}
.item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

</style>