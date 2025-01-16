<template>
  <div class="app">
    <router-view />
  </div>
</template>

<script setup lang="ts">
// 导入接口
import { getUserIp } from './api/request';

// 导入Vue
import { onMounted } from 'vue';

// 导入storeToRefs函数
import { storeToRefs } from 'pinia';
// 导入通用信息的Store
import { useGeneralStore } from './store/Modules/generalStore';

// 获取通用信息的state
const Store = useGeneralStore();
// 将通用信息的state转换为ref
const { form } = storeToRefs(Store);

// 获取用户ip
onMounted(() => {
  getUserIp({}).then(res => {
    console.log(res);
    Store.setForm(res.data);
    console.log("pinia存储的数据",form.value);
  });
});
</script>

<style scoped lang="scss">
.app{
  width: 100dvw;
  height: 100dvh;
}
</style>