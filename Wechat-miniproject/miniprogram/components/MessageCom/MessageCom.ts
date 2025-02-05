// components/MessageCom/MessageCom.ts
import {formatTime} from '../../utils/util'

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
    nowTime: '', // 当前时间
    megArrayList:[],
  },

  /**
   * 组件的方法列表
   */
  methods: {

  },

  /**
   * 组件生命周期
   */
  attached(){
    this.setData({
      nowTime: formatTime(new Date())
    })
    const app = getApp();
    this.setData({
      megArrayList:app.globalData.megArrayList
    })

    app.watch("megArrayList",(newValue:any)=>{
      this.setData({
        megArrayList: newValue
      })
    })
  }
})