// pages/RegisterPages/RegisterPages.ts
import { register, createSvgCode, sendEmailVerifyCode} from '../../api/Modules/general'

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
  intervalId: 0 as number, // 保存页面实例
  /**
   * 页面的初始数据
   */
  data: {
    emailSendVerifyCodeText:"发送验证码",
    isButtonDisabled: false,
    inputusername: '', // 用户名
    inputemail:'', // 邮箱
    inputemailverifycode: '', // 邮箱验证码
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
    if(this.data.inputemail === ''){
      wx.showToast({
        title:"请输入邮箱",
        duration: 2000
      })
      return
    }
    let assectSend = 180; // 初始化倒计时时间
    sendEmailVerifyCode({
      email: this.data.inputemail
    }).then(()=>{
      wx.showToast({
        title:'验证码已经发送',
        duration: 2000
      })
    }).catch((err)=>{
      console.log("发送验证码失败",err)
    })
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
  },

  async changeImg(){
    this.setData({
      img: await createSvg()
    })
    this.setData({
      imgts: await conversion(this.data.img)
    })
  },

  changeInputUsername(event:any){
    this.setData({
      inputusername: event.detail.value
    })
  },

  changeInputEmail(event:any){
    this.setData({
      inputemail: event.detail.value
    })
  },

  changeInputEmailVerifyCode(event:any){
    this.setData({
      inputemailverifycode: event.detail.value
    })
  },

  changeInputPassword(event:any){
    this.setData({
      inputpassword: event.detail.value
    })
  },

  changeInputImgVerifyCode(event:any){
    this.setData({
      inputimgverify: event.detail.value
    })
  },

  registerBtn(){
    if(this.data.inputusername === '' || this.data.inputemail === '' || this.data.inputpassword === '' || this.data.inputemailverifycode === '' || this.data.inputimgverify === ''){
      wx.showToast({
        title: '请检查所有输入框是否已经输入',
        icon: 'error',
        duration: 2000
      })
    }else{
      register({
        username: this.data.inputusername,
        useremail: this.data.inputemail,
        userpassword: this.data.inputpassword,
        email_code: this.data.inputemailverifycode,
        svgCode: this.data.inputimgverify
      }).then((response)=>{
        const str = JSON.stringify(response);
        const obj = JSON.parse(str);
        if(obj.code === 200){
          wx.showToast({
            title:'注册成功',
            duration: 2000
          })
          // 这个地方后续要跳转到login去
          setTimeout(()=>{
            wx.navigateTo({
              url:'/pages/LogninPages/LogninPages'
            })
          },2000)
        }else{
          wx.showToast({
            title: obj.message,
            duration: 2000
          })
        }
      })
      .catch((error)=>{
        wx.showToast({
          title:error.response.data.error,
          duration: 2000
        })
      })
    }
  }
})