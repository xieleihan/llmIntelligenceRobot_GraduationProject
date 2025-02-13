<template>
    <div class="content">
        <keep-alive>
            <div class="item">
                <div class="left">
                    <img v-if="contentMsg" :src="contentMsg.avater" alt="">
                </div>
                <div class="right">
                    <div v-if="contentMsg" class="username">{{ contentMsg.username }}</div>
                    <div v-if="contentMsg" class="usercontent">{{ contentMsg.desc }}</div>
                </div>
            </div>
        </keep-alive>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { toRefs, defineProps } from 'vue';

interface UserMessage {
    id: number,
    avater: string;
    username: string;
    time: string;
    desc: string;
    uuid: string;
}

// 定义Vue变量
const props = defineProps<{
    contentMsg?: UserMessage; // 允许 undefined
}>();
const arr = [];

const { contentMsg } = toRefs(props);
arr.push(contentMsg.value);

</script>

<style scoped lang="scss">
@import "../../../style/base.scss";
.content{
    width: 100%;
    height: 100%;
    padding: .1rem;
    .item{
        width: 100%;
        padding: 0 .1rem;
        display: flex;
        .left{
            width: .15rem;
            height: .15rem;
            margin-right: .08rem;
            border: none;
            img{
                width: .15rem;
                height: .15rem;
                border-radius: 50%;
                border: .01rem solid #ccc;
            }
        }
        .right{
            .username{
                font-weight: bold;
            }
            .usercontent{
                background-color: $googleBlue;
                color: white;
                padding: .05rem;
            }
        }
    }
}
</style>