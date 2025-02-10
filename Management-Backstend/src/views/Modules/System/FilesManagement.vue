<template>
    <div class="filesMangaement">
        <div class="left">
            <div
                ref="chartRef"
                id="nightingale"
                style="width: 100%;height: 100%;"
            ></div>
        </div>
        <div class="right">
            <div class="right-top">
                <div class="descTitle">文件列表</div>
                <section class="content">
                    <TableContent align="center" rules="rows" :data="tableArray" />
                </section>
            </div>
            <div class="right-bottom">
                <div class="descTitle">文件内容详情</div>
                <section class="content">
                    <LookeditContent />
                </section>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, nextTick } from 'vue';
// 导入Echarts
import * as echarts from 'echarts';
// 导入请求
import { getCountFileType } from '../../../api/request';

//绑定DOM元素
const chartRef = ref<HTMLElement | null>(null); // 绑定 DOM 元素

// 创建Vue变量
const resObject = ref<any>({});
const tableArray = ref<any[]>([]);

// 导入组件
import LookeditContent from '../../../components/System/LookeditContent.vue';
import TableContent from '../../../components/System/TableContent.vue';

onMounted(async () => {

    // 请求数据
    await getCountFileType().then(async res => {
        // console.log(res);
        resObject.value = res;
        tableArray.value = res.data.fileDetails;
    });

    await nextTick(() => {
        // console.log(resObject.value);
        // console.log(resObject.value.data.fileCounts);

        const arr = []; // 创建新数组

        // 后端对象遍历
        for (const key in resObject.value.data.fileCounts) {
            arr.push({
                value: resObject.value.data.fileCounts[key],
                name: key
            });
        }

        // 如果存在图表数据
        if (chartRef.value) {
            // 初始化图表
            const myChart = echarts.init(chartRef.value);
            const option = {
                // 标题
                title: {
                    text: '静态资源文件分布',
                    subtext: '抽取自后端静态文件',
                    left: 'center'
                },
                // 提示框
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                // 图例
                legend: {
                    left: 'center',
                    top: 'bottom',
                    // resObject.value中的.fileCounts的key名
                    
                    data: Object.keys(resObject.value.data.fileCounts)
                },
                // 工具箱
                toolbox: {
                    show: true,
                    feature: {
                        mark: { show: true },
                        dataView: { show: true, readOnly: false },
                        restore: { show: true },
                        saveAsImage: { show: true }
                    }
                },
                // 系列
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
                        data: arr
                    }
                ]
            };
            // 使用刚指定的配置项和数据显示图表。
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

    .right{
        border-left: 0.01rem solid #ccc;
        padding: .1rem;
        .right-top,
        .right-bottom{
            width: 100%;
            height: 50%;
            .descTitle{
                font-weight: bold;
                font-size: .1rem;
                line-height: .1rem;
            }
            .content{
                width: 100%;
                height: calc(100% - .1rem);
                overflow-y: auto;
            }
        }
        
    }
}
</style>