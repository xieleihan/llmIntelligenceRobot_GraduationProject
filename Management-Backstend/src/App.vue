<template>
  <div 
    class="main" 
    :style="{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }"
  >
    <div class="container">
      <div class="title">SouthAki的LLM情报机器人</div>
      <p class="desc">管理后台</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import getRandomNumber from './utils/getRandomNumber'

const randomNumber = ref(getRandomNumber(1, 5))
// 动态加载背景图片路径
const bg = new URL(`./assets/images/${randomNumber.value}.jpg`, import.meta.url).href
</script>

<style lang="scss" scoped>
  .main{
    width: 100dvw;
    height: 100dvh;
  }
</style>