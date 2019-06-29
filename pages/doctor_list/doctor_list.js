// pages/doctor_list/doctor_list.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    num:null,
    listnav:[],
    doctor:[],
    show:null
  },
  select:function(e,a){
    var id 
    if(e!=""){
      id = e.target.dataset.id
      that.getdoctor(id)
      console.log(id,'e')
    }
    if(e==''){
      id=a
      console.log(id,'a')
      that.getdoctor(id)
    }
  },
  getdoctor(id){
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=doccatgoods',
      data: {
        token: 'rkplnp1552879213',
        catid: id
      },
      success({ data: { data } }) {
        that.setData({
          doctor: data,
          num: id
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=index',
      data: {
        token: 'rkplnp1552879213',
      },
      success({data:{data}}){
        that.setData({
          listnav: data.goods_cat
        })
        that.select("",data.goods_cat[0].id)
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