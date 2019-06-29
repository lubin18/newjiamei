// pages/diary_details/diary_details.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    name: '',
    titlephoto: '',
    aniStyle: '',
    show: true,
    id: null,
  },
  gono() {
    wx.navigateTo({
      url: '/pages/Diary_content/Diary_content?id=' + this.data.id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var xinxi = wx.getStorageSync('user_xinxi')
    this.setData({
      name: xinxi.nickName,
      titlephoto: xinxi.avatarUrl
    })
    that = this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=diary_list',
      data: {
        id: options.id,
        token: 'rkplnp1552879213'
      },
      success({
        data: {
          data
        }
      }) {
        that.setData({
          list: data,
          id: options.id
        })
      }
    })
  },
  onPageScroll(e) {
    console.log(e.scrollTop)
    if (e.scrollTop >= 200) {
      this.setData({
        aniStyle: 'slidedown',
        show: false,
      })
    } else {
      this.setData({
        aniStyle: 'slideup', 
        show: true,
      })
    }
  },
/**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function() {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function() {

},

/**
 * 生命周期函数--监听页面隐藏
 */
onHide: function() {

},

/**
 * 生命周期函数--监听页面卸载
 */
onUnload: function() {

},

/**
 * 页面相关事件处理函数--监听用户下拉动作
 */
onPullDownRefresh: function() {

},

/**
 * 页面上拉触底事件的处理函数
 */
onReachBottom: function() {

},

/**
 * 用户点击右上角分享
 */
onShareAppMessage: function() {

}
})