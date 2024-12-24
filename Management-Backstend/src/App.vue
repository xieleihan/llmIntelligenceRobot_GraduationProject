<template>
  <div class="main" :style="{ background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center' }">
    <div class="container">
      <div class="title">SouthAki的LLM情报机器人</div>
      <p class="desc">管理后台</p>
      <div class="inputBox">
        <div class="left">
          <img src="./assets/icon/faqRobot.svg" alt="">
        </div>
        <div class="right">
          <div class="rightTop">
            <el-input v-model="inputUsername" placeholder="请输入管理员账号" class="input" size="small" />
            <el-input v-model="inputPassword" type="password" placeholder="请输入密码" show-password class="input"
              size="small" />
          </div>
          <el-button class="login" type="primary">登录</el-button>
        </div>
      </div>
    </div>
  </div>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import getRandomNumber from './utils/getRandomNumber'

const randomNumber = ref(getRandomNumber(1, 5))
// 动态加载背景图片路径
const bg = new URL(`./assets/images/${randomNumber.value}.jpg`, import.meta.url).href

// 定义变量
const inputUsername = ref('')
const inputPassword = ref('')
</script>

<style lang="scss" scoped>
  @import './style/base.scss';
  .main{
    width: 100dvw;
    height: 100dvh;
    display: flex;
    justify-content: center;
    align-items: center;
    .container{
      width: 50%;
      height: 50%;
      background-color: rgba($color: #fff, $alpha: .8);
      border-radius: $radius;
      padding: .3rem .4rem;
      .title{
        font-size: .2rem;
        font-weight: bold;
        text-align: center;
      }
      .desc{
        font-size: .1rem;
        text-align: center;
      }
      .inputBox{
        width: 100%;
        height: 80%;
        padding: .1rem 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left{
          width: 50%;
          height: 100%;
          img{
            width: 100%;
            height: 100%;
          }
        }
        .right{
          width: 50%;
          height: 100%;
          padding-left: .1rem;
          border-left: .1px solid #ccc;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          align-items: center;
          .input{
            width: 100%;
            height: .4rem;
            font-size: .2rem;
            margin-bottom: .1rem;
            i{
              font-size: .2rem;
              svg{
                width: .2rem !important;
                height: .2rem !important;
              }
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
          .login{
            width: 100%;
            height: .4rem;
            font-size: .2rem;
          }
        }
      }
    }
  }
</style>