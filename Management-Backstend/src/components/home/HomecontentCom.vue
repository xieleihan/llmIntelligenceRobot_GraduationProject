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
            <router-view />
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

// 假设 routes 的 meta 定义了面包屑的结构
const route = useRoute();

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
        }
    }
</style>