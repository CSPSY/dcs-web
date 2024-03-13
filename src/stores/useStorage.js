import { shallowRef } from 'vue';
import { defineStore } from 'pinia';
import localforage from 'localforage';

export const useStorageStore = defineStore('storage', () => {
    // shallowRef: 创建一个浅层次的响应式引用，当对象或数组的属性或元素发生变化时，会触发更新，对象或数组本身的变化不会触发更新。
    const editorDB = shallowRef(
        localforage.createInstance({
            name: 'editor'
        })
    );

    return { editorDB };
});
