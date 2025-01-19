<template>
    <table class="table" rules="rows">
        <thead>
            <tr>
                <th>ID</th>
                <th>用户名</th>
                <th>用户Github</th>
                <th>用户IP</th>
                <th>用户地理位置</th>
                <th>用户注册时间</th>
                <th>用户唯一标识符</th>
                <th>操作区</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(item, index) in dataList as DataItem[]" :key="index">
                <td>{{ item.id }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.usergithub }}</td>
                <td>{{ item.userip }}</td>
                <td>{{ item.useraddress }}</td>
                <td>{{ item.userregistertime }}</td>
                <td>{{ item.useruuid }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script setup lang="ts">
import {ref} from 'vue';

interface DataItem {
    id: number;
    username: string;
    usergithub: string;
    userip: string;
    useraddress: string;
    userregistertime: string;
    useruuid: string;
}

const dataList = ref<DataItem[]>([
    {
        id: 1,
        username: 'admin',
        usergithub: 'xieleihan',
        userip: '0.0.0.0',
        useraddress: '中国',
        userregistertime: '2021-10-10',
        useruuid: '1234535436546436542564664646464643',
    },
]);
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
                width: calc(100% / 8);
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
                width: calc(100% / 8);
                height: 100%;
                line-height: .3rem;
                text-align: center;
                text-overflow: ellipsis;
                white-space: nowrap;
                overflow: hidden;

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