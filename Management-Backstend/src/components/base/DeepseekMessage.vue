<template>
    <div class="deepseek">
        <div class="top">
            <img src="../../assets/icon/deepseekLogo.svg" alt="">
        </div>
        <div class="main">
            
        </div>
        <div class="bottom">
            <el-input
                v-model="input"
                placeholder="搜索"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义Vue变量
const input = ref<string>('');
</script>

<style scoped lang="scss">
.deepseek{
    width: 100%;
    height: 100%;
    .top{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba($color: #ccc, $alpha: .8);
        img{
            width: 50%;
            height: 70%;
        }
    }
    .main{
        width: 100%;
        height: 80%;
    }
    .bottom{
        width: 100%;
        height: 10%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ::v-deep(.el-input){
        width: 100%;
        height: 95%;
        padding: 0;
        font-size: .1rem;
        .el-input__wrapper{
            .el-input__inner{
                width: 100%;
                height: 100%;
            }
            padding: 0 .1rem;
            box-shadow: 0 0 0 0.01rem var(--el-input-border-color, var(--el-border-color)) inset;
        }
    }
}
</style>