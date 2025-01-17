<template>
    <table
        class="table"
        rules="rows"
    >
        <thead>
            <tr>
                <th>日期</th>
                <th>名称</th>
                <th>数值</th>
                <th>
                    <el-input
                        v-model="input"
                        placeholder="搜索"
                    />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr
                v-for="(item, index) in dataList as DataItem[]"
                :key="index"
            >
                <td>{{ item.date }}</td>
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
                <td>
                    <div class="functionBox">
                        <el-button>编辑</el-button>
                        <el-button
                            type="primary"
                            size="mini"
                            @click="removeItem(index)"
                        >删除</el-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import { defineProps, ref } from 'vue';

// 搜索框的值
const input = ref<string>('');

// 定义组件的 props
const props = defineProps<{
    list: Array<{ name: string; value: number }>;
}>();

interface DataItem {
    date: string;
    name: string;
    value: number;
}

// 初始化数据
const dataList = ref<DataItem[]>(
    props.list.map(item => ({
        ...item,
        date: new Date().toLocaleDateString(),
    }))
);

// 删除条目方法
const removeItem = (index: number) => {
    dataList.value.splice(index, 1);
};
</script>

<style scoped lang="scss">
.table {
    width: 100%;
    height: 100%;
    display: block;
    position: relative;
    border: .01px solid rgb(221.7, 222.6, 224.4);
    margin-top: .001rem;
    border-radius: .1rem;
    overflow: hidden;

    thead {
        width: 100%;
        display: block;
        height: .3rem;

        tr {
            display: block;

            th {
                display: inline-block;
                width: 25%;
                height: 100%;
                line-height: .3rem;
                text-align: center;

                ::v-deep(.el-input) {
                    width: 80%;
                    height: 100%;

                    .el-input__wrapper {
                        width: 100%;
                        height: 100%;
                        padding: 0 .1rem;
                        font-size: .12rem;
                        box-shadow: (0 0 0 0.01rem var(--el-input-border-color, var(--el-border-color)) inset);

                        .el-input__inner {
                            width: 100%;
                            height: 100%;

                        }
                    }
                }
            }
        }
    }

    tbody {
        width: 100%;
        display: block;
        height: calc(100% - .3rem);
        overflow-y: auto;
        scrollbar-width: none;

        &::-webkit-scrollbar {
            display: none;
        }

        tr {
            display: block;
            height: .3rem;

            &:hover {
                background-color: rgb(221.7, 222.6, 224.4);
                color: #409eff;
            }

            td {
                display: inline-block;
                width: 25%;
                height: 100%;
                line-height: .3rem;
                text-align: center;

                .functionBox {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    height: 100%;
                    width: 100%;
                }

                ::v-deep(.el-button) {
                    padding: 0;
                    width: 45%;
                    height: 70%;
                    font-size: .1rem;
                    line-height: 70%;
                    margin: 0;
                }
            }
        }
    }
}
</style>