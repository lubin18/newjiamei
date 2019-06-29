// pages/my_diary/my_diary.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  del(e) {
    console.log(e.target.dataset.id)
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=del_diary',
      data:{
        token: 'rkplnp1552879213',
        book_id: e.target.dataset.id
      },
      success(){
        that.getrj()
      }
    })
  },
  getrj(){
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=diary_book_list',
      data: {
        token: 'rkplnp1552879213',
        unid: wx.getStorageSync('unionid')
      },
      success({ data: { data } }) {
        that.setData({
          list: data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
      this.getrj()
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