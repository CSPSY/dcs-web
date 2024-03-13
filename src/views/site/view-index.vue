<script setup>
import { reactive, ref, onMounted } from 'vue';
import SiteList from './components/site-list.vue';
import SiteEdit from './components/site-edit.vue';
import { useSiteList } from '@/hooks/useSiteList.js';

const siteStore = useSiteList();
const {
    siteSearchText, siteList: siteData, current, sitePagination,
    handleSearch, onPageChange, refreshSiteList, handleDelete
} = siteStore;

const isReadOnly = ref(false);

// 新建站点对话框
const isCreate = ref(true);
const createVisible = ref(false);

const handleCloseDialog = () => {
    createVisible.value = false;
};

onMounted(() => {
    refreshSiteList();
});
</script>

<template>
    <div class="main">
        <div class="content-top">
            <el-card shadow="never">
                <div class="banner-top">
                    <span class="titleSmall">
                        我的站点
                    </span>
                    <!-- 新建站点 -->
                    <el-button type="primary" plain @click="createVisible = true">新建</el-button>
                    <site-edit
                        :isVisible="createVisible" :is-create="isCreate" :readonly="isReadOnly"
                        @handleCloseDialog="handleCloseDialog" @confirm="refreshSiteList"
                    />
                </div>
                <el-input v-model="siteSearchText" placeholder="输入关键词，回车查找站点" @keyup.enter.native="handleSearch" clearable />
            </el-card>
        </div>
        <div class="content-bottom">
            <site-list :data="siteData" @refresh="refreshSiteList" @del="handleDelete($event)"/>
            <el-pagination
                v-model:current-page="current"
                v-model:page-size="sitePagination.size"
                :disabled="false"
                layout="total, prev, pager, next, jumper"
                :total="sitePagination.total"
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