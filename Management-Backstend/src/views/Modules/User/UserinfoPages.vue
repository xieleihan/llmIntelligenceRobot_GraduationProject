<template>
    <div class="userinfoPages">
        <div class="top"></div>
        <div class="main">
            <el-row class="tableBox">
                <el-col :span="24">
                    <UserinfoTable />
                </el-col>
            </el-row>
        </div>
        <div class="bottom">
            <el-pagination size="small" background layout="prev, pager, next" :total="10" class="mt-4" />
        </div>
    </div>
</template>

<script setup lang="ts">
import UserinfoTable from '../../../components/System/UserinfoTable.vue';
</script>

<style scoped lang="scss">
.userinfoPages{
    width: 100%;
    height: 100%;
    overflow: hidden;
    .top{
        width: 100%;
        height: .4rem;
    }
    .main{
        width: 100%;
        height: calc(100% - .8rem);
        .tableBox{
            width: 100%;
            height: 100%;
        }
    }
    .bottom{
        width: 100%;
        height: .4rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    ::v-deep(.el-pagination){
        font-size: .1rem;
        height: 100%;
        .btn-prev,
        .btn-next,
        .number,
        .btn-quicknext,
        .btn-quickprev
        {
            font-size: .1rem;
            width: .3rem;
            height: .3rem;
            min-width: .3rem;
            padding: 0;
            margin: 0 .02rem;
            .el-icon{
                font-size: .1rem;
            }
        }
        
    }
}
</style>