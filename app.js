//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        var unionid = wx.getStorageSync('unionid')
        this.globalData.code = res.code;
        var appid = this.globalData.appid//appid需自己提供，此处的appid我随机编写
        var secret = this.globalData.secret//secret需自己提供，此处的secret我随机编写
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        var code = res.code;//登录凭证
        console.log(code,'code')
        console.log(appid, 'appid')
        console.log(secret, 'secret')
        if (code) {
          //发送请求
          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=get_user&code=' + res.code + '& appid=' + appid + '&secret=' + secret,

            method: 'GET',
            // header: {
            //   'content-type': 'application/json' //默认值
            // },
            success: function (data) {
              console.log('successdata',data)
              wx.setStorageSync('session_key', data.data.data.session_key);
              wx.setStorageSync('openid', data.data.data.openid);
              var session_key = data.data.session_key
              // var unionid = wx.getStorageSync('unionid')
              var telephone = wx.getStorageSync('telephone')
              console.log(data.data.data.session_key, 'session_key')
              console.log(unionid, 'unionid')
              console.log(telephone, 'telephone')
              
              // if (unionid == ''){
              //   console.log(unionid,'unionid为空')
              // } else {
              //   console.log('有unioid')
               
              // }

            }
          })

        } else {
          console.log('获取用户登录态失败！' + r.errMsg)
        }
      }
    })
    
  },
  globalData: {
    userInfo: null,
    code:'',
    appid: 'wxc9abd1fa6b48991f',
    secret: '05e8e8d8f86102907c52fabe142afc4a',
    token:'rkplnp1552879213',
  },
  // ajax封装
  // ajaxData: function (url, data, method, callBack) {
  //   var that = this;
  //   wx.request({
  //     url: url,
  //     data: data,
  //     method: method,
  //     header: {
  //       'content-type': 'application/x-www-form-urlencoded' // 默认值
  //     },
  //     success: function (res){
  //       //console.log(res);
  //       // setTimeout(function () {
  //       //   wx.hideLoading()
  //       // }, 500)
  //       callBack(res);
  //     },
  //     fail: function (res) {
  //       console.log(4)
  //       wx.showToast({
  //         title: '网络开了小差~',
  //       })
  //     },
  //     complete: function (res) {
  //       setTimeout(function () {
  //         wx.hideLoading()
  //       }, 200)
  //     }
  //   })
  // },
})