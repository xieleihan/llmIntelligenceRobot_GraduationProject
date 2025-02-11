<template>
    <div class="lookEditContent" v-html="htmlStr">
        
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { defineProps,toRefs } from 'vue';

const props = defineProps<{
    htmlStr: string
}>();

const { htmlStr } = toRefs(props);

console.log("子组件的htmlStr:", htmlStr.value);
</script>

<style scoped lang="scss">
.lookEditContent{
    width: 100%;
    height: 100%;
    padding: .1rem;
    overflow: auto;
}
</style>