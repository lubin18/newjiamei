// pages/xinrijiben/xinrijiben.js
var self;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    photo: "",
    tent: [],
    date: '',
    doctor: 94,
    aa: "24172"
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
          photo: self.data.photo
        })
        //转换成base64位码
        for (var i = 0; i < 3; i++) {
          console.log(res.tempFilePaths[i])
          wx.getFileSystemManager().readFile({
            filePath: res.tempFilePaths[i] , //选择图片返回的相对路径
            encoding: 'base64', //编码格式
            success: res => { //成功的回调
              var a = 'data:image/png;base64,' + res.data;
              self.data.photo+=a+'-'
            }
          })
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function(options) {

    console.log(wx.getStorageSync('unionid'))
    self = this
    // console.log(options.data.split(''))
    // console.log(options.date)
    // console.log(JSON.parse(options.date))
    this.setData({
      tent: JSON.parse(options.tent),
      date: options.date
    })
  },
  upImgs() {
    var that = this;

    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=add_book',
      method: 'post',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: {
        unid: wx.getStorageSync('unionid'),
        doctor: 99,
        time: '2019-6-11',
        token: 'rkplnp1552879213',
        project: that.data.aa,
        imgData: that.data.photo
      },
      success(e) {
        console.log(e)
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