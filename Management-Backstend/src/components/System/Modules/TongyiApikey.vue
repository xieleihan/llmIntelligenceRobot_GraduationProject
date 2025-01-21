<template>
    <div class="openaiapikeyPages">
        <div class="logo">
            <img src="../../../assets/icon/Tongyi-Qianwen.svg" alt=""><span>Tongyi-Qwen</span>
        </div>
        <div class="distribution">
            <div class="openBox">
                <el-switch v-model="enable" size="small" active-text="Open" inactive-text="Close" />
            </div>
            <div class="inputBox">
                <el-input v-model="baseUrl" placeholder="Please input">
                    <template #prepend>BaseURL:</template>
                </el-input>
                <el-input v-model="api_key" placeholder="Please input">
                    <template #prepend>API_key:</template>
                </el-input>
                <el-button type="primary" plain size="small">替换</el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 定义Vue变量
const baseUrl = ref('chat.openai.com/v1');
const api_key = ref('')
const enable = ref(false)
</script>

<style scoped lang="scss">
.openaiapikeyPages {
    width: 100%;
    height: 100%;
    padding: .1rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    ::v-deep(.distribution) {
        width: 80%;
        height: 80%;
        display: flex;
        flex-direction: column;

        .inputBox {
            display: flex;
            flex-direction: column;
            margin-top: .1rem;
            width: 30%;

            .el-button {
                padding: .05rem .02rem;
                font-size: .1rem;
                line-height: .1rem;
                height: .3rem;
                width: 40%;

            }
        }

        .el-input {
            width: 2rem;
            height: .3rem;
            margin-bottom: .1rem;

            .el-input__wrapper {
                padding: .05rem .1rem;
            }

            .el-input__inner {
                width: 100%;
                height: 100%;
                font-size: .1rem;
            }

            .el-input-group__prepend {
                font-size: .1rem;
                padding: 0 .1rem;
                line-height: .3rem;
            }
        }

        .el-switch--small {
            font-size: .1rem;
            height: .15rem;
            line-height: .15rem;

            .el-switch__label {
                font-size: .1rem;
                height: .15rem;

                span {
                    font-size: .1rem;
                    line-height: .15rem;
                }
            }

            .el-switch__core {
                height: .15rem;
                min-width: .4rem;

                .el-switch__action {
                    width: .1rem;
                    height: .1rem;
                }
            }

            .el-switch__label--left {
                margin-right: .06rem;
            }

            .el-switch__label--right {
                margin-left: .06rem;
            }
        }

        .is-checked {
            .el-switch__action {
                left: calc(100% - .12rem);
            }
        }
    }

    .logo {
        display: flex;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;

        img {
            width: .2rem;
            height: .2rem;
        }

        span {
            font-size: .1rem;
            font-weight: bold;
            margin-left: .1rem;
        }
    }
}
</style>