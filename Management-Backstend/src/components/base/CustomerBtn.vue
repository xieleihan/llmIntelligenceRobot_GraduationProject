<template>
    <div
        @click="isOpenCustomer"
        class="customerBtn"
    >
        <img
            v-if="isDisplayIcon"
            src="../../assets/icon/deepseek.svg"
            alt=""
        >
        <div class="deepseek" v-if="!isDisplayIcon">
            <DeepseekMessage />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 导入组件
import DeepseekMessage from './DeepseekMessage.vue';

// 定义Vue变量
const isDisplayIcon = ref<boolean>(true);

function isOpenCustomer() {
    let btn = document.querySelector('.customerBtn');
    if (btn instanceof HTMLElement) {
        // 添加样式函数
        const expand = () => {
            btn.classList.add('expanded')
            setTimeout(() => {
                isDisplayIcon.value = false;
            }, 1000);
        };
        const collapse = () => {
            btn.classList.remove('expanded')
            isDisplayIcon.value = true;
        };

        // 定义变量存储定时器
        let timeoutId:number;

        // 鼠标移入时清除定时器并展开
        btn.onmousemove = function () {
            expand();
            clearTimeout(timeoutId);
        };

        // 鼠标移出时设置延迟收缩逻辑
        btn.onmouseleave = function () {
            timeoutId = setTimeout(collapse, 1000);
            this.onmousemove = null;
        };
    }
}
</script>

<style scoped lang="scss">
.customerBtn {
    width: .4rem;
    height: .4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: .01px solid #ccc;
    position: absolute;
    bottom: .1rem;
    right: .1rem;
    border-radius: 50%;
    cursor: pointer;
    transition: all .5s;
    overflow: hidden;

    &:hover {
        background-color: #f5f5f5;
        border-radius: .01rem;
    }

    &.expanded {
        width: 2.3rem;
        height: 3rem;
        border-radius: .1rem;
        cursor: default;
    }

    img {
        width: 80%;
        height: 80%;
    }

    .deepseek{
        width: 100%;
        height: 100%;
        background-color: #f5f5f5;
    }
}
</style>