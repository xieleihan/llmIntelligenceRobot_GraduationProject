<template>
    <el-row class="serverStatus">
        <div class="serverStatusBox">
            <el-row>
                <el-col :span="12">
                    <SystemstatusProgress @getIndexContent="ClickEven" />
                </el-col>
                <el-col :span="12">
                    <HeatmapCartesian :msg="result" />
                </el-col>
            </el-row>
            <el-row>
                这个可以检查telegram服务器的链接情况
            </el-row>
        </div>
    </el-row>
</template>

<script setup lang="ts">
import SystemstatusProgress from '../../../components/System/SystemstatusProgress.vue'; // 导入服务器状态组件,百分比部分
import HeatmapCartesian from '../../../components/System/HeatmapCartesian.vue';// 导入服务器CPU热力图

// 导入Vue
import { ref } from 'vue';

// 定义Vue变量
const result = ref(null);

const ClickEven = (val:any) => {
    // console.log("父组件接收到的值:", val);
    result.value = val;
    // console.log("------", result.value)
}
</script>

<style scoped lang="scss">
.serverStatus{
    width: 100%;
    height: 100%;
    background-color: #F2F3F5;
    .serverStatusBox{
        width: 100%;
        height: 100%;
    }
}

::v-deep(.el-progress){
    .el-progress__text{
        min-width: .33rem;
    }
}
</style>