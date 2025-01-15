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
    { name: '北京市', value: randomValue() },
    { name: '天津市', value: randomValue() },
    { name: '上海市', value: randomValue() },
    { name: '重庆市', value: randomValue() },
    { name: '河北省', value: randomValue() },
    { name: '河南省', value: randomValue() },
    { name: '云南省', value: randomValue() },
    { name: '辽宁省', value: randomValue() },
    { name: '黑龙江省', value: randomValue() },
    { name: '湖南省', value: randomValue() },
    { name: '安徽省', value: randomValue() },
    { name: '山东省', value: randomValue() },
    { name: '新疆维吾尔自治区', value: randomValue() },
    { name: '江苏省', value: randomValue() },
    { name: '浙江省', value: randomValue() },
    { name: '江西省', value: randomValue() },
    { name: '湖北省', value: randomValue() },
    { name: '广西壮族自治区', value: randomValue() },
    { name: '甘肃省', value: randomValue() },
    { name: '山西省', value: randomValue() },
    { name: '内蒙古自治区', value: randomValue() },
    { name: '陕西省', value: randomValue() },
    { name: '吉林省', value: randomValue() },
    { name: '福建省', value: randomValue() },
    { name: '贵州省', value: randomValue() },
    { name: '广东省', value: randomValue() },
    { name: '青海省', value: randomValue() },
    { name: '西藏自治区', value: randomValue() },
    { name: '四川省', value: randomValue() },
    { name: '宁夏回族自治区', value: randomValue() },
    { name: '海南省', value: randomValue() },
    { name: '台湾省', value: randomValue() },
    { name: '香港特别行政区', value: randomValue() },
    { name: '澳门特别行政区', value: randomValue() },
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