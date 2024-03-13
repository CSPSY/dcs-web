<script setup>
import { watch, ref } from 'vue';
import { MENU_LIST } from '../../utils/constants.js';
import { useRouter } from 'vue-router';
import { useGlobalStore } from '../../stores/store.js';
import { ENV } from '../../utils/env.js';
import UserLogin from '../user/user-login.vue';
import UserMeta from '../user/user-meta.vue';
import { User }  from '@element-plus/icons-vue';

defineOptions({
    name: 'HeaderNav'
});

const router = useRouter();
const { userStore, menuStore } = useGlobalStore();

const popoverRef = ref();

watch(
    () => userStore.isLogin,
    (newVal) => {
        if (!newVal) {
            popoverRef.value.hide();
        }
    },
);
</script>

<template>
    <div class="header">
        <section class="header-left">
            <span class="title">DCS</span>
            <div style="margin-right: 12px;"
                v-show="menuStore.show"
                v-for="menu in MENU_LIST" :key="menu.value"
                @click="router.push(menu.value)"
            >
                <el-button class="button" type="primary" text>{{ menu.label }}</el-button>
            </div>
        </section>
        <section class="header-right">
            <el-popover
                ref="popoverRef"
                placement="bottom"
                :width="userStore.isLogin ? 260 : 120"
            >
            <template #reference>
                <el-button class="loginBtn" :icon="User" text/>
            </template #default>
                <user-meta v-if="userStore.isLogin" />
                <user-login v-else />
            </el-popover>
        </section>
    </div>
</template>

<style scoped>
/* header 样式 */
.header {
    height: 56px;
    display: flex;
    justify-content: space-between;
    padding: 0 12px;
}
.title {
    font-size: 1.8rem;
    font-weight: 300;
    letter-spacing: .3rem;
    padding: 0 12px;
    margin-right: 32px;
}
.header-left {
    display: flex;
    align-items: center;
}
.header-right {
    display: flex;
    align-items: center;
}
.button:last-child {
    margin-left: auto;
}
.loginBtn {
    font-size: 22px;
}
.button {
    color: black;
}
.button:focus,
.button:hover {
    color: #0052d9;
}
</style>