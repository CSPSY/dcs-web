<script setup>
import { ref, computed } from 'vue';

defineOptions({
    name: 'SiteItem'
});

const props = defineProps(['data']);
const emit = defineEmits(['edit', 'inspect', 'del']);

const deleteDialog = ref(false);

const displayDomainText = computed(() => {
    if (props.data.domains.length >= 1) {
        return props.data.domains[0];
    }

    return '-';
});

const handleDeleteConfirm = () => {
    emit('del', props.data._id);
    deleteDialog.value = false;
};
</script>

<template>
    <div class="main">
        <el-card :body-style="{ padding: '0px 6px', display: 'flex', alignItems: 'center', height: '100%', fontSize: '14px' }" shadow="never">
            <template #header>
                <div class="card-header">
                    <span>{{ props.data.name }}</span>
                    <el-dropdown>
                        <span class="el-dropdown-link">操作</span>
                        <template #dropdown>
                            <el-dropdown-menu class="dropdown-menu">
                                <el-dropdown-item @click="emit('edit', props.data._id)">编辑</el-dropdown-item>
                                <el-dropdown-item @click="emit('inspect', props.data._id)">详情</el-dropdown-item>
                                <el-dropdown-item @click="deleteDialog=true">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </div>
            </template>
            <!-- 删除确认框 -->
            <el-dialog v-model="deleteDialog" title="删除站点" width="500" center>
                <span>{{ `确认要删除${props.data.name}站点吗` }}</span>
                <template #footer>
                <div class="dialog-footer">
                    <el-button @click="deleteDialog = false">取消</el-button>
                    <el-button type="danger" @click="handleDeleteConfirm">确认删除</el-button>
                </div>
                </template>
            </el-dialog>
            <div style="padding: 14px; display: flex; flex-direction: column; width: 100%;">
                <div style="margin-bottom: 14px; display: flex; justify-content: space-between;">
                    <el-tag :disable-transitions="true" type="success">域名</el-tag>
                    <span>
                        {{ displayDomainText }}
                        <el-tag v-if="data.domains.length > 1" round size="small">+{{ data.domains.length - 1 }}</el-tag>
                    </span>
                </div>
                <div style="display: flex; justify-content: space-between;">
                    <el-tag :disable-transitions="true" type="success">配置数</el-tag><span>{{ props.data.configs.length }}</span>
                </div>
            </div>
        </el-card>
    </div>
</template>

<style scoped>
/* main 样式 */
.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.button {
    color: black;
}
.button:focus,
.button:hover {
    color: #0052d9;
}

.el-card :deep(.el-card__header) {
    padding-top: 0px;
    padding-bottom: 0px;
    height: 56px;
    line-height: 56px;
}
.el-dropdown-link {
    color: #409eff;
}
:deep(.el-tooltip__trigger:focus-visible) {
    outline: unset;
}
/* 修改背景色以及border颜色*/
.dropdown-menu {
    padding: 6px;
    min-width: 80px;
}
/* 修改每一项的字体*/
.dropdown-menu :deep(.el-dropdown-menu__item) {
    border-radius: 4px;
}
.dropdown-menu :deep(.el-dropdown-menu__item:last-child) {
    color: red;
}
.dropdown-menu :deep(.el-dropdown-menu__item:last-child):hover {
    background: #fef0f0;
}
</style>