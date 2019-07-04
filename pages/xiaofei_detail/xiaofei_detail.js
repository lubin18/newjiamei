// pages/xiaofei_detail/xiaofei_detail.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab:0,
    current:0,
    yiyuan: [],
    xinlinshou: [],
    pei: [],
    pig: [],
    page: 1,
    noMoretip: true,
    chuxian: false,
    nodata1:false,
    nodata2: false,
    nodata3: false,
    nodata4: false,
    token: app.globalData.token,
  },
  shuju: function () {
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=consumption',
      method: 'GET',
      data: {
        unid: wx.getStorageSync('unionid'),
        page: that.data.page,
        token: that.data.token
      },
      success: function (e) {
        wx.hideLoading();
        console.log(e, 'eeeeee')
        if (e.data.data.erp==null){
          that.setData({
            nodata1:true
          })
        }
        if (e.data.data.ling == null){
          that.setData({
            nodata2: true
          })
        } 
         if (e.data.data.pei == null) {
          that.setData({
            nodata3: true
          })
        } 
         if (e.data.data.pig == null) {
          that.setData({
            nodata4: true
          })
        }
        that.setData({
          yiyuan: e.data.data.erp,
          xinlinshou: e.data.data.ling,
          pei: e.data.data.pei,
          pig: e.data.data.pig,
        })
      }
    })
  },
  clickTab:function(e){
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },
  swiperTab:function(e){
    this.setData({
      currentTab: e.detail.current
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that=this
    // var that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
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
    var zhi = Number((this.data.listdetail.length) / 12)
    console.log(zhi)
    if (this.data.page > zhi) {
      wx.hideLoading();
      this.setData({
        noMoretip: false,
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