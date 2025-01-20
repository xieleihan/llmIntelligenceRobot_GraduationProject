<template>
    <el-row class="userinfoFunction">
        <el-col :span="16" style="height: 100%;">
            <el-row class="left">
                <el-col :span="6" class="leftBox">
                    <div class="status">
                        <span class="word">状态:</span>
                        <el-select v-model="value" clearable placeholder="Select">
                            <el-option v-for="item in options" :key="item.value" :label="item.label"
                                :value="item.value" />
                        </el-select>
                    </div>
                </el-col>
                <el-col class="functionbox" :span="12">
                    <div class="flex">
                        <el-switch v-model="isChina" size="small" active-text="海外" inactive-text="国内" />
                        <el-radio-group v-model="radioDataregister">
                            <el-radio value="1" size="large">全部</el-radio>
                            <el-radio value="2" size="large">最近三天</el-radio>
                            <el-radio value="3" size="large">最近一月</el-radio>
                            <el-radio value="4" size="large">最近三月</el-radio>
                        </el-radio-group>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="6">
            <el-input v-model="inputSearch" placeholder="请搜索用户" :prefix-icon="Search" />
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { Search } from '@element-plus/icons-vue';
import { ref } from 'vue';

const value = ref('all')
const isChina = ref(false);// 是否是中国
const radioDataregister = ref('1');// 注册时间
const options = [
    {
        value: 'online',
        label: '在线',
    },
    {
        value: 'offline',
        label: '离线',
    },
    {
        value: 'unknown',
        label: '未知',
    },
    {
        value: 'all',
        label: '全部',
    }
]

const inputSearch = ref('');
</script>

<style scoped lang="scss">
.userinfoFunction {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 .2rem;
    .left{
        height: 100%;
        .status {
            display: flex;
            align-items: center;
            height: 100%;
            .word{
                margin-right: .03rem;
            }
        }
        ::v-deep(.functionbox){
            height: 100%;
            padding: .025rem .1rem;
            display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            .flex{
                display: flex;
                flex-direction: column;
                .el-switch--small{
                    font-size: .1rem;
                    height: 50%;
                    line-height: .15rem;
                    .el-switch__label{
                        font-size: .1rem;
                        height: 100%;
                        span{
                            font-size: .1rem;
                            line-height: .18rem;
                        }
                    }
                    .el-switch__core{
                        height: 90%;
                        min-width: .4rem;
                        .el-switch__action{
                            width: .1rem;
                            height: .1rem;
                        }
                    }
                    .el-switch__label--left{
                        margin-right: .06rem;
                    }
                    .el-switch__label--right{
                        margin-left: .06rem;
                    }
                }
                .is-checked{
                    .el-switch__action {
                            left: calc(100% - .12rem);
                        }
                }
                .el-radio{
                    height: 40%;
                    margin-right: .1rem;
                    .el-radio__inner{
                        width: .1rem;
                        height: .1rem;
                        &::after{
                            width: .05rem;
                            height: .05rem;
                        }
                    }
                    .el-radio__label{
                        font-size: .1rem;
                        padding-left: .04rem;
                    }
                }
            }
        }
    }

}

::v-deep(.el-input) {
    width: 100%;
    height: 80%;

    .el-input__wrapper {
        width: 100%;
        height: 100%;
        padding: .05rem .1rem;
        border-radius: .08rem;
        box-shadow: 0 0 0 0.01rem var(--el-input-border-color, var(--el-border-color)) inset;

        .el-input__inner {
            width: 100%;
            height: 100%;
            font-size: .1rem;
        }
    }

    .el-icon {
        width: .1rem;
        height: .1rem;
        margin-right: .1rem;
    }
}

::v-deep(.el-select) {
    width: 80%;
    height: 60%;

    .el-select__wrapper {
        padding: 0.01rem 0.05rem;
        line-height: .2rem;
        height: 100%;
        min-height: .2rem;
        font-size: .1rem;
        box-shadow: 0 0 0 0.01rem var(--el-input-border-color, var(--el-border-color)) inset;
        border-radius: .08rem;

        .el-select__suffix {
            width: .1rem;
            height: .1rem;

            .el-icon {
                width: .1rem;
                height: .1rem;
            }
        }
    }
}
</style>