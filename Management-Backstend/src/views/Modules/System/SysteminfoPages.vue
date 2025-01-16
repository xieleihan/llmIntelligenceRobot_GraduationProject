<template>
    <div class="SysteminfoPages">
        <div id="china-map" class="chinaMap"></div>
        
    </div>
</template>

<script setup lang="ts">
import { china } from '../../../utils/china.ts';
import * as echarts from 'echarts';
import { onMounted } from 'vue';

function randomValue() {
    return Math.round(Math.random() * 1000);
}

function renderMap() {
    const chartDom = document.getElementById('china-map');
    const myChart = echarts.init(chartDom);

    // @ts-ignore
    echarts.registerMap('china', china);

    const option = {
        tooltip: {
            formatter: (params:any) => {
                return `${params.seriesName}<br />${params.name}：${params.value || 0}`;
            },
        },
        visualMap: {
            min: 0,
            max: 1500,
            left: 'left',
            top: 'bottom',
            text: ['高', '低'],
            inRange: {
                color: ['#fbf8f3', '#94d2a5'],
            },
            show: true,
        },
        geo: {
            map: 'china',
            roam: false,
            zoom: 1.23,
            label: {
                show: true,
                fontSize: 10,
                color: 'rgba(0,0,0,0.7)',
            },
            itemStyle: {
                normal: {
                    borderColor: 'rgba(0, 0, 0, 0.2)',
                },
                emphasis: {
                    areaColor: 'tomato',
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)',
                },
            },
        },
        series: [
            {
                name: '信息量',
                type: 'map',
                geoIndex: 0,
                data: dataList,
            },
        ],
    };

    myChart.setOption(option);
}

const dataList = [
    { name: "南海诸岛", value: 0 },
    { name: '北京', value: randomValue() },
    { name: '天津', value: randomValue() },
    { name: '上海', value: randomValue() },
    { name: '重庆', value: randomValue() },
    { name: '河北', value: randomValue() },
    { name: '河南', value: randomValue() },
    { name: '云南', value: randomValue() },
    { name: '辽宁', value: randomValue() },
    { name: '黑龙江', value: randomValue() },
    { name: '湖南', value: randomValue() },
    { name: '安徽', value: randomValue() },
    { name: '山东', value: randomValue() },
    { name: '新疆', value: randomValue() },
    { name: '江苏', value: randomValue() },
    { name: '浙江', value: randomValue() },
    { name: '江西', value: randomValue() },
    { name: '湖北', value: randomValue() },
    { name: '广西', value: randomValue() },
    { name: '甘肃', value: randomValue() },
    { name: '山西', value: randomValue() },
    { name: '内蒙古', value: randomValue() },
    { name: '陕西', value: randomValue() },
    { name: '吉林', value: randomValue() },
    { name: '福建', value: randomValue() },
    { name: '贵州', value: randomValue() },
    { name: '广东', value: randomValue() },
    { name: '青海', value: randomValue() },
    { name: '西藏', value: randomValue() },
    { name: '四川', value: randomValue() },
    { name: '宁夏', value: randomValue() },
    { name: '海南', value: randomValue() },
    { name: '台湾', value: randomValue() },
    { name: '香港', value: randomValue() },
    { name: '澳门', value: randomValue() },
]

onMounted(() => {
    renderMap();
})
</script>

<style scoped lang="scss">
    .SysteminfoPages{
        width: 100%;
        height: 100%;
        .chinaMap{
            width: 50%;
            height: 100%;
        }
    }
</style>