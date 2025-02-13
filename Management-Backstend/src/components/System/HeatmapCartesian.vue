<template>
    <div class="heatmapCartesian">
        <div
            ref="chartRef"
            style="width: 100%; height: 100%;"
        ></div>
    </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { defineProps, onMounted, ref, onUnmounted, watch, nextTick } from 'vue';

// 定义 props
const props = defineProps<{ msg: any }>();

const chartRef = ref<HTMLDivElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const result = ref<any>(props.msg || null);
let intervalId: any;

// 初始化 ECharts
const initChart = () => {
    if (!chartRef.value) return;
    chartInstance = echarts.init(chartRef.value);
    updateChart();
};

// 更新图表
const updateChart = () => {
    if (!chartInstance || !result.value?.cpu?.cpuUsage) return;

    const cores = result.value.cpu.cpuUsage.map((d: any) => `Core ${d.core}`);
    const usageData = result.value.cpu.cpuUsage.map((d: any) => parseFloat(d.usage));

    const option = {
        tooltip: { trigger: "axis" },
        grid: { left: "10%", right: "10%", bottom: "10%", containLabel: true },
        xAxis: { type: "value", min: 0, max: 100, axisLabel: { formatter: "{value}%" } },
        yAxis: { type: "category", data: cores },
        series: [
            {
                name: "CPU Usage",
                type: "bar",
                data: usageData,
                label: { show: true, position: "right", formatter: "{c}%" },
                itemStyle: { color: "#3398DB" },
            }
        ],
        title: {
            text: "核心状态",
            left: "center",
            top: "5%",
            textStyle: { color: "#333", fontSize: 16, fontWeight: "normal" },
        }
        
    };

    chartInstance.setOption(option);
};

// 监听数据变化
watch(() => props.msg, (newVal) => {
    if (newVal) {
        result.value = newVal;
        updateChart();
    }
}, { deep: true });

// 生命周期
onMounted(() => {
    nextTick(() => {
        initChart();
        intervalId = setInterval(() => {
            result.value = props.msg;
            updateChart();
        }, 5000);
    });
});

onUnmounted(() => {
    clearInterval(intervalId);
    chartInstance?.dispose();
});
</script>

<style scoped lang="scss">
.heatmapCartesian{
    width: 100%;
    height: 100%;
}
</style>