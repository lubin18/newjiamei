// pages/chong_detail/chong_detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdetail:[],
    openid:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    console.log(wx.getStorageSync('openid'),'9999')
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=paywater',
      method:'GET',
      data:{
        openid: wx.getStorageSync('openid')
      },
      success:function(e){
        console.log(e,'eee')
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