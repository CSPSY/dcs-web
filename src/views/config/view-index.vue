<script setup>
import { onMounted, reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useConfigList } from '../../hooks/useConfigList';
import ConfigList from './components/config-list.vue';

const {
    configList: configData, configSearchText, configPagination,
    refreshConfigList, onPageChange, handleSearch, handleDelete
} = useConfigList();

const router = useRouter();

onMounted(() => {
    refreshConfigList();
});
</script>

<template>
    <div class="main">
        <div class="content-top">
            <el-card shadow="never">
                <div class="banner-top">
                    <span class="titleSmall">我的配置</span>
                    <el-button type="primary" @click="router.push('/config/create')" plain>新建</el-button>
                </div>
                <el-input v-model="configSearchText" placeholder="输入关键词，回车查找配置" @keyup.enter.native="handleSearch" clearable />
            </el-card>
        </div>
        <div class="content-bottom">
            <el-card shadow="never" style="margin-bottom: 14px;">
                <config-list :data="configData" @del="handleDelete"/>
            </el-card>
            <el-pagination
                v-model:current-page="configPagination.current"
                v-model:page-size="configPagination.size"
                :disabled="false"
                layout="total, prev, pager, next, jumper"
                :total="configPagination.total"
                @current-change="onPageChange"
            />
        </div>
    </div>
</template>

<style scoped>
/* main 样式 */
.main {
    padding: 0;
}

.content-top {
    max-width: 968px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

.titleSmall {
    font-weight: 600;
    font-size: 1.3rem;
}

.banner-top {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
}

.content-bottom {
    max-width: 968px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.25rem;
}

.content-bottom .begin {
    margin-top: 16px;
}

.content-bottom .begin h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 12px;
}

.button {
    color: black;
}
.button:focus,
.button:hover {
    color: #0052d9;
}
</style>