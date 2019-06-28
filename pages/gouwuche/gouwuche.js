// pages/gouwuche/gouwuche.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    check: true,
    zongshu: 0,
    zonger: 0,
    num: false,
    isHide: false,
    footisHide: false,
    carts: [], //数据 
    iscart: false,
    hidden: null,
    isAllSelect: false,
    totalMoney: 0,
    token: app.globalData.token
  },
  //单删
  del: function (e) {
    var that = this
    var did = e.currentTarget.dataset.did;
    var id = e.currentTarget.id;
    wx.showModal({
      'content': '确认删除该商品吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        console.log(did, 'did1')
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=delcar',//后台地址
            method: 'GET',
            data: {
              carid: id,
              token: that.data.token
            },
            success: function (ret) {
              console.log(did,'did2')
              that.data.carts.splice(did, 1);
              that.setData({
                carts: that.data.carts
              });
              console.log(ret, 'jieguo')
              wx.showToast({
                title: '删除' + ret.data.msg,
                icon: 'success',
                duration: 2000
              });
              if (that.data.carts.length==0){
                that.setData({
                  isHide: true,
                  footisHide: false
                })
              }
            },
            fail: function (ret) {

            }
          })
        }
      }
    })
    
  },
  //全删
  delall: function (e) {
    
  },
  //去结算
  topay: function (e) {

  },
  
  show: function () {
    if (this.data.num == false) {
      this.setData({
        num: true
      })
    } else {
      this.setData({
        num: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //啦缓存展示购物车添加的
    // wx.getStorage({
    //   key: 'cart',
    //   success: function (res) {
    //     console.log(res,'xinxi')
    //     // that.setData({
    //     //   shopCarInfo: res.data,
    //     //   shopNum: res.data.shopNum
    //     // });
    //   }
    // })
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
    var that = this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=goodcar',//后台地址
      method: 'GET',
      data: {
        unid: wx.getStorageSync('unionid'),
        token: that.data.token
      },
      success: function (ret) {
        console.log(ret, '商品信息列表')
        that.setData({
          carts: ret.data.data,
        })
        if (ret.data.data == null) {
          console.log(6666)
          that.setData({
            isHide: true,
            footisHide:false
          })
        }else{
          that.setData({
            isHide: false,
            footisHide: true
          })
        }

      },
      fail: function (ret) {

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