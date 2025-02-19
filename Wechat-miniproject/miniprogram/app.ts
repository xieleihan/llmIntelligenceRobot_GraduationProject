// app.ts
import { getUserIp } from './api/Modules/general';

App({
  globalData: {
    megArrayList:[], // 信息列表
    ipinfo:null, // ip信息
    username:null, // 用户信息
  },
  onLaunch() {
    getUserIp().then((res:any)=>{
      this.globalData.ipinfo = res
    })
  },
  watch(key:any, callback:any) {
    Object.defineProperty(this.globalData, key, {
      configurable: true,
      enumerable: true,
      set(value) {
        this[`_${key}`] = value;
        callback(value);
      },
      get() {
        return this[`_${key}`];
      },
    });
  },
})