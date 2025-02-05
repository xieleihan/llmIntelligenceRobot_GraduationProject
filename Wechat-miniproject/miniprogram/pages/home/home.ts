// pages/home/home.ts
interface eItem{
  detail:{
    value: string,
    cursor: number,
    keyCode: number
  }
}

Page({
  animation: null as WechatMiniprogram.Animation | null,
  /**
   * 页面的初始数据
   */
  data: {
    isOpenFunctionBox: false, // 是否打开功能框
    animationData:null as WechatMiniprogram.AnimationExportResult | null, // 存储动画对象
    isCloseInfo: true, // 是否关闭信息
    inputMessage: '', // 输入的信息
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.animation = wx.createAnimation({
      duration: 500,
      timingFunction:"ease"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  changeFunctionBox() {
    const { isOpenFunctionBox } = this.data;

    if (!this.animation) return; // 确保 animation 已经初始化

    if (!isOpenFunctionBox) {
      this.setData({ isOpenFunctionBox: true });

      setTimeout(() => {
        this.animation!.width("40%").step();
        this.setData({ animationData: this.animation!.export() });
      }, 50);
    } else {
      this.animation!.width(0).step();
      this.setData({ animationData: this.animation!.export() });

      setTimeout(() => {
        this.setData({ isOpenFunctionBox: false });
      }, 500);
    }
  },

  inputMsg(e:eItem){
    // console.log(e.detail.value);
    if(e.detail.value !== ''){
      this.setData({
        isCloseInfo: false,
        inputMessage: e.detail.value
      })
    }
  },

  sendMsg(){
    const app = getApp();
    app.globalData.megArrayList.push({
      type: 'user',
      content: this.data.inputMessage
    })
    this.setData({
      inputMessage: ''
    })
  }
})