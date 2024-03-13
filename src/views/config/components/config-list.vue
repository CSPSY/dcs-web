<script setup>
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import ConfigDetailDialog from './config-detail-dialog.vue';
import { InfoFilled } from '@element-plus/icons-vue';

defineOptions({
    name: 'ConfigList'
});

const router = useRouter();

const props = defineProps(['data']);
const emit = defineEmits(['del']);

const detailDialogVisible = ref(false);
const detailItem = ref();

const showDetailDialog = (item) => {
    detailItem.value = item;
    detailDialogVisible.value = true;
};

const closeDetailDialog = () => {
    detailDialogVisible.value = false;
};
</script>

<template>
    <div class="main">
        <el-table :data="props.data" style="width: 100%;" :show-header="false">
            <el-table-column prop="name" label="配置" />
            <el-table-column align="right" label="操作" >
                <template #default="{ row }">
                    <el-button link type="primary" size="small" @click="router.push(`/config/edit/${row.slug}`)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="showDetailDialog(row)">详情</el-button>
                    <el-popconfirm
                        width="270"
                        confirm-button-text="确认删除"
                        confirm-button-type="danger"
                        cancel-button-text="取消"
                        :icon="InfoFilled"
                        icon-color="red"
                        :title="`确认删除${row.name}吗？`"
                        @confirm="emit('del', row.slug)"
                    >
                    <template #reference>
                        <el-button link type="danger" size="small">删除</el-button>
                    </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
        <config-detail-dialog :detailDialogVisible="detailDialogVisible" :data="detailItem" @closeDetailDialog="closeDetailDialog" />
    </div>
</template>

<style scoped>
/* main 样式 */
</style>