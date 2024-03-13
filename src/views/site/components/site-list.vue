<script setup>
import { reactive, ref, nextTick, onMounted, watch } from 'vue';
import SiteItem from './site-item.vue';
import SiteEdit from './site-edit.vue';

defineOptions({
    name: 'SiteList'
});

const props = defineProps(['data']);
const emit = defineEmits(['refresh', 'del']);


const editVisible = ref(false);
const currentSiteItem = ref();
const isReadonly = ref(false);

const handleSelectSite = (type, item) => {
    console.log('item', item);
    currentSiteItem.value = item;
    isReadonly.value = type === 'inspect';
    editVisible.value = true;
};

const handleCloseDialog = () => {
    editVisible.value = false;
};
</script>

<template>
    <div class="main">
        <div style="padding: 16px 0;">
            <el-row :gutter="14">
                <el-col v-for="(item, index) in props.data" :key="`item-${index}`" :span="8" style="margin-bottom: 32px;">
                    <site-item
                        :data="item"
                        @edit="handleSelectSite('edit', item)" @inspect="handleSelectSite('inspect', item)" @del="emit('del', $event)"
                    />
                </el-col>
            </el-row>
        </div>
    </div>
    <site-edit
        :isVisible="editVisible" :is-create="false" :site="currentSiteItem" :readonly="isReadonly"
        @handleCloseDialog="handleCloseDialog" @confirm="emit('refresh')"
    />
</template>

<style scoped>
/* main 样式 */
</style>