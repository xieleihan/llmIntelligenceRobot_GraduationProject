<template>
    <div class="userAnalysis">
        <div
            ref="chartRef"
            style="width: 100%; height: 100%;"
        ></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLDivElement | null>(null);

onMounted(() => {
    if (chartRef.value) {
        const myChart = echarts.init(chartRef.value);
        const option = {
            xAxis: {
                type: 'category',
                data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: [820, 932, 901, 934, 1290, 1330, 1320],
                    type: 'line',
                    smooth: true
                }
            ]
        };
        myChart.setOption(option);
    }
});
</script>

<style scoped lang="scss">
    .userAnalysis{
        width: 100%;
        height: 100%;
    }
</style>