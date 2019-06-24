// pages/suoyousp/suoyousp.js
var self
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:0,
    list:[],
    text:[]
  },
se:function(as){
  console.log(as.currentTarget.dataset.hi)
  wx.request({
    url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
    data: {
      token: 'rkplnp1552879213',
      catid: as.currentTarget.dataset.hi
    },
    success({ data: { data } }) {
      self.setData({
        num: as.currentTarget.dataset.hi,
        text:data
      })
    }
  })
  
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this;
    var one;
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=index',
      data:{
        token:'rkplnp1552879213',
      },
      success({data:{data}}){
        one = data.goods_cat
        wx.request({
          url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
          data:{
            catid: data.goods_cat[0].id,
            token: 'rkplnp1552879213'
          }, success({ data: { data } }){
            self.setData({
              list: one,
              text: data
            })
          }
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