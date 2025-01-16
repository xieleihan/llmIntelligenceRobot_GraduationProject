<template>
    <table class="table" rules="rows">
        <thead>
            <tr>
                <th>日期</th>
                <th>名称</th>
                <th>数值</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dataList as DataItem[]" :key="index">
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    list: {
        type: Array,
        required: true,
    },
})

interface DataItem {
    date?: string;
    name: string;
    value: number;
}
let dataList = props.list;
(dataList as DataItem[]).forEach((item: DataItem) => {
    item.date = new Date().toLocaleDateString();
})
</script>

<style scoped lang="scss">
.table {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    border: .01px solid rgb(221.7, 222.6, 224.4);
    thead {
        width: 100%;
        display: block;
        height: .3rem;
        tr {
            display: block;

            th {
                display: inline-block;
                width: calc(100% / 3);
                height: 100%;
                line-height: .3rem;
                text-align: center;
            }
        }
    }
    tbody {
        width: 100%;
        display: block;
        height: calc(100% - .3rem);
        overflow-y: auto;
        tr {
            display: block;
            height: .3rem;
            &:hover{
                background-color: rgb(221.7, 222.6, 224.4);
                color: #7c7f85;
            }

            td {
                display: inline-block;
                width: calc(100% / 3);
                height: 100%;
                line-height: .3rem;
                text-align: center;
            }
        }
    }
}
</style>