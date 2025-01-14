<template>
    <div class="homeAside">
        <el-collapse
            class="collapse"
            v-model="activeName"
            accordion
        >
            <el-collapse-item
                class="collapseItem"
                title="系统"
                name="1"
            >
                
            </el-collapse-item>
            <el-collapse-item
                class="collapseItem"
                title="用户管理"
                name="2"
            >

            </el-collapse-item>
            <el-collapse-item
                class="collapseItem"
                title="关于我们"
                name="3"
            >

            </el-collapse-item>

        </el-collapse>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeName = ref('1')
</script>

<style scoped lang="scss">
@import '../../style/base.scss';

.homeAside {
    width: 100%;
    height: 100%;
    border-radius: .05rem;
    background-color: white;
    font-size: .01rem;

    .collapse {
        width: 100%;
        height: 100%;

        ::v-deep(.collapseItem) {
            .el-collapse-item__header {
                padding-left: .1rem;
                height: .5rem; // 设置标题高度
                font-size: 0.1rem; // 设置标题字体大小
            }

            .el-collapse-item__content {
                padding: 0.01rem; // 设置内容区域的内边距
                font-size: 0.1rem; // 设置内容字体大小
            }
        }
    }
}
</style>