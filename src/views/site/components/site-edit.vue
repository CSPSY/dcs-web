<script setup>
import { reactive, ref, nextTick, watch, computed, onUnmounted, readonly } from 'vue';
import { useConfigList } from '@/hooks/useConfigList.js';
import { createSite, updateSite } from '@/api/site.js';

defineOptions({
    name: 'SiteEdit'
});

const props = defineProps(['isCreate', 'isVisible', 'readonly', 'site']);
const emit = defineEmits(['handleCloseDialog', 'confirm']);

const actionText = computed(() => props.isCreate ? '创建' : '编辑');

const visible = ref(false);
const formRef = ref();

watch(
    () => props.isVisible,
    (newVal) => {
        visible.value = newVal;
    }
);

const { configList, refreshConfigList } = useConfigList();
const configOptions = computed(() => configList.value.map((config) => ({
    label: config.name,
    key: config._id,
})));

const initSiteData = () => {
    if (props.isCreate) {
        siteData.name = '';
        siteData.configs = [];
        siteData.domains = [];
    } else {
        siteData.name = props.site?.name || '';
        siteData.domains = props.site?.domains || [];
        siteData.configs = props.site?.configs || [];
    }
};

const unwatch = watch(
    () => props.isVisible,
    async (newVal) => {
        if (newVal) {
            initSiteData();
            refreshConfigList();
        }
    }
);;

// 新建站点对话框
const siteData = reactive({
    domains: [],
    configs: [],
    name: '',
});

const formRules = {
    name: [{ required: true, message: '请输入站点名', trigger: 'change' }],
    configs: [{ type: 'array', required: true, message: '请先完成此项', trigger: 'blur' }],
    domains: [{ required: true, message: '请完成此项', trigger: 'blur' }]
};

// 关联配置 --- 搜索
const filterMethod = (query, item) => {
    return item.label.includes(query);
}

// 动态增减域名
const inputValue = ref('');
const inputVisible = ref(false);
const InputRef = ref();

const handleClose = (tag) => {
    siteData.domains.splice(siteData.domains.indexOf(tag), 1);
};

const showInput = () => {
    inputVisible.value = true;
    nextTick(() => {
        InputRef.value.focus();
    });
};

const handleInputConfirm = () => {
    if (inputValue.value) {
        siteData.domains.push(inputValue.value);
    }
    inputVisible.value = false;
    inputValue.value = '';
};

// 确认新建 / 编辑站点
const handleConfirm = async () => {
    const isValid = await formRef.value.validate();
    if (!isValid) {
        return;
    }

    const result = props.isCreate ? createSite({ ...siteData }) : updateSite((props.site)._id, { ...siteData });
    result.then(res => {
        if (res.data.code === 0) {
            ElMessage({ message: '操作成功', type: 'success' });
            // confirm： 刷新 siteList
            emit('confirm');
            emit('handleCloseDialog');
        } else {
            throw new Error(res.data.msg);
        }
    }).catch(err => {
        ElMessage.error(err.message);
    });
};

onUnmounted(unwatch);
</script>

<template>
    <el-dialog v-model="visible" @close="emit('handleCloseDialog')" :title="`${actionText}站点`" width="600" draggable>
        <section class="input-area">
            <el-form :model="siteData" :rules="formRules" :disabled="props.readonly" ref="formRef" label-position="top">
                <el-form-item label="站点名" prop="name">
                    <el-input v-model="siteData.name" placeholder="请输入"></el-input>
                </el-form-item>
                <el-form-item label="关联配置" prop="configs">
                    <el-transfer
                        v-model="siteData.configs"
                        filterable
                        :filter-method="filterMethod"
                        filter-placeholder="请输入关键词搜索"
                        :titles="['未关联', '已关联']"
                        :data="configOptions"
                    />
                </el-form-item>
                <el-form-item label="域名" prop="domains">
                    <el-tag
                        v-for="tag in siteData.domains"
                        :key="tag"
                        :closable="!props.readonly"
                        :disable-transitions="false"
                        @close="handleClose(tag)"
                    >
                    {{ tag }}
                    </el-tag>
                    <el-input
                        v-if="inputVisible"
                        ref="InputRef"
                        v-model="inputValue"
                        @keyup.enter="handleInputConfirm"
                        @blur="handleInputConfirm"
                    />
                    <el-button v-else v-show="!props.readonly" class="button-new-tag" size="small" @click="showInput">
                        + 域名
                    </el-button>
                </el-form-item>
            </el-form>
        </section>
        
        <template #footer>
            <div v-show="!props.readonly" class="dialog-footer">
                <el-button @click="emit('handleCloseDialog')">取消</el-button>
                <el-button type="primary" @click="handleConfirm">确认</el-button>
            </div>
        </template>
    </el-dialog>
</template>
<style scoped>
.input-area {
    margin-top: 12px;
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