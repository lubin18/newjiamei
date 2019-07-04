// pages/my/my.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    flag:true,
    style:'../images/jinka.png',
    list1:[],
    appid: app.globalData.appid,
    secret: app.globalData.secret,
    token: app.globalData.token,
    imgUrl:'',
    yushou:0,
    zengzhi: 0,
    jiangli: 0,
    jifen: 0,
    name:'',
    touxiang:''
  },
  
  /**
   * 头像和昵称
   */
  // onGotUserInfo: function (e) {
  //   console.log(e)
  //   // console.log("nickname=" + e.detail.userInfo.nickName);
  //   // console.log(e)
  // },
  /**
   * 二维码弹出于消失
   */
  show:function(){
    
    var appid=that.data.appid;
    var secret = that.data.secret;
    wx.request({
      url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appid + '&secret=' + secret,
      data: {

      },
      success: function (res) {
        console.log(res, 'res')
        var access_token = res.data.access_token;

        // 获取二维码
        wx.request({
          url: 'https://api.weixin.qq.com/wxa/getwxacodeunlimit?access_token=' + access_token,
          method: 'POST',
          responseType: 'arraybuffer',//这个是转化成base64需要加的
          data: {
            // page: 'pages/my/my',
            scene: 'a',//你的参数
            width: '200',
          },
          success: function (res) {
            console.log(res, 'res2')

            //这个是转化成base64（因为微信官方返回给我们的会被解析成乱码）
            that.setData({ imgUrl: wx.arrayBufferToBase64(res.data) })
          },
          fail: function (res) {
            wx.showModal({
              title: '提示',
              content: '请稍后重试',
              showCancel: false,
              success: function (res) {
                console.log(res,'res3')
                if (res.confirm) {

                }
              }
            })
          }
        })
      },
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '请稍后重试',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {

            }
          }
        })
      }
    })





    this.setData({ flag:false})
  },
  hide: function () {
    this.setData({ flag: true })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // options 中的 scene 需要使用 decodeURIComponent 才能获取到生成二维码时传入的 scene
    // console.log(options)
    // var scene = decodeURIComponent(options.scene)
    // console.log(scene)
    // //
    // var query = options.dentistId // 3736
    // console.log(query)
    that=this;
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=sel',
      method: "GET",
      data:{
        token:that.data.token,
        unid: wx.getStorageSync('unionid')
      },
      // header: {
      //   'Content-Type': 'json'
      // },
      success: function (res) {
        console.log(res,'res');
        that.setData({
          list1: res.data.data,
          yushou: res.data.data.balance,
          zengzhi: res.data.data.zzjin,
          jiangli: res.data.data.jlj,
          jifen: res.data.data.total_score,
          name: res.data.data.wechaname,
          touxiang: res.data.data.portrait,

        })
      },
      fail: function () {
        console.log("接口调用失败");
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})