<template>
    <div class="SysteminfoPages">
        <div class="sTop">
            <div class="sTop-left">
                <p class="mapTitle">全国用户访问情况图</p>
                <ChinaMap class="chinaMap" :list="dataList" />
            </div>
            <div class="sTop-right">
                <div class="top">
                    <TableMap :list="dataList" />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
// 导入组件
import ChinaMap from '../../../components/System/chinaMap.vue';
import TableMap from '../../../components/System/TableMap.vue';

function randomValue() {
    return Math.round(Math.random() * 1000);
}

const dataList = [
    { name: "南海诸岛", value: 0 },
    { name: '北京', value: randomValue() },
    { name: '天津', value: randomValue() },
    { name: '上海', value: randomValue() },
    { name: '重庆', value: randomValue() },
    { name: '河北', value: randomValue() },
    { name: '河南', value: randomValue() },
    { name: '云南', value: randomValue() },
    { name: '辽宁', value: randomValue() },
    { name: '黑龙江', value: randomValue() },
    { name: '湖南', value: randomValue() },
    { name: '安徽', value: randomValue() },
    { name: '山东', value: randomValue() },
    { name: '新疆', value: randomValue() },
    { name: '江苏', value: randomValue() },
    { name: '浙江', value: randomValue() },
    { name: '江西', value: randomValue() },
    { name: '湖北', value: randomValue() },
    { name: '广西', value: randomValue() },
    { name: '甘肃', value: randomValue() },
    { name: '山西', value: randomValue() },
    { name: '内蒙古', value: randomValue() },
    { name: '陕西', value: randomValue() },
    { name: '吉林', value: randomValue() },
    { name: '福建', value: randomValue() },
    { name: '贵州', value: randomValue() },
    { name: '广东', value: randomValue() },
    { name: '青海', value: randomValue() },
    { name: '西藏', value: randomValue() },
    { name: '四川', value: randomValue() },
    { name: '宁夏', value: randomValue() },
    { name: '海南', value: randomValue() },
    { name: '台湾', value: randomValue() },
    { name: '香港', value: randomValue() },
    { name: '澳门', value: randomValue() },
]


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
            .top{
                height: 2rem;
                width: 100%;
            }
        }
    }
}
</style>