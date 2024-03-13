/**
 * @description store，数据仓库
 */
import { defineStore } from "pinia";
import { useMenuStore } from "./useMenu.js";
import { useUserStore } from "./useUser.js";
import { useStorageStore } from './useStorage';

export const useGlobalStore = defineStore('global', () => {
    const menuStore = useMenuStore();
    const userStore = useUserStore();
    const storageStore = useStorageStore();

    return { menuStore, userStore, storageStore };
});