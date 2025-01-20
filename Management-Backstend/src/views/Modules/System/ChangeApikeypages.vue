<template>
    <div class="changeApi">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
            <el-tab-pane label="OpenAI" name="first">
                <OpenaiApikey />
            </el-tab-pane>
            <el-tab-pane label="Tongyi" name="second">
                <TongyiApikey />
            </el-tab-pane>
            <el-tab-pane label="Deepseek" name="third">
                <DeepseekApikey />
            </el-tab-pane>
            <el-tab-pane label="other" name="fourth">Task</el-tab-pane>
        </el-tabs>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TabsPaneContext } from 'element-plus';

// 导入组件
import OpenaiApikey from '../../../components/System/Modules/OpenaiApikey.vue';
import TongyiApikey from '../../../components/System/Modules/TongyiApikey.vue';
import DeepseekApikey from '../../../components/System/Modules/DeepseekApikey.vue';

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>

<style scoped lang="scss">
.changeApi{
    width: 100%;
    height: 100%;
}
.el-tabs{
    width: 100%;
    height: 100%;
    .el-tab-pane{
        width: 100%;
        height: 100%;
    }
    ::v-deep(.el-tabs__item){
        font-size: .1rem;
        height: .4rem;
        line-height: .4rem;
        padding: 0 .1rem;
    }
    ::v-deep(.el-tabs__header){
        margin-bottom: .1rem;
        .el-tabs__nav-wrap{
            &::after{
                height: .02rem;
            }
            .el-tabs__active-bar{
                height: .02rem;
            }
        }
    }
}
</style>