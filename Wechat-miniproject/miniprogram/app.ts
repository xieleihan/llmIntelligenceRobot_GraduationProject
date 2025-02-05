// app.ts
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
  },
  onLaunch() {
    
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