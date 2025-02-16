// app.ts
import { getUserIp } from './api/Modules/general';

App({
  globalData: {
    megArrayList:[
      // {
      //   type:"user",
      //   content: "这是内容这是内容这内容这是是内容这是内容"
      // },
      // {
      //   type:"system",
      //   content: "这是内容这是内容这是内容这是内容"
      // },
    ], // 信息列表
    ipinfo:null
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