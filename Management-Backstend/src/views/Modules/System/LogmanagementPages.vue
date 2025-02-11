<template>
    <div class="log" v-html="htmlStr">

    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, onUnmounted } from 'vue';
import { getLog } from '../../../api/request';

const htmlStr = ref('<div>Windows PowerShell</div><div>版权所有（C） Microsoft Corporation。保留所有权利。</div><div>安装最新的 PowerShell，了解新功能和改进！https://aka.ms/PSWindows</div><div>PS C:/\\Users/\\Administration/npm run dev</div><br />');

// 使用 Set 存储已添加的日志，防止重复
const logSet = new Set<string>();

function updateLogs() {
    getLog().then((res: any) => {
        // console.log("获取日志:", res);

        // 确保 res 是数组
        if (!Array.isArray(res)) return;

        let newLogs = '';

        res.forEach((item: any) => {
            if (!logSet.has(item)) {
                logSet.add(item);
                newLogs += `<div>${item}</div>`;
            }
        });

        // 只有有新内容时才更新
        if (newLogs) {
            htmlStr.value += newLogs;
        }
    });
}

let intervalId: any;

onMounted(() => {
    intervalId = setInterval(() => {
        updateLogs();
    }, 5000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.log{
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.7);
    color: #fff;
    font-size: .1rem;
    overflow-y: scroll;
    padding: .1rem;
}
</style>