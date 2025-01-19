<template>
    <div class="SysteminfoPages">
        <el-row v-loading="elLoading" element-loading-text="加载中..." class="row">
            <el-col :span="24">
                <div class="sTop">
                    <div class="sTop-left">
                        <p class="mapTitle">全国用户访问情况图</p>
                        <ChinaMap v-if="loading" class="chinaMap" :list="dataList" />
                    </div>
                    <div class="sTop-right">
                        <div class="top">
                            <TableMap v-if="loading" :list="dataList" />
                        </div>
                        <div class="bottom">
                            <DeviceInfo />
                        </div>
                    </div>
                </div>

            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
// 导入组件
import ChinaMap from '../../../components/System/chinaMap.vue';
import TableMap from '../../../components/System/TableMap.vue';
import DeviceInfo from '../../../components/System/DeviceInfo.vue';

import { ref } from 'vue'

let loading = ref(false)
const elLoading = ref(true)

// 导入网络请求
import { chinaDataList } from '../../../api/request';

const dataList = ref<any[]>([]);

chinaDataList().then(res => {
    console.log(res);
    // @ts-ignore
    const chinaDataList = res.chinaDataList.map((item: any) => {
        return {
            ...item,
            value: item.accessvalue,
            name: item.province,
        };
    });
    dataList.value = chinaDataList;
    loading.value = true
    elLoading.value = false
});

</script>

<style scoped lang="scss">
.SysteminfoPages {
    width: 100%;
    height: 100%;
    overflow-y: scroll;

    .sTop {
        display: flex;

        .sTop-left {
            width: 3.5rem;
            height: fit-content;
            margin-top: .1rem;

            .mapTitle {
                text-align: center;
                font-size: .2rem;
                font-weight: bold;
                margin-bottom: .05rem;
                color: #606266;
            }
        }

        .sTop-right {
            width: calc(100% - 3.5rem);
            height: 3.45rem;

            .top {
                height: 2rem;
                width: 100%;
            }

            .bottom {
                width: 100%;
                height: 1.45rem;
            }
        }
    }
}

::v-deep(.row) {
    .el-loading-mask {
        .el-loading-spinner {
            transform: translateY(-50%);

            .el-loading-text {
                font-size: .1rem;
            }
        }
    }

    .el-descriptions {
        font-size: .1rem;

        .el-descriptions__header {
            margin-bottom: .1rem;

            .el-descriptions__title {
                font-size: .2rem;
            }
        }

        .el-descriptions__cell {
            padding-bottom: .1rem;
            font-size: .14rem;
            line-height: .14rem;

            .el-tag{
                font-size: .1rem;
                line-height: .14rem;
                height: .15rem;
                padding: 0 .05rem;
                border-radius: .03rem;
            }

            .el-descriptions__label {
                margin-right: .1rem;
            }

            .el-descriptions__content {
                img {
                    width: .14rem;
                    height: .14rem;
                }
            }
        }
    }
}
</style>