// pages/chong_detail/chong_detail.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listdetail:[],
    page:1,
    noMoretip:true,
    chuxian: false,
    token:app.globalData.token,
    nodata:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  that=this
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  shuju: function () {
    wx.showLoading({
      title: '加载中',
    })
  
  wx.request({
    url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=paywater',
    method: 'GET',
    data: {
      unid: wx.getStorageSync('unionid'),
      page: that.data.page,
      token:that.data.token
    },
    success: function (e) {
      wx.hideLoading();
      if (e.data.data == null) {
        that.setData({
          nodata: true
        })
      }
      console.log(e, 'eeeeee')
      that.setData({
        listdetail:e.data.data
      })
    }
  })
},
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  this.shuju()
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
    var page = this.data.page;  //获取现在页码
    console.log(page, 'page666')
    console.log(this.data.listdetail.length, 'length666')
    var zhi = Number((this.data.listdetail.length)/12)
    console.log(zhi)
    if (this.data.page>zhi){
      wx.hideLoading();
      this.setData({
        noMoretip:false,
        chuxian: true
      })
    }
    if (this.data.noMoretip) {
      page++
      this.setData({			//页码加一，调用函数，获取下一页内容
        page: page
      })
    }
    this.shuju()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})