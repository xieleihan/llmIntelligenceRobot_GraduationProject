<template>
    <div class="tableContent">
        <table
            v-if="data.length > 0"
            :align="align"
            class="table"
            :rules="rules"
        >
            <thead class="thead">
                <tr class="tr">
                    <th
                        v-for="(key, index) in tableKeys"
                        :key="index"
                        class="th"
                    >
                        <div
                            :style="{
                                width: '100%',
                                height: '0.3rem'
                            }"
                            v-if="key === 'fileName'"
                        >文件名</div>
                        <div
                            :style="{
                                width: '100%',
                                height: '0.3rem'
                            }"
                            v-else-if="key === 'extension'"
                        >扩展名</div>
                        <div
                            :style="{
                                width: '100%',
                                height: '0.3rem'
                            }"
                            v-else-if="key === 'createdTime'"
                        >创建时间</div>
                        <div
                            :style="{
                                width: '100%',
                                height: '0.3rem'
                            }"
                            v-else-if="key === 'openUrl'"
                        >访问地址</div>
                    </th>
                </tr>
            </thead>
            <tbody class="tbody">
                <tr
                    v-for="(item, rowIndex) in data"
                    :key="rowIndex"
                    class="tr"
                >
                    <td
                        class="td"
                        v-for="([key, value], colIndex) in getEntries(item)"
                        :key="colIndex"
                        :style="{
                            width: `calc(100% / ${tableKeys.length})`,
                            height: '0.3rem'
                        }"
                        @click="getIndexContent(rowIndex)"
                    >
                        <a
                            v-if="key === 'openUrl'"
                            :href="String(value)"
                            target="_blank"
                            class="word"
                        ><el-icon>
                                <Download />
                            </el-icon>下载文件</a>
                        <div
                            class="word"
                            v-else
                        >{{ key === 'createdTime' ? formatTime(value as string) : value }}</div>
                    </td>
                </tr>
            </tbody>
        </table>
        <p
            class="center"
            v-else
        >暂无数据</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, defineEmits } from 'vue';
import { get } from '../../api';

const props = defineProps<{
    align: string,
    rules: string,
    data: object[],
    border: string
}>();

// 计算表头字段
const tableKeys = computed(() => {
    return props.data.length > 0 ? Object.keys(props.data[0]) : ['文件名', '扩展名', '创建时间', '访问地址'];
});

// 格式化时间
const formatTime = (time: string) => {
    return new Date(time).toLocaleString();
};

// 确保 item 是对象，避免 Object.entries() 读取非对象时报错
const getEntries = (item: any) => {
    return typeof item === 'object' && item !== null ? Object.entries(item) : [];
};

// 使用defineEmits()定义一个emits对象，用于触发事件
const emits = defineEmits(['getIndexContent']);

// 获取当前行的内容
const getIndexContent = (index: number) => {
    // console.log(index);
    // 对应行信息
    // console.log(props.data[index]);
    // 触发事件
    emits('getIndexContent', props.data[index]);
};
</script>

<style scoped lang="scss">
.tableContent{
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .table{
        
        height: 100%;
        width: 100%;
        border: none;
        .thead{
            width: 100%;
            height: 0.3rem;
            display: block;
            border: none;
            border-bottom: .01rem solid #000;
            .tr{
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                line-height: .3rem;
                .th{
                    display: block;
                    height: 0.3rem;
                    width: calc(100% / 4);
                }
            }
        }
        .tbody{
            height: calc(100% - .3rem);
            width: 100%;
            overflow: auto;
            display: block;
            .tr{
                &:hover{
                    background-color: #ccc;
                }
                .td{
                    border: none;
                }
            }
            // 隐藏滚动条
            &::-webkit-scrollbar{
                display: none;
            }
        }
    }
    .word{
        max-width: 1rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        
    }
    .td{
        text-align: center;
    }
}
</style>