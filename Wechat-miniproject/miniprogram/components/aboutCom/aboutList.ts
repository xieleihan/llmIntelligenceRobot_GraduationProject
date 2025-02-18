// components/aboutCom/aboutList.ts
Component({

  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    list:[
      {
        "text":"情报文档",
        "icon":"/assets/icon/document.svg",
        "path":"/pages/DocumentPages/DocumentPages"
      },
      {
        "text":"订单详情",
        "icon":"/assets/icon/list.svg"
      },
      {
        "text":"联系我们",
        "icon":"/assets/icon/airport.svg",
      },
      {
        "text":"设置",
        "icon":"/assets/icon/settings.svg",
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goToPages(event:any){
      const path = event.currentTarget.dataset.path;
      console.log(path)
      wx.navigateTo({
        url: path
      })
    }
  }
})