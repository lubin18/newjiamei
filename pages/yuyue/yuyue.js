// pages/yuyue/yuyue.js
var util = require('../../utils/util.js');
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
      items:[
        {gender:'男',checked:true},
        { gender: '女' }
      ],
      gender:"男",
      date:0,
      time:0,
      dianbox:['南昌佳美','南京佳美'],
      dian:'请选择门店',
      index:0,
      txt:'',
      phone:0
  },
  radioChange:function(e){
    this.setData({
      gender:e.detail.value
    })
  },
  changeDate: function (e) {
    this.setData({
      date: e.detail.value
    })
  },
  changetime:function(e){
    this.setData({
      time: e.detail.value
    })
  },
  changedian:function(e){
    this.setData({
      dian: this.data.dianbox[e.detail.value]
    })
  },
  updatevalue:function(e){
    this.setData({
      txt:e.detail.value
    })
  },
  phone:function(e){
    this.setData({
      phone: e.detail.value
    })
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
    var TIME = util.formatNumber1(new Date());
    this.setData({
      date: TIME,
      time:'请选择时间'
    });
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