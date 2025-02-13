<template>
    <div class="contactus">
        <!-- 背景 -->
        <canvas
            class="canvas"
            ref="canvasRef"
        ></canvas>
        <div class="content">
            <div class="left">
                <Motion
                    class="motionAvater"
                    :initial="{ scale: 0 }"
                    :animate="{ rotate: 360, scale: 1 }"
                    :transition="{
                        type: 'spring',
                        stiffness: 260,
                        damping: 20,
                        delay: 0.3,
                    }"
                    :hover="{
                        borderRadius: '50%',
                    }"
                />
                <section class="introduce">
                    <div
                        ref="titleRef"
                        class="title"
                    >
                    </div>
                </section>
                <div class="contentBox">
                    <el-button @click="goToPages('https://github.com/xieleihan','url')" type="success">
                        <img :src=GithubSvg alt="">
                        Github
                    </el-button>
                    <el-button @click="goToPages('xieleihan@gmail.com','email')" type="primary">
                        <img :src=EmailSvg alt="">
                        Email
                    </el-button>
                </div>
            </div>
            <div class="right"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, onUnmounted } from 'vue';
// 导入Motion
import { Motion } from 'motion-v';
// 导入打字机
// @ts-ignore
import Typewriter from 'typewriter-effect/dist/core';
// 导入图片svg
import GithubSvg from '../../../assets/icon/github-fill-heigthlight.svg';
import EmailSvg from '../../../assets/icon/Email.svg';

// 获取 canvas DOM 元素
const canvasRef = ref<HTMLCanvasElement | null>(null);
// 获取DOM元素
const titleRef = ref<HTMLElement | null>(null);

// 变量定义
let ctx: CanvasRenderingContext2D | null = null;
const fontSize = 20 * window.devicePixelRatio;
const width = window.innerWidth * window.devicePixelRatio;
const height = window.innerHeight * window.devicePixelRatio;
const columnWidth = fontSize;
const columnCount = Math.floor(width / columnWidth);
const nextChar = new Array(columnCount).fill(0);

// 颜色数组
const colors = [
    '#33b5e5', '#0099cc', '#aa66cc', '#9933cc', '#99cc00',
    '#669900', '#ffbb33', '#ff8800', '#ff4444', '#cc0000'
];

// 生成随机颜色
const getRandomColor = (): string => colors[Math.floor(Math.random() * colors.length)];

// 生成随机字符
const getRandomChar = (): string => {
    const str = 'the quick brown fox jumps over the lazy dog';
    return str[Math.floor(Math.random() * str.length)];
};

// 绘制动画
const draw = () => {
    if (!ctx) return;

    ctx.fillStyle = 'rgba(240,240,240,0.1)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < columnCount; i++) {
        ctx.fillStyle = getRandomColor();
        ctx.font = `${fontSize}px "Roboto Mono"`;
        const x = i * columnWidth;
        const y = (nextChar[i] + 1) * fontSize;

        ctx.fillText(getRandomChar(), x, y);

        if (y > height && Math.random() > 0.99) {
            nextChar[i] = 0;
        }
        nextChar[i]++;
    }
};

let intervalId: number | null = null;

// 初始化画布
onMounted(() => {
    const canvas = canvasRef.value;
    if (canvas) {
        canvas.width = width;
        canvas.height = height;
        ctx = canvas.getContext('2d');

        if (ctx) {
            intervalId = setInterval(draw, 30);
        }
    }
    if (titleRef.value) {
        new Typewriter(titleRef.value, {
            strings: ['Hello','I am a front-end developer','Nice to meet you'],
            autoStart: true,
            loop: true, // 可选，是否循环
        });
    }
});

/**
 * 跳转逻辑
 * @param {String} url 跳转链接 
 * @param {String} type 类型[url,email] 
 */
function goToPages(url: string,type: string) {
    switch (type) {
        case 'url':
            window.open(url);
            break;
        case 'email':
            window.location.href = `mailto:${url}`;
            break;
    }
}

// 组件卸载时清除定时器
onUnmounted(() => {
    if (intervalId !== null) {
        clearInterval(intervalId);
    }
});
</script>

<style scoped lang="scss">
@import '../../../style/base.scss';
.contactus {
    width: 100%;
    height: 100%;
    position: relative;

    .canvas {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: -1;
    }

    .content {
        width: 70%;
        height: 80%;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: rgba($color: #fff, $alpha: .7);
        border-radius: .08rem;
        display: flex;
        align-items: center;

        .left {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            width: 30%;
            height: 90%;
            border-right: .01rem solid #ccc;

            .motionAvater {
                width: 1rem;
                height: 1rem;
                border-radius: .1rem;
                background: url(../../../assets//images/avater.jpg) no-repeat;
                background-size: cover;
                // 发光
                box-shadow: 0 0 1rem .01rem $googleBlue;
            }
            .introduce{
                .title{
                    font-size: .1rem;
                    font-weight: bold;
                }
            }
            .contentBox{
                display: flex;
                flex-direction: column;
                width: 1rem;
            }
        }
        .right{
            width: 70%;
            height: 100%;
        }
    }

    ::v-deep(.el-button) {
        width: 1rem;
        height: .3rem;
        padding: .01rem;
        font-size: .1rem;
        margin: 0;
        margin: .03rem 0;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
            font-size: .1rem;
            line-height: .1rem;
        }
        img {
            width: .1rem;
            height: .1rem;
            margin-right: .03rem;
        }
    }
}
</style>