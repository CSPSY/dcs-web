/**
 * @description 配置信息 hooks
 */
import { reactive, ref } from "vue";
import { getUserConfig, delConfig } from "../api/config";

export const useConfigList = () => {
    const configList = ref([]);
    const configSearchText = ref('');
    const configPagination = reactive({
        total: 0,
        current: 1,
        size: 10
    });
    
    // 更新 config list 信息
    const refreshConfigList = async () => {
        // 调用 getUserConfig 函数获取用户配置列表
        const res = await getUserConfig(
            (configPagination.current - 1) * configPagination.size,
            configPagination.size,
            configSearchText.value
        );
        
         // 更新配置列表、总数和加载状态
        configList.value = res?.data?.data?.items || [];
        configPagination.total = res?.data?.data?.total ?? 0; //?? 0：空值合并操作符，如果res?.data?.data?.total的值是undefined，则使用默认值0。

        return res;
    };

    // 分页操作
    const onPageChange = (currentPage) => {
        configPagination.current = currentPage;
        refreshConfigList();
    };

    // 搜索操作
    const handleSearch = () => {
        // 将当前页重置为第一页，然后刷新配置列表
        configPagination.current = 1;
        refreshConfigList();
    };

    // 删除操作
    const handleDelete = (slug) => {
        delConfig(slug).then((res) => {
            if (res.data.code !== 0) {
                throw new Error(res.data.msg)
            }
            ElMessage({message: '删除成功', type: 'success'});
            refreshConfigList();
        }).catch((e) => {
            ElMessage.error(e.message)
        });
    };

    return {
        configList, configSearchText, configPagination,
        refreshConfigList, onPageChange, handleSearch, handleDelete
    };
};