<template>
    <div class="content">
        
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { toRefs, defineProps } from 'vue';

interface UserMessage {
    id: number,
    avater: string;
    username: string;
    time: string;
    desc: string;
    uuid: string;
}

// 定义Vue变量
const props = defineProps<{
    contentMsg?: UserMessage; // 允许 undefined
}>();
const arr = [];

const { contentMsg } = toRefs(props);
arr.push(contentMsg.value);

</script>

<style scoped lang="scss">
.content{
    width: 100%;
    height: 100%;
    padding: .1rem;
}
</style>