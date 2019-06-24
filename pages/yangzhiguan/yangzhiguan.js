// pages/yangzhiguan/yangzhiguan.js
var self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentab:0,
    bottom:110,
    show:true,
    aniStyle:"",
    token:'rkplnp1552879213',
    navs:[],
    navtxt:[],
  },
  swichNav:function(e){
    var cur = e.target.dataset.current;
    console.log(cur)
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=yanz',
      data: {
        token: this.data.token,
        class_id: cur
      },
      success({data:{data}} ) {
        console.log(data)
        self.setData({
          currentab: cur,
          navtxt:data
        })
      }
    })
    
    
  },
  onPageScroll(e) {
    console.log(e.scrollTop)
    if (e.scrollTop>=20){   
      this.setData({
        aniStyle: 'slidedown',
        show:false,
      })
    }else{
      this.setData({
        show: true,
        aniStyle:'slideup'
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    self=this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=rfen',
      data: {
        token: this.data.token
      },
      success({data:{data}}) {
        self.navs=data
        self.setData({
          navs: self.navs,
          currentab: data[0].id,
        }) 
        // 进来显示的数据
        wx.request({
          url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=yanz',
          data: {
            token: self.data.token,
            class_id: data[0].id
          },
          success({ data: {data}}) {
            self.setData({
              navtxt:data
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