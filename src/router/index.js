/**
 * @description 路由配置
 */
import { createRouter, createWebHistory } from 'vue-router';
import { useGlobalStore } from '@/stores/store.js';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/view-index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login-callback.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/config',
        name: 'config',
        meta: {
            title: '配置管理',
            menuKey: '/config'
        },
        children: [
            {
                path: '',
                name: 'config-index',
                component: () => import('@/views/config/view-index.vue'),
                meta: {
                    title: '配置管理',
                    menuKey: '/config'
                }
            },
            {
                path: 'create',
                name: 'config-create',
                component: () => import('@/views/config/config-edit/view-index.vue'),
                meta: {
                    title: '创建配置',
                    menuKey: '/config'
                }
            },
            {
                path: 'edit/:slug',
                name: 'config-edit',
                component: () => import('@/views/config/config-edit/view-index.vue'),
                meta: {
                    title: '编辑配置',
                    menuKey: '/config'
                }
            }
        ]
    },
    {
        path: '/site',
        name: 'site',
        component: () => import('@/views/site/view-index.vue'),
        meta: {
            title: '站点'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    // 是否展示顶部选项，   登录部分不展示
    const { menuStore } = useGlobalStore();
    if (to.name === 'login') {
        menuStore.setShowValue(false);
    } else {
        menuStore.setShowValue(true);
    }

    // 路由发送变化时，更改页面 title
    if (to.meta.title) {
        document.title = 'DCS | ' + to.meta.title;
    }
    next();
});

export { router };