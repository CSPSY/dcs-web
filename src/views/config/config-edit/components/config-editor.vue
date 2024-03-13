<script setup>
import { ref, onMounted, computed, watch, toRaw } from 'vue';
import * as monaco from 'monaco-editor';
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
import jsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker';
import cssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker';
import htmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker';
import tsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker';
import { useConfigStore } from '../store.js';
import { useRoute } from 'vue-router';

defineOptions({
    name: 'ConfigEditor'
});

const route = useRoute();
const isCreate = computed(() => {
    return route.name === 'config-create';
});

const props = defineProps(['value']);
const emit = defineEmits(['update:value']);

const configStore = useConfigStore();

// 编辑器，Monaco Editor
const editorRef = ref();
const editor = ref();

const createEditor = () => {
    const editorInstance = monaco.editor.create(editorRef.value, {
        value: configStore.content,
        language: 'json',
        theme: 'vs-dark',
        automaticLayout: true,
    });
    
    // 监听编辑器内容的变化，并将内容更新到 configStore 里
    editorInstance.onDidChangeModelContent(() => {
        configStore.updateContent(toRaw(editor.value).getValue());
    });

    editor.value = editorInstance;
};

onMounted(() => {
    // 初始化 Monaco 环境
    self.MonacoEnvironment = {
        getWorker(_, label) {
            if (label === 'json') {
            return new jsonWorker()
            }
            if (label === 'css' || label === 'scss' || label === 'less') {
            return new cssWorker()
            }
            if (label === 'html' || label === 'handlebars' || label === 'razor') {
            return new htmlWorker()
            }
            if (label === 'typescript' || label === 'javascript') {
            return new tsWorker()
            }
            return new editorWorker()
        }
    }

    // 初始化数据
    if (isCreate.value) {
        createEditor();
    } else {
        watch(
            () => configStore.content,
            (newContent) => {
                createEditor();
            },
            { once: true }
        );
    }
});
</script>

<template>
    <div class="main">
        <el-card style="height: 100%;" :body-style="{ padding: '0px', height: '100%' }" shadow="never">
            <template #header>
                <div class="card-header" style="font-weight: 600;">
                    <span>编辑配置</span>
                </div>
            </template>
            <div ref="editorRef" style="height: 100%;"></div>
        </el-card>
    </div>
</template>

<style scoped>
/* main 样式 */
.main {
    height: 80vh;
}

.content-right {
    padding: 8px;
    height: 100%;
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