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

interface formItem {
  ipinfo: {
    type: string,
    text: string,
    cnip: string,
  },
  ipdata: {
    info1: string,
    info2: string,
    info3: string,
    isp: string,
  },
  adcode: {
    o: string,
    p: string,
    c: string,
    n: string,
    r: string,
    a: string,
    i: boolean,
  }
}

// 获取用户ip
onMounted(() => {
  getUserIp({}).then(res => {
    console.log(res);
    const formData: formItem = {
      // @ts-ignore
      ipinfo: res.ipinfo,
      // @ts-ignore
      ipdata: res.ipdata,
      // @ts-ignore
      adcode: res.adcode
    };
    // 将获取到的数据存储到pinia中
    Store.setForm(formData);
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