<script setup>
import { watch, ref } from 'vue';
import { CopyDocument } from '@element-plus/icons-vue';
import copy from 'copy-to-clipboard';
import { ENV } from '../../../utils/env';

defineOptions({
    name: 'ConfigDetailDialog'
});

const props = defineProps(['detailDialogVisible', 'data']);
const emit = defineEmits(['closeDetailDialog']);
const isVisible = ref(false);

watch(
    () => props.detailDialogVisible,
    (newVal) => {
        isVisible.value = newVal;
    }
);

const handleClose = () => {
    emit('closeDetailDialog');
};

const handleCopy = () => {
    copy(`${ENV.API}/config/get?slug=${props.data?.slug}`);
    ElMessage({ message: '复制成功', type: 'success' });
};
</script>

<template>
    <el-dialog v-model="isVisible" @close="handleClose" title="配置详情" width="500" align-center>
        <el-descriptions direction="vertical" :column="4" border>
            <el-descriptions-item :span="4" label="配置名">{{ props.data?.name || '-' }}</el-descriptions-item>
            <el-descriptions-item :span="2" label="Slug">{{ props.data?.slug || '-' }}</el-descriptions-item>
            <el-descriptions-item :span="2" label="归属者 ID">{{ props.data?.owner || '-' }}</el-descriptions-item>
            <el-descriptions-item :span="2" label="创建于">{{ props.data?.created_at || '-' }}</el-descriptions-item>
            <el-descriptions-item :span="2" label="上次修改于">{{ props.data?.updated_at || '-' }}</el-descriptions-item>
            <el-descriptions-item :span="4" label="访问链接">
                <el-link :icon="CopyDocument" @click="handleCopy">{{ `${ENV.API}/config/get?slug=${props.data?.slug || ''}` }}</el-link>
            </el-descriptions-item>
        </el-descriptions>
    </el-dialog>
</template>

<style scoped>
</style>