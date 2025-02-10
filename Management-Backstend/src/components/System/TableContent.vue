<template>
    <div class="tableContent">
        <table
            v-if="data.length > 0"
            :align="align"
            :rules="rules"
        >
            <thead>
                <tr>
                    <th
                        v-for="(key, index) in tableKeys"
                        :key="index"
                    >
                        <span v-if="key === 'fileName'">文件名</span>
                        <span v-else-if="key === 'extension'">扩展名</span>
                        <span v-else-if="key === 'createdTime'">创建时间</span>
                        <span v-else-if="key === 'openUrl'">访问地址</span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr
                    v-for="(item, rowIndex) in data"
                    :key="rowIndex"
                >
                    <td
                        v-for="([key, value], colIndex) in getEntries(item)"
                        :key="colIndex"
                    >
                        <a
                            v-if="key === 'openUrl'"
                            :href="String(value)"
                            target="_blank"
                        >打开文件</a>
                        <span v-else>{{ key === 'createdTime' ? formatTime(value as string) : value }}</span>
                    </td>
                </tr>
            </tbody>
        </table>
        <p v-else>暂无数据</p>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';

const props = defineProps<{
    align: string,
    rules: string,
    data: object[]
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
</script>

<style scoped lang="scss">
.tableContent{
    width: 100%;
    height: 100%;
}
</style>