// pages/list_doctor/list_doctor.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:[],
    doctor:[]
  },
  list(e){
    console.log(e.currentTarget.dataset.id)
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=doctor',
      data:{
        id: e.currentTarget.dataset.id,
        token: 'rkplnp1552879213'
      },
      success({data}){
        that.setData({
          doctor:data
        })
      }
    })
  },
  check(e){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];   
    var prevPage = pages[pages.length - 2];  
    prevPage.setData({
      doctor: e.currentTarget.dataset.id,
      doctor_name: e.currentTarget.dataset.name
    })
    wx.navigateBack({
      delta:1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    that = this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=fen',
      data: {
        token: 'rkplnp1552879213'
      },
      success({ data: { data } }) {
        that.setData({
          text: data
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