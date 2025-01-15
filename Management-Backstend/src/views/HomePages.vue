<template>
    <div class="home">
        <div class="container">
            <el-header height=".4rem" class="header">
                <HometopCom />
            </el-header>
            <el-container class="main">
                <el-aside class="aside" width="1.5rem">
                    <HomeasideCom />
                </el-aside>
                <el-main class="content">
                    <HomecontentCom />
                </el-main>
            </el-container>
            <el-footer class="footer" height=".3rem">
                <HomefooterCom />
            </el-footer>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入组件
import HometopCom from '../components/home/HometopCom.vue';
import HomeasideCom from '../components/home/HomeasideCom.vue';
import HomecontentCom from '../components/home/HomecontentCom.vue';
import HomefooterCom from '../components/home/HomefooterCom.vue';


</script>

<style scoped lang="scss">
@import '../style/base.scss';
    .home{
        width: 100dvw;
        height: 100dvh;
        // background: url(../assets/images/homeBg/bg_1.png) no-repeat;
        // background-size: cover;
        .container{
            width: 100%;
            height: 100%;
            .header{
                background-color: #409EFF;
            }
            .main{
                height: calc(100% - .7rem);
                .aside{
                    background-color: #ccc;
                    padding: .05rem .05rem;
                }
                .content{
                    padding: .03rem;

                }

            }
            .footer{
                background-color: #000;
            }
        }
    }
</style>