Page({
  data:{},
  goToLogninPages(){
    wx.navigateTo({
      url:'/pages/LogninPages/LogninPages'
    })
  },
  goToRegisterPages(){
    wx.navigateTo({
      url: '/pages/RegisterPages/RegisterPages'
    })
  }
})