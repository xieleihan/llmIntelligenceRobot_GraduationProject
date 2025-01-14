<template>
    <div class="homeTopCom">
        <div class="left">
            <img
                src="../../assets/images/peacock_flat.png"
                alt="logo"
                class="img"
            >
            <span>SouthAki的LLM情报机器人管理后台</span>
        </div>
        <div class="right">
            <div class="time">
                {{ time }}
            </div>
            <div class="power">
                <img
                    src="../../assets/icon/power.svg"
                    alt=""
                >
                <span>退出系统</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入工具
import { parseTime } from '../../utils/index';

// 定义Vue
import { onUnmounted, ref } from 'vue';

// 定义Vue变量
const time = ref(parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'))

// 定义定时器
const intervalId = setInterval(() => {
    time.value = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}')
}, 1000)

// 注销定时器
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style scoped lang="scss">
.homeTopCom {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;

    .left {
        height: 100%;
        display: flex;
        align-items: center;

        .img {
            height: 70%;
            aspect-ratio: 1/1;
            margin-right: .08rem;
        }
    }

    .right {
        height: 100%;
        display: flex;
        align-items: center;

        .time {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: .3rem;
        }

        .power {
            height: 100%;
            display: flex;
            align-items: center;
            img {
                width: .15rem;
                height: .15rem;
                margin-right: 0.08rem;
            }
        }
    }
}
</style>