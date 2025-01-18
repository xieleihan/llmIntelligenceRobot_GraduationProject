<template>
    <div class="homeTopCom">
        <div class="left">
            <img src="../../assets/images/peacock_flat.png" alt="logo" class="img">
            <span><span class="signature">SouthAki</span>的LLM情报机器人管理后台</span>
        </div>
        <div class="right">
            <div class="time">
                {{ time }}
            </div>
            <div class="avaterBox">
                <el-dropdown trigger="click">
                    <div class="avater">
                        <img src="../../assets/images/avater.jpg" alt="">
                        <span>Admin,{{ timeWelcomeStr }}好</span>
                    </div>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item>
                                个人信息
                            </el-dropdown-item>
                            <el-dropdown-item>
                                修改密码
                            </el-dropdown-item>

                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </div>
            <div class="power" @click="centerDialogVisible = true">
                <img src="../../assets/icon/power.svg" alt="">
                <span>退出系统</span>
            </div>
        </div>
        <el-dialog v-model="centerDialogVisible" title="Warning" align-center>
            <span>你正在退出系统中,退出后需要进行重新登录,请确认是否继续操作</span>
            <template #footer>
                <div class="dialog-footer">
                    <el-button @click="centerDialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="centerDialogVisible = false">
                        确认
                    </el-button>
                </div>
            </template>
        </el-dialog>
    </div>
</template>

<script setup lang="ts">
// 导入工具
import { parseTime, getNowTime } from '../../utils/index';

// 定义Vue
import { onMounted, onUnmounted, ref } from 'vue';

// 定义Vue变量
const time = ref(parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'))
const timeWelcomeStr = ref('')
const centerDialogVisible = ref(false)

// 定义定时器
const intervalId = setInterval(() => {
    time.value = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}')
}, 1000)

// 生命周期组件加载时
onMounted(() => {
    timeWelcomeStr.value = getNowTime()
})

// 注销定时器
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style scoped lang="scss">
@import '../../style/base.scss';
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

        span{
            font-weight: bold;
            font-size: .13rem;
            .signature{
                font-family: 'signature';
            }
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
            margin-right: .1rem;
            cursor: default;
        }

        .avaterBox {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: .2rem;

            .el-dropdown {

                height: 100%;
                width: 1rem;

            }

            img {
                height: 70%;
                aspect-ratio: 1/1;
                border-radius: 50%;
                border: .01px solid #ccc;
                margin-right: 0.03rem;
            }

            .avater {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;

                span {
                    font-size: .1rem;
                    color: white;
                }
            }
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

    ::v-deep(.el-dialog) {
        width: 3rem;
        height: 1.5rem;
        padding: .1rem;

        .el-dialog__header {
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: .3rem;

            .el-dialog__title {
                font-size: .2rem;
            }

            .el-dialog__headerbtn {
                width: .5rem;
                height: .5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: .5rem;
            }
        }

        .el-dialog__body {
            padding: .1rem;
            font-size: .1rem;
        }

        .el-dialog__footer {
            padding-top: .3rem;

            .dialog-footer {
                .el-button {
                    width: .6rem;
                    height: .2rem;
                    margin-right: .01rem;
                    padding: 0;

                    &:last-child {
                        margin-left: .03rem;
                    }

                    span {
                        font-size: .1rem;
                    }
                }
            }
        }
    }
}
::v-deep(.el-dropdown-menu__item) {
    width: 1rem;
    height: .3rem;
    text-align: center;
    line-height: .3rem;
    font-size: .1rem;
    padding: 0 .1rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>