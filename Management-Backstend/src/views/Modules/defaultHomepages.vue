<template>
    <div class="defaultHomepages">
        <div class="carousel" :style="{
            background: `url(${bg})`, backgroundSize: 'cover', backgroundPosition: 'center'
        }" >
        </div>
        <div class="devPeople">
            <img class="uwu" src="../../assets/images/vueuwu.png" alt="">
        </div>
        <div class="vue">
            <div class="vue-top">
                <img class="icon" src="/vite.svg" alt="">
                <img class="icon" src="/vue.svg" alt="">
                <img class="icon"
                    src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"
                    alt="">
                <img alt="" src="https://fastly.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg"
                    class="icon">
                <img alt="" src="https://element-plus.org/images/element-plus-logo.svg" class="icon">
            </div>
            <div class="vue-bottom">
                基于Vue3.0+Vite2.0+TS4.0+Element-Plus的后台管理
                <p class="vuewebsite"><span>渐进式</span>JavaScript框架</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import getRandomNumber from '../../utils/getRandomNumber';

const randomNumber = ref(getRandomNumber(1, 5))

// 定义Vue变量
const bg = new URL(`../../assets/images/homeBg/bg_${randomNumber.value}.png`, import.meta.url).href;

</script>

<style scoped lang="scss">
.defaultHomepages {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: relative;

    .carousel {
        width: 100%;
        height: 100%;
        position: absolute;
        z-index: -1;
    }

    .devPeople {
        width: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        .uwu {
            width: 1.8rem;
            height: 1rem;
        }
    }

    .vue {
        width: 50%;
        height: 30%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: rgba($color: #fff, $alpha: .85);
        border-radius: .1rem;

        .vue-top {
            margin-bottom: .1rem;

            .icon {
                width: .4rem;
                height: .4rem;
                margin-right: .1rem;

                &:last-child {
                    margin-right: 0;
                }
            }
        }

        .vue-bottom {
            font-weight: bold;
            font-size: .15rem;
            color: #c0c0c0;

            .vuewebsite {
                font-size: .12rem;
                text-align: center;
                color: black;

                span {
                    -webkit-text-fill-color: transparent;
                    background: -webkit-linear-gradient(315deg, rgb(66, 211, 146) 25%, rgb(100, 126, 255)) text;
                }
            }
        }
    }
}
</style>