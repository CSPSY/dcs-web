<script setup>
import { EditPen }  from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';

const router = useRouter();
</script>

<template>
    <div class="main">
        <div class="banner">
            <!-- 各种小应用链接 -->
        </div>
        <div class="content">
            <el-card class="box-card" shadow="never">
                <template #header>
                    <div class="card-header"><span>DCS</span></div>
                </template>
                <div>Dynamic Configuartion System，你可以快速建立动态配置并应用于你的站点。</div>
            </el-card>
            <section class="begin">
                <h3>快速开始</h3>
                <el-row :gutter="20">
                    <el-col :span="8">
                        <el-card class="box-card" shadow="hover">
                            <template #header>
                                <div class="card-header" style="font-weight: 600;"><span>登录</span></div>
                            </template>
                            <div style="font-size: 14px;">点击右上角以进行登录。</div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" shadow="hover">
                            <template #header>
                                <div class="card-header" style="font-weight: 600;">
                                    <span>创建配置</span>
                                    <el-button style="height: 0;" class="button" text
                                        @click="router.push('/config/create')"
                                    >
                                        <el-icon><EditPen /></el-icon>
                                    </el-button>
                                </div>
                            </template>
                            <div style="font-size: 14px;">
                                创建一个配置，支持JSON格式。
                            </div>
                        </el-card>
                    </el-col>
                    <el-col :span="8">
                        <el-card class="box-card" shadow="hover">
                            <template #header>
                                <div class="card-header" style="font-weight: 600;">
                                    <span>创建站点</span>
                                    <el-button style="height: 0;" class="button" text
                                        @click="router.push('/site')"
                                    >
                                        <el-icon><EditPen /></el-icon>
                                    </el-button>
                                </div>
                            </template>
                            <div style="font-size: 14px;">
                                创建一个站点，并输入域名、关联配置。<br/>配置关联后，只有该域名才能访问对应配置。
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </section>
        </div>
    </div>
</template>

<style scoped>
/* main 样式 */
.main {
    padding: 0;
}

.banner {
    background-color: #f1f5f9;
    height: 500px;
}

.content {
    max-width: 968px;
    width: 80%;
    margin-left: auto;
    margin-right: auto;
    margin-top: 1.25rem;
    margin-bottom: 1.25rem;
}

.content .begin {
    margin-top: 16px;
}

.content .begin h3 {
    font-size: 1.5rem;
    font-weight: 400;
    margin-bottom: 12px;
}

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
</style>