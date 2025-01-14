<template>
    <div class="homeTopCom">
        <div class="left">
            <img src="../../assets/images/peacock_flat.png" alt="logo" class="img">
            <span>SouthAki的LLM情报机器人管理后台</span>
        </div>
        <div class="right">
            <div class="time">
                {{ time }}
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
import { parseTime } from '../../utils/index';

// 定义Vue
import { onUnmounted, ref } from 'vue';

// 定义Vue变量
const time = ref(parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}'))
const centerDialogVisible = ref(false)

// 定义定时器
const intervalId = setInterval(() => {
    time.value = parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s} 星期{a}')
}, 1000)

// 注销定时器
onUnmounted(() => {
    clearInterval(intervalId)
})
</script>

<style scoped lang="scss">
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
    }

    .right {
        height: 100%;
        display: flex;
        align-items: center;

        .time {
            height: 100%;
            display: flex;
            align-items: center;
            margin-right: .3rem;
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

    ::v-deep(.el-dialog){
        width: 3rem;
        height: 1.5rem;
        padding: .1rem;
        .el-dialog__header{
            padding: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: .3rem;
            .el-dialog__title{
                font-size: .2rem;
            }
            .el-dialog__headerbtn{
                width: .5rem;
                height: .5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                line-height: .5rem;
            }
        }
        .el-dialog__body{
            padding: .1rem;
            font-size: .1rem;
        }
        .el-dialog__footer{
            padding-top: .3rem;
            .dialog-footer{
                .el-button{
                    width: .6rem;
                    height: .2rem;
                    margin-right: .01rem;
                    padding: 0;
                    &:last-child{
                        margin-left: .03rem;
                    }
                    span{
                        font-size: .1rem;
                    }
                }
            }
        }
    }
}
</style>