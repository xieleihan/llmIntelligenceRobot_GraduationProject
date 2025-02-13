<template>
    <div class="top">
        <div class="top-item">
            <el-progress type="circle" :percentage="cpuUsage" :color="cpuType" />
            <p class="desc">CPU使用率</p>
        </div>
        <div class="top-item">
            <el-progress type="circle" :percentage="memoryUsage" :color="memoryType" />
            <p class="desc">内存使用率</p>
        </div>
        <div class="top-item">
            <el-progress type="circle" :percentage="40" />
            <p class="desc">显卡占用率</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, defineEmits } from 'vue';

// 使用defineEmits定义事件
const emit = defineEmits(['getIndexContent']);

// 定义Vue变量
const cpuUsage = ref(0);
const cpuType = ref('')
const memoryUsage = ref(0);
const memoryType = ref('')
const object = ref({});

// 导入网络请求
import { getServerStatus } from '../../api/request';

function typeCheck(status: number): string {
    if (status < 50) {
        return '#67C23A'; // 'success'
    } else if (status < 80) {
        return '#E6A23C'; // 'warning'
    } else {
        return '#F56C6C'; // 'danger'
    }
}

function getStatus() {
    getServerStatus().then(res => {
        console.log(res);
        object.value = res;
        // @ts-ignore
        cpuUsage.value = Number(res.cpu.total.split('%')[0]);
        cpuType.value = typeCheck(cpuUsage.value);
        // @ts-ignore
        memoryUsage.value = Number(res.memory.usage.split('%')[0]);
        memoryType.value = typeCheck(memoryUsage.value);
    });
}
let intervalId: any;

const clickChild = async () => {
    // console.log('clickChild');
    let param = await object.value;
    emit('getIndexContent', param);
}

onMounted(async () => {
    await getStatus();
    intervalId = setInterval(async () => {
        await getStatus();
        await clickChild();
    }, 10000);
});

onUnmounted(() => {
    clearInterval(intervalId);
});
</script>

<style scoped lang="scss">
.top {
    width: 100%;
    height: 2rem;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .top-item {
        display: flex;
        flex-direction: column;
        align-items: center;

        .desc {
            margin-top: .1rem;
        }
    }
}
</style>