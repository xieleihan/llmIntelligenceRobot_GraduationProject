<template>
    <div class="homeAside">
        <el-row>
            <el-col :span="24">
                <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened @open="handleOpen"
                    @close="handleClose">
                    <el-sub-menu index="1">
                        <template #title>
                            <span>系统</span>
                        </template>
                        <el-menu-item index="1-1">
                            <router-link to="/home/systemInfo">系统总览</router-link>
                        </el-menu-item>
                        <el-menu-item index="1-2">服务器状态</el-menu-item>
                        <el-menu-item index="1-3">日志管理</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <span>用户管理</span>
                        </template>
                        <el-menu-item index="2-1">用户信息</el-menu-item>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <span>关于</span>
                        </template>
                        <el-menu-item index="3-1">联系我们</el-menu-item>
                        <el-menu-item index="3-2">项目介绍</el-menu-item>
                    </el-sub-menu>
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
</script>

<style scoped lang="scss">
@import '../../style/base.scss';

.homeAside {
    width: 100%;
    height: 100%;
    border-radius: .05rem;
    background-color: white;
    font-size: .01rem;
    border-radius: .05rem;
    overflow: hidden;

    ::v-deep(.el-menu) {
        width: 100%;

        .el-sub-menu,
        .el-menu-item-group {
            width: 100%;

            .el-menu-item-group__title {
                padding: .05rem .05rem;
                width: 100%;
                height: .5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                font-size: .1rem;
                color: black;
            }

            .el-sub-menu__title {
                padding: .05rem .2rem;
                width: 100%;
                height: .5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                span {
                    font-size: .1rem;
                    line-height: .5rem;
                }

                .el-icon {
                    width: .3rem;
                    height: .3rem;
                    font-size: .1rem;
                    line-height: .5rem;
                }

                .el-sub-menu__icon-arrow {
                    right: .01rem;
                }
            }

            .el-menu-item {
                width: 100%;
                height: .5rem;
                padding: .05rem .05rem;
                font-size: .08rem;
                line-height: .5rem;
                padding-left: .3rem;
            }
        }
    }

}
</style>