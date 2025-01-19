<template>
    <el-row class="serverStatus">
        <div class="serverStatusBox">
            <el-row>
                <el-col :span="12">
                    <SystemstatusProgress />
                </el-col>

            </el-row>
        </div>
    </el-row>
</template>

<script setup lang="ts">
import SystemstatusProgress from '../../../components/System/SystemstatusProgress.vue';
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