import { ref, reactive } from 'vue';

import { getUserSite, delSite } from '@/api/site';

export const useSiteList = () => {
    const siteList = ref([]);
    const siteSearchText = ref('');
    const sitePagination = reactive({
        total: 0,
        current: 1,
        size: 2
    });

    // 更新 site list 信息
    const refreshSiteList = async () => {
        const res = await getUserSite(
            (sitePagination.current - 1) * sitePagination.size,
            sitePagination.size,
            siteSearchText.value
        );
        siteList.value = res?.data?.data?.items || [];
        sitePagination.total = res?.data?.data?.total ?? 0;
        
        return res;
    };

    // 分页操作
    const onPageChange = (currentPage) => {
        sitePagination.current = currentPage;
        refreshSiteList();
    };

    // 搜索操作
    const handleSearch = () => {
        sitePagination.current = 1;
        refreshSiteList();
    };

    // 删除操作
    const handleDelete = (id) => {
        delSite(id).then((res) => {
            if (res.data.code !== 0) {
                throw new Error(res.data.msg);
            }
            ElMessage({message: '删除成功', type: 'success'});
            refreshSiteList();
        }).catch((err) => {
            ElMessage.error(err.message);
        });
    };

    return {
        siteList, sitePagination, siteSearchText,
        refreshSiteList, onPageChange, handleSearch, handleDelete
    };
};
