<template>
    <router-link to="/home" class="returnBtn">
        <ArrowLeft style="width: 2em; height: 2em;color: white;" />
    </router-link>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
.returnBtn {
    width: .5rem;
    height: .5rem;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    position: absolute;
    border: .01rem solid #ccc;
    border-radius: 50%;
    background-color: #409EFF;
}
</style>
