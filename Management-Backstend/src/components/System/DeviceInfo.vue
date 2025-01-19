<template>
    <el-descriptions title="设备基本信息">
        <el-descriptions-item label="浏览器">
            <img :src="`/src/assets/icon/${getDeviceInfo().browserInfo.browserName}.svg`" />{{
            getDeviceInfo().browserInfo.browserName }}
        </el-descriptions-item>
        <el-descriptions-item label="访问的设备类型">
            <el-tag size="small">{{ getDeviceInfo().deviceType }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="浏览器语言">
            {{ getDeviceInfo().language }}
        </el-descriptions-item>
        <el-descriptions-item label="系统类型">
            <img :src="`/src/assets/icon/${getDeviceInfo().operatingSystem}.svg`" />
            {{ getDeviceInfo().operatingSystem }}
        </el-descriptions-item>
        <el-descriptions-item label="视口大小">
            {{ getDeviceInfo().viewportSize.width }} x {{ getDeviceInfo().viewportSize.height }}
        </el-descriptions-item>
        <el-descriptions-item label="用户访问的IP">
            {{ form.ipinfo.text }}
        </el-descriptions-item>
        <el-descriptions-item label="访问来源">
            {{ form.ipdata.info1 }}--{{ form.ipdata.info2 }}{{ form.ipdata.info3 }}{{ form.ipdata.isp }}
        </el-descriptions-item>
    </el-descriptions>
</template>

<script setup lang="ts">
// 导入工具
import { getDeviceInfo } from '../../utils/index';

// 导入storeToRefs函数
import { storeToRefs } from 'pinia';
// 导入通用信息的Store
import { useGeneralStore } from '../../store/Modules/generalStore';

// 获取通用信息的state
const Store = useGeneralStore();
// 将通用信息的state转换为ref
const { form } = storeToRefs(Store);
</script>

<style scoped lang="scss">

</style>