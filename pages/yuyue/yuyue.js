// pages/yuyue/yuyue.js
var util = require('../../utils/util.js');
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { gender: '男',sid:0},
      { gender: '女', sid: 1, checked: true }
    ],
    gender: "男",
    date: 0,
    time: 0,
    dianbox: [],
    dianbox1: [{ "sname": "南昌佳美", "id": "97" }, { "sname": "武汉佳美", "id": "98" }, { "sname": "广州佳美", "id": "99" }],

    dian: '请选择门店',
    index: 0,
    txt: '',
    phone: 0
  },
  radioChange: function (e) {
    // console.log(e, '性别eee')
    this.setData({
      gender: e.detail.value
    })
  },
  changeDate: function (e) {
    // console.log(e, '改变日期eee')
    this.setData({
      date: e.detail.value
    })
  },
  changetime: function (e) {
    console.log(e, '改变小时eee')
    this.setData({
      time: e.detail.value
    })
  },
  changedian: function (e) {
    // this.data.dianbox[0].id = e.detail.value;
    // console.log(e, '改变门店eee')
    // console.log(this.data.dianbox1[e.detail.value], 'dianbox1de value eee')
    // console.log(this.data.dianbox1[e.detail.value].id, 'id')
    // console.log(this.data.dianbox1[e.detail.value].sname, 'sname')

    this.setData({
      index: this.data.dianbox[e.detail.value].id,
      dian: this.data.dianbox[e.detail.value].sname,
    })
    console.log(e.detail.value, 'value')

  },
  updatevalue: function (e) {
    // console.log(e, '备注eee')
    this.setData({
      txt: e.detail.value
    })
  },
  phone: function (e) {
    // console.log(e, '手机号eee')
    this.setData({
      phone: e.detail.value
    })
  },
  fenlei:function(){
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=getStore',
      // header: {
      //   'Content-Type': 'application/json'// 使用这个不能获取数据
      // },
      method: 'GET',
      data: {
        token: app.globalData.token,
      },
      success: function (e) {
        that.setData({
          dianbox:e.data.data
        })
      }
    })
  },
  yuyue: function (e) {
    var that = this;
    var token = app.globalData.token;
    var datatime = that.data.date;//日期
    var unid = wx.getStorageSync('unionid');
    // var time =;//时间
    var fenlei = that.data.index;//分类门店
    var phone = that.data.phone;//手机号
    var desc = that.data.txt;//描述
    var sex = that.data.gender;//性别
    var time = that.data.time;//时间段
    
    if (phone==''){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }
    if (!(/^1[3456789]\d{9}$/.test(phone))) {
      wx.showToast({
        title: '请输入正确手机号',
        icon: 'none',
        duration: 2000,
      })
       return false;
    } 
    if (datatime == '') {
      wx.showToast({
        title: '请选择日期',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }
    if (time == '请选择时间') {
      wx.showToast({
        title: '请选择时间段',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }
    if (fenlei == 0) {
      wx.showToast({
        title: '请选择门店',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }
   
   
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=addYuyue',
      header: {
        'Content-Type': 'application/json'// 使用这个不能获取数据
      },
      method: 'POST',
      data: {
        token: token,
        datatime: datatime,//日期
        unid: unid,
        Project: fenlei,//分类门店
        Tel: phone,//手机号
        Desc: desc,//描述
        sex: sex,//性别
      },
      success: function (e) {
        console.log(e, 'e')
        wx.showToast({
          title: e.data.msg,
          icon: 'success',
          duration: 2000,
        })
        wx.switchTab({
          url: "/pages/my/my"
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    that.fenlei()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var TIME = util.formatNumber1(new Date());
    this.setData({
      date: TIME,
      time: '请选择时间'
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // this.fenlei()
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