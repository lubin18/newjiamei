// pages/xinrijiben/xinrijiben.js
var self;
var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: [],
    tent: [],
    date: '',
    doctor: null,
    doctor_name: '请选择医生',
    aa: "24172",
    photoc: '',
    name: '',
    titlephoto: ''
  },
  pic_photo(e) {
    wx.chooseImage({
      count: 3,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: res => {
        // tempFilePath可以作为img标签的src属性显示图片
        console.log(res.tempFilePaths)
        // const images = self.data.photo.concat(res.tempFilePaths)
        // self.data.photo = images.length <= 3 ? images : images.slice(0, 3)
        self.setData({
          photo: res.tempFilePaths
        })

      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {
    that = this;
    console.log(options)
    console.log(wx.getStorageSync('user_xinxi'))
    var xinxi = wx.getStorageSync('user_xinxi')
    self = this
    // console.log(options.data.split(''))
    // console.log(options.date)
    // console.log(JSON.parse(options.date))
    this.setData({
      tent: JSON.parse(options.tent),
      date: options.date,
      name: xinxi.nickName,
      titlephoto: xinxi.avatarUrl
    })
  },
  upImgs() {

    var s = 0
    if (that.data.doctor != null) {
      //转换成base64位码
      if (that.data.photo.length == 3) {
        for (var i = 0; i < 3; i++) {
          console.log(that.data.photo[i])
          wx.getFileSystemManager().readFile({
            filePath: that.data.photo[i], //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              var a = 'data:image/png;base64,' + res.data;
              that.data.photoc += a + '-'
              s += 1
              that.setData({
                photoc: that.data.photoc
              })
              if (s == 3) {
                that.post()
              }
            }
          })
        }

      } else {
        wx.showToast({
          title: '请上传三张照片',
          icon: 'none',
          duration: 2000
        })
      }
    }else{
      wx.showToast({
        title: '请选择医生',
        icon: 'none',
        duration: 2000
      })
    }
  },
  post() {
    var xmid = ''
    if (this.data.doctor != 0) {
      for (var i = 0; i < this.data.tent.length; i++) {
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        xmid += this.data.tent[i].id + ','
        if (i == this.data.tent.length - 1) {
          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=add_book',
            method: 'post',
            header: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: {
              unid: wx.getStorageSync('unionid'),
              doctor: that.data.doctor,
              time: that.data.date,
              token: 'rkplnp1552879213',
              project: xmid,
              imgData: that.data.photoc
            },
            success(e) {
              wx.hideLoading()
              wx.navigateTo({
                url: '/pages/my_diary/my_diary',
              })
            }
          })
        }
      }
    } else {
      wx.showToast({
        title: '请选择医生',
        icon: 'none',
        duration: 2000
      })
    }
  },
  doctor() {
    wx.navigateTo({
      url: '/pages/list_doctor/list_doctor',
    })
  },
  last(){
    wx.navigateBack({
      delta: 1
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