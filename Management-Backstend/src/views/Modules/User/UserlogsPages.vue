<template>
    <div class="userlogs">
        <div class="left">
            <div
                :style="{ backgroundColor: index === selectedIndex ? '#42b983' : '',color:index === selectedIndex ? 'white': 'black' }"
                @click="setIndex(index)"
                class="item"
                v-for="(item,index) in arr"
                :key="index"
            >
                <router-link
                    :to=item.path
                    @click="updataHash(item.path)"
                >{{ item.str }}</router-link>
            </div>
        </div>
        <div class="right">
            <div
                class="content"
                v-if="selectedIndex === -1"
            >
                <div class="desc">我们深知用户的需求就是系统进步的方向</div>
            </div>
            <router-view v-else></router-view>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入Vue
import { ref, onMounted, watch } from 'vue';

// 定义Vue变量
const selectedIndex = ref(-1);
const hash = ref(window.location.hash); 

function setIndex(newIndex: number) {
    selectedIndex.value = newIndex;
}

const arr = [
    { str: "用户反馈", path: '/home/userLog/userFeedback' },
    { str: "用户日志分析", path: '/home/userLog/userAnalysis' }
]

function updataHash(path: string) {
    hash.value = path;
}

onMounted(() => {
    selectedIndex.value = -1;
})

// 监听url变化,如果url变化,则重新设置selectedIndex
watch(hash, (newHash) => {
    if (newHash != '/home/userLog') {
        selectedIndex.value = -1;
    }
});
</script>

<style scoped lang="scss">
@import '../../../style/base.scss';
.userlogs{
    width: 100%;
    height: 100%;
    background-color: rgba($color: #fff, $alpha: .7);
    padding: .1rem;
    display: flex;
    justify-content: space-between;
    .left{
        height: 100%;
        width: 1rem;
        border: .01rem solid #ccc;
        border-radius: .04rem;
        overflow-y: scroll;
        // 隐藏滚动条
        &::-webkit-scrollbar{
            display: none;
        }
        .item{
            width: 100%;
            height: .4rem;
            display: flex;
            justify-content: center;
            align-items: center;
            // background-color: $googleBlue;
            border-bottom: .01rem solid #ccc;
            a{
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }
    .right{
        height: 100%;
        width: calc(100% - 1.08rem);
        border: .01rem solid #ccc;
        .content{
            width: 100%;
            height: 100%;
            background: url('../../../assets/images/4.gif') no-repeat center center;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }
}
</style>