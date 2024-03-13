import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useConfigStore = defineStore('config', () => {
    const meta = reactive({
        name: '',
        slug: ''
    });

    const content = ref('');

    const getConfigData = () => ({
        ...meta,
        data: content.value
    });

    const updateContent = (str) => {
        content.value = str;
    };

    const updateName = (str) => {
        meta.name = str;
    };

    const updateSlug = (str) => {
        meta.slug = str;
    };

    const updateMeta = (name, slug) => {
        meta.name = name;
        meta.slug = slug;
    };

    const clear = () => {
        meta.name = '';
        meta.slug = '';
        content.value = '';
    }

    return {
        meta, content,
        getConfigData,
        updateContent, updateMeta, updateName, updateSlug, clear
    }
})
