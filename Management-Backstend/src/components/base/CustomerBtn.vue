<template>
    <div @click="isOpenCustomer" class="customerBtn">
        <img src="../../assets/icon/deepseek.svg" alt="">
    </div>
</template>

<script setup lang="ts">
function isOpenCustomer() {
    console.log('打开客服');
}
</script>

<style scoped lang="scss">
    .customerBtn{
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
        &:hover{
            background-color: #f5f5f5;
        }
        img{
            width: 80%;
            height: 80%;
        }
    }
</style>