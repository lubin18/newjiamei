// pages/queren/queren.js
var util = require('../../utils/util.js');
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    zonger:0,
    shoukuanfang:'南昌佳美',
    // date:'',
    ordernum:0,
    id:''
  },
fu:function(e){
  console.log(e,'e')
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    console.log(options.id)
    that.setData({
      id: options.id,
     

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // var TIME = util.formatNumber2(new Date());
    // this.setData({
    //   date: TIME,
    // });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
      wx.request({
        url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=payorder',//后台地址
        // header: { "content-type": 'application/x-www-form-urlencoded' },
        method: 'GET',
        data: {
          unid: wx.getStorageSync('unionid'),
          token: app.globalData.token,
          id:that.data.id
        },
        success: function (ret) {
          console.log(ret, 'ret')
          that.setData({
            zonger: ret.data.data[0].price,
            ordernum: ret.data.data[0].orderid,

          })
        },
        fail: function (ret) {
        }
      })
    
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