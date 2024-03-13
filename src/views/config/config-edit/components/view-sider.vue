<script setup>
import { computed, reactive, ref } from 'vue';
import { useConfigStore } from '../store.js';
import { ENV } from '../../../../utils/env.js';

defineOptions({
    name: 'ViewSider'
});

const props = defineProps(['isCreate']);
const emit = defineEmits(['confirm']);
const { meta, updateName, updateSlug } = useConfigStore();

const actionText = computed(() => {
    return props.isCreate ? '创建' : '更新';
});

const formRef = ref();
const formRules = {
    name: [{ required: true, message: '请输入配置名', trigger: 'blur' }],
    slug: [{ required: true, message: '请输入 Slug', trigger: 'blur' }]
};

const handleConfigCreate = async () => {
    if (!formRef.value) {
        return;
    }
    const isValid = await formRef.value.validate();
    if (isValid) {
        emit('confirm');
    } else {
        throw new Error('请检查填写信息 ~');
    }
};
</script>

<template>
    <div class="main">
        <section>
            <h3 style="font-size: 1.5rem; font-weight: 400;">{{ actionText }}配置</h3>
        </section>
        <section class="input-area">
            <el-form :model="meta" :rules="formRules" ref="formRef" label-position="top">
                <el-form-item label="配置名" prop="name">
                    <el-input v-model="meta.name" @change="updateName"></el-input>
                </el-form-item>
                <el-form-item label="Slug" prop="slug">
                    <el-input v-model="meta.slug" :disabled="!isCreate" @change="updateSlug"></el-input>
                </el-form-item>
                <div style="font-size: 14px; opacity: 0.7; padding-top: 6px; margin-bottom: 26px;">
                    <span>可通过以下链接获取配置<br>{{ `${ENV.API}/config/get?slug=${meta.slug || '{slug}'}` }}</span>
                </div>
                <el-button type="primary" @click="handleConfigCreate">{{ actionText }}</el-button>
            </el-form>
        </section>
    </div>
</template>

<style scoped>
/* main 样式 */
.input-area {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
}

.button {
    color: black;
}
.button:focus,
.button:hover {
    color: #0052d9;
}
</style>