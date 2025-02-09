<template>
    <div class="filesMangaement">
        <div class="left">
            <div ref="chartRef" id="nightingale" style="width: 100%;height: 100%;"></div>
        </div>
        <div class="right"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import * as echarts from 'echarts';

const chartRef = ref<HTMLElement | null>(null); // 绑定 DOM 元素

onMounted(() => {
    nextTick(() => {
        if (chartRef.value) {
            const myChart = echarts.init(chartRef.value);
            const option = {
                title: {
                    text: '静态资源文件分布',
                    subtext: '抽取自后端静态文件',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: {
                    left: 'center',
                    top: 'bottom',
                    data: [
                        'rose1',
                        'rose2',
                        'rose3',
                        'rose4',
                        'rose5',
                        'rose6',
                        'rose7',
                        'rose8'
                    ]
                },
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                series: [
                    {
                        name: 'Area Mode',
                        type: 'pie',
                        radius: [20, 140],
                        center: ['50%', '50%'],
                        roseType: 'area',
                        itemStyle: {
                            borderRadius: 5
                        },
                        data: [
                            { value: 30, name: 'rose 1' },
                            { value: 28, name: 'rose 2' },
                            { value: 26, name: 'rose 3' },
                            { value: 24, name: 'rose 4' },
                            { value: 22, name: 'rose 5' },
                            { value: 20, name: 'rose 6' },
                            { value: 18, name: 'rose 7' },
                            { value: 16, name: 'rose 8' }
                        ]
                    }
                ]
            };
            myChart.setOption(option);
        }
    });
});
</script>

<style scoped lang="scss">
.filesMangaement{
    width: 100%;
    height: 100%;
    display: flex;
    .left,
    .right{
        width: 50%;
        height: 100%;
    }
}
</style>