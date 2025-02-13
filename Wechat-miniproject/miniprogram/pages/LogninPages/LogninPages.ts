// pages/LogninPages/LogninPages.ts
import { login, createSvgCode} from '../../api/Modules/general'

// 生成图片验证码
async function createSvg() {
  const response = await createSvgCode()
  return response.data
}

// 图片转码
async function conversion(str:string){
  return "data:image/svg+xml;charset=utf-8,"+encodeURIComponent(str)
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputemail:'', // 邮箱
    inputpassword: '', // 密码
    inputimgverify: '', // 图片验证码
    img:'', // 图片(后端)
    imgts: '', // 处理后的图片
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad() {
    this.setData({
      img: await createSvg(),
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  async onReady() {
    // 对svg进行encodeURLComponent
    this.setData({
      imgts: await conversion(this.data.img)
    })
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

  goToHome(){
    wx.switchTab({
      url:"/pages/home/home"
    })
  },

  goToRegisterPages(){
    wx.navigateTo({
      url: '/pages/RegisterPages/RegisterPages'
    })
  },

  inputUseremail(event:any){
    this.setData({
      inputemail: event.detail.value
    })
  },

  inputPassword(event:any){
    this.setData({
      inputpassword: event.detail.value
    })
  },

  inputImgVerifyCode(event:any){
    this.setData({
      inputimgverify: event.detail.value
    })
  },

  async changeImg(){
    this.setData({
      img: await createSvg()
    })
    this.setData({
      imgts: await conversion(this.data.img)
    })
  },

  loginBtn(){
    if(this.data.inputemail === '' || this.data.inputpassword === '' || this.data.inputimgverify=== ''){
      wx.showToast({
        title:"请填写完整信息",
        duration: 2000
      })
      return
    }

    login({
      useremail: this.data.inputemail,
      userpassword: this.data.inputpassword,
      verifySvgCode: this.data.inputimgverify
    }).then((response)=>{
      const str = JSON.stringify(response);
      const obj = JSON.parse(str);
      if(obj.code === 200){
        wx.showToast({
          title:"登录成功",
          duration: 2000,
          icon: 'success'
        })
        // 定时器,到时间点跳转页面
        wx.switchTab({
          url:"/pages/home/home"
        })
      }else{
        wx.showToast({
          title: response.data.message,
          duration:2000
        })
      }
    })
    .catch((err)=>{
      wx.showToast({
        title:err.response.data.error,
        duration:2000
      })
    })
  }
})