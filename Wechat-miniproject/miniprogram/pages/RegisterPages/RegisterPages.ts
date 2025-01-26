// pages/RegisterPages/RegisterPages.ts
Page({
  intervalId: 0 as number, // 保存页面实例
  /**
   * 页面的初始数据
   */
  data: {
    emailSendVerifyCodeText:"发送验证码",
    isButtonDisabled: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {

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
    clearInterval(this.intervalId)
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

  /**
   * 发送验证码
   */
  sendVerifyCode() {
    if (this.data.isButtonDisabled) return; // 防止重复点击

    let assectSend = 180; // 初始化倒计时时间

    // 禁用按钮
    this.setData({
      isButtonDisabled: true,
      emailSendVerifyCodeText: "请在" + assectSend + "秒后再试"
    });

    // 清除之前的定时器，以防止多个定时器并行工作
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }

    // 启动新的定时器
    this.intervalId = setInterval(() => {
      if (assectSend !== 0) {
        assectSend--;
        this.setData({
          emailSendVerifyCodeText: "请在" + assectSend + "秒后再试"
        });
      } else {
        clearInterval(this.intervalId); // 倒计时结束时清除定时器
        this.setData({
          emailSendVerifyCodeText: "请再次发送",
          isButtonDisabled: false // 倒计时结束后启用按钮
        });
        this.intervalId = 0; // 重置定时器 ID
      }
    }, 1000);
  },

  goToLoginPages(){
    wx.navigateTo({
      url: '/pages/LogninPages/LogninPages'
    })
  }
})