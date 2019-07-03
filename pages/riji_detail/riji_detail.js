// pages/riji_detail/riji_detail.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tent:{},
    recommend:[],
    id:null,
    show:false,
    bookid:null
  },
  del(){
    wx.showLoading({
      title: '删除中',
      mask:true
    })
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=del_book',
      data:{
        token: 'rkplnp1552879213',
        id: this.data.id
      },
      success(){
        wx.hideLoading({
          success(){
            wx.redirectTo({
              url: '/pages/diary_details/diary_details?id=' + that.data.bookid
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    console.log(options)
    this.setData({
      id: options.id,
      bookid: options.bookid
    })
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=diary_details',
      data: {
        id: options.id,
        unid: wx.getStorageSync('unionid'),
        token: 'rkplnp1552879213'
      },
      success({data:{data}}){
        if (data.details.is_show==1){
          that.setData({
            show:true
          })
        }
        that.setData({
          tent:data.details,
          recommend:data.more_diary
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