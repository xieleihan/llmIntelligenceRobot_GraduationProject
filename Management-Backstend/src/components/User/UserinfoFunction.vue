<template>
    <el-row class="userinfoFunction">
        <el-col :span="20">
            <el-row>
                <el-col :span="6">
                    <p>用户信息</p>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="4">
            <el-input
                v-model="inputSearch"
                style="width: 240px"
                placeholder="Type something"
                :prefix-icon="Search"
            />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const inputSearch = ref('');
</script>

<style scoped lang="scss">
.userinfoFunction{
    width: 100%;
    height: 100%;
}
</style>