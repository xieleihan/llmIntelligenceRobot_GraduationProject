<template>
    <div class="HomecontentCom">
        <div class="top">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index"
                    :to="index !== breadcrumbList.length - 1 ? item.path : null">
                    {{ item.name }}
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="bottom">
            <!-- 默认视图 -->
            <defaultHomepages v-if="isOpenRouterView" />
            <!-- 路由出口 -->
            <router-view v-if="!isOpenRouterView" />
        </div>
        <CustomerBtn />
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { computed } from 'vue';
// 导入Vue-Router
import { useRoute } from 'vue-router';

// 导入组件
import defaultHomepages from '../../views/Modules/defaultHomepages.vue';
import CustomerBtn from '../base/CustomerBtn.vue';

// 假设 routes 的 meta 定义了面包屑的结构
const route = useRoute();

// 读取url是否在home页面,如果路径在home页面,改变isOpenRouterView的布尔值
const isOpenRouterView = computed(() => {
    // console.log("这是判断当前路径是否在/home上", route.path === '/home')
    return route.path === '/home';
});

const breadcrumbList = computed(() => {
    const matchedRoutes = route.matched.filter(item => item.meta && item.meta.breadcrumb);
    return matchedRoutes.map(item => ({
        path: item.path,
        name: item.meta.breadcrumb,
    }));
});
</script>

<style scoped lang="scss">
    .HomecontentCom {
        width: 100%;
        height: 100%;
        position: relative;
        
        .top{
            width: 100%;
            height: .3rem;
            .el-breadcrumb{
                width: 100%;
                height: 100%;
                .el-breadcrumb__item{
                    // width: 100%;
                    height: 100%;
                    font-size: .1rem;
                    ::v-deep(.el-breadcrumb__separator){
                        margin: 0 .05rem;
                    }
                }
            }
        }
        .bottom{
            width: 100%;
            height: calc(100% - .3rem);
            border-top: .01px solid #ccc;
        }
    }
</style>