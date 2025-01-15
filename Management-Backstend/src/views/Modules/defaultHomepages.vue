<template>
    <div class="defaultHomepages">
        <div class="devPeople">
            <img class="uwu" src="../../assets/images/vueuwu.png" alt="">
        </div>
        <div class="vue">
            <div class="vue-top">
                <img class="icon" src="/vite.svg" alt="">
                <img class="icon" src="/vue.svg" alt="">
            </div>
            <div class="vue-bottom">
                基于Vue3.0+Vite2.0+TS4.0+Element-Plus的后台管理
                <p class="vuewebsite"><span>渐进式</span>JavaScript框架</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">

</script>

<style scoped lang="scss">
    .defaultHomepages {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background:url(../../assets/images/homeBg/bg_1.png) no-repeat;
        background-size: cover;
        flex-direction: column;
        .devPeople{
            width: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            
            .uwu {
                    width: 1.8rem;
                    height: 1rem;
                }
        }
        .vue{
            width: 50%;
            height: 30%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            background-color: rgba($color: #fff, $alpha: .85);
            border-radius: .1rem;
            .vue-top{
                margin-bottom: .1rem;
                .icon{
                    width: .4rem;
                    height: .4rem;
                    margin-right: .1rem;
                    &:last-child{
                        margin-right: 0;
                    }
                }
            }
            .vue-bottom{
                font-weight: bold;
                font-size: .15rem;
                color: #c0c0c0;
                .vuewebsite{
                    font-size: .12rem;
                    text-align: center;
                    color: black;
                    span{
                        -webkit-text-fill-color: transparent;
                        background: -webkit-linear-gradient(315deg, rgb(66, 211, 146) 25%, rgb(100, 126, 255)) text;
                    }
                }
            }
        }
    }
</style>