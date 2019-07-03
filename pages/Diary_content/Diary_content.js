// pages/Diary_content/Diary_content.js
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: null,
    pic_img: [],
    navclass: [],
    token: 'rkplnp1552879213',
    id: null,
    day: null,
    centent: null,
    pic_imgs: ''
  },
  bindPickerChange(e) {
    this.setData({
      index: e.detail.value,
    })
  },
  pic() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success(res) {
        console.log(res.tempFilePaths)
        that.setData({
          pic_img: res.tempFilePaths
        })
      },
    })
  },
  subs() {
    var s = 0
    var data = that.data
    if (data.index != null && data.centent != null && data.day != null) {
      wx.showLoading({
        title: '上传中',
        mask:true
      })
      if (that.data.pic_img != '') {
        for (var i = 0; i < that.data.pic_img.length; i++) {
          wx.getFileSystemManager().readFile({
            filePath: that.data.pic_img[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              var a = 'data:image/png;base64,' + res.data;
              that.data.pic_imgs += a + '-'
              s += 1
              that.setData({
                pic_imgs: that.data.pic_imgs
              })
              if (s == that.data.pic_img.length) {
                that.post()
              }
            }
          })
        }
      } else {
        that.post()
      }
    } else{
      wx.showToast({
        title: '请输入完整',
        icon:'none'
      })
    }

  },
  day(e) {
    this.setData({
      day: e.detail.value
    })
  },
  centent(e) {
    this.setData({
      centent: e.detail.value
    })
  },
  post() {
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=sub',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        token: 'rkplnp1552879213',
        unid: wx.getStorageSync('unionid'),
        class_id: that.data.navclass[that.data.index].id,
        book_id: that.data.id,
        content: that.data.centent,
        days: that.data.day,
        imgData: that.data.pic_imgs
      },
      success({
        data
      }) {
        that.setData({
          pic_imgs: ''
        })
        wx.navigateTo({
          url: '/pages/diary_details/diary_details?id=' + that.data.id,
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that = this
    console.log(options)
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=rfen',
      data: {
        token: this.data.token
      },
      success({
        data: {
          data
        }
      }) {
        that.setData({
          navclass: data,
          id: options.id
        })
      }
    })
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