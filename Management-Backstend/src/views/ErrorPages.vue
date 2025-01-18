<template>
    <div class="errorPages">
        <ReturnBtn class="returnBtn" />
        <img class="errorIcon" src="../assets/icon/404.svg" alt="">
        <div class="right">
            <h1>404 Error页面</h1>
            <p>你来到无人问津的荒漠</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import ReturnBtn from '../components/base/ReturnBtn.vue';
</script>

<style scoped lang="scss">
    .errorPages{
        width: 100dvw;
        height: 100dvh;
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        .returnBtn{
            top: .2rem;
            left: .3rem;
        }
        .errorIcon{
            width: 2rem;
            height: 2rem;
        }
    }
</style>