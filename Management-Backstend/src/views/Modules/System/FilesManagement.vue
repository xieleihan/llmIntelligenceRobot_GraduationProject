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
                <div class="descTitle">
                    文件列表
                    <div class="box">
                        <input class="inputFileName" type="text" placeholder="输入搜索文件名">
                        <el-button type="danger">删除全部文件</el-button>
                    </div>
                </div>
                <section class="content">
                    <TableContent
                        align="center"
                        rules="none"
                        :data="tableArray"
                        border="0.01rem solid #ccc"
                        @getIndexContent="getIndexContent"
                    />
                </section>
            </div>
            <div class="right-bottom">
                <div class="descTitle">
                    <div class="look">
                        文件内容详情 / <span>{{ filename }}</span><i class="el-icon-delete"></i>
                    </div>
                    <div class="buttonBox">
                        <el-button>编辑文件</el-button>
                        <el-button type="danger">删除文件</el-button>
                    </div>
                </div>
                <section class="content">
                    <LookeditContent
                        v-if="htmlStr"
                        :htmlStr="htmlStr"
                    />
                    <div
                        style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;"
                        v-else
                    >
                        <p>{{ prompt }}</p>
                    </div>
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
import {
    getCountFileType, getFileContent, xmlToHtml,jsonToHtml,txtToHtml,markdownToHtml,pdfToHtml,docxToHtml} from '../../../api/request';

//绑定DOM元素
const chartRef = ref<HTMLElement | null>(null); // 绑定 DOM 元素

// 创建Vue变量
const resObject = ref<any>({}); // 后端对象
const tableArray = ref<any[]>([]); // 表格数组
const htmlStr = ref(''); // html字符串
const filename = ref(''); // 文件名
const prompt = ref('请选择上面的文件进行查看');
const getIndexContent = (val:any) => {
    // console.log("----", val);
    const str = JSON.stringify(val);
    const obj = JSON.parse(str);
    console.log(obj);

    filename.value = obj.fileName;

    switch ((obj.extension).split('.')[1]) {
        case 'md':
            console.log('这是md文件');
            getFileContent(String(obj.fileName)).then(res => {
                console.log("文件内容信息:",res);
                markdownToHtml(res.data).then(res => {
                    console.log("转换后的结果:", res);
                    const str = JSON.stringify(res);
                    const obj = JSON.parse(str);
                    htmlStr.value = obj.result;
                });
            });
            break;
        case 'html':
            console.log('这是html文件');
            getFileContent(String(obj.fileName)).then(res => {
                console.log("文件内容信息:",res);
                const str = JSON.stringify(res);
                const obj = JSON.parse(str);
                htmlStr.value = obj.result;
            });
            break;
        case 'xml':
            console.log('这是xml文件');
            getFileContent(String(obj.fileName)).then(res => {
                console.log("文件内容信息:",res);
                xmlToHtml(res.data).then(res => {
                    console.log("转换后的结果:", res);
                    const str = JSON.stringify(res);
                    const obj = JSON.parse(str);
                    htmlStr.value = obj.result;
                });
            });
            break;
        case 'pdf':
            console.log('pdf');
            pdfToHtml(String(obj.fileName)).then(res => {
                console.log("转换后的结果:", res);
                const str = JSON.stringify(res);
                const obj = JSON.parse(str);
                htmlStr.value = obj.result;
            });
            break;
        case 'txt':
            console.log('这是txt文件');
            getFileContent(String(obj.fileName)).then(res => {
                console.log("文件内容信息:",res);
                txtToHtml(res.data).then(res => {
                    console.log("转换后的结果:", res);
                    const str = JSON.stringify(res);
                    const obj = JSON.parse(str);
                    htmlStr.value = obj.result;
                });
            });
            break;
        case 'json':
            console.log('这是Json文件');
            getFileContent(String(obj.fileName)).then(res => {
                console.log("文件内容信息:",res);
                jsonToHtml(res.data).then(res => {
                    console.log("转换后的结果:", res);
                    const str = JSON.stringify(res);
                    const obj = JSON.parse(str);
                    htmlStr.value = obj.result;
                });
            });
            break;
        case 'docx':
            console.log('docx');
            htmlStr.value = '';
            prompt.value = '暂不支持该文件类型';
            break;
        default:
            console.log('其他');
            htmlStr.value = '';
            prompt.value = '暂不支持该文件类型';
            break;
    }
}

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
@import '../../../style/base.scss';
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
        overflow-y: scroll;

        .right-top{
            .descTitle{
                .inputFileName{
                    border: .01rem solid #ccc;
                    padding: .03rem;
                }
            }
        }

        .right-top,
        .right-bottom{
            width: 100%;
            height: 50%;
            ::v-deep(.descTitle){
                font-weight: bold;
                font-size: .1rem;
                line-height: .1rem;
                margin-bottom: .05rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .look{
                    max-width: 50%;
                    width: 50%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size: .1rem;
                }
                .buttonBox{
                    width: 1.4rem;
                }
                .el-button{
                    font-size: .1rem;
                    padding: .03rem .08rem;
                    height: 100%;
                    border: 0.01rem solid #ccc;
                    margin: 0 .05rem;
                }
            }
            .content{
                width: 100%;
                height: calc(100% - .3rem);
                border: .01rem solid #ccc;
                border-radius: 0.1rem;
                overflow: hidden;
            }
        }
        
    }
}
</style>