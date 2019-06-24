// pages/service/service.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    doctor:[],
    lunbo:[],
    banner: {
     
      indicatorDots: true,
      autoplay: true,
      interval: 4000,
      duration: 500,
      circular:true
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=fuwuindex',
      method: 'GET',
      data: {
        token: 'rkplnp1552879213'
      },
      success: function (e) {
        console.log(e)
        that.setData({
          lunbo: e.data.data.fuwu_lunbo,
          doctor: e.data.data.doctor,
          
        })
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