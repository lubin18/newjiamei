// pages/daifu/daifu.js
var that
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    winHeight: "",//窗口高度
    currentTab: 0, //预设当前项的值
    scrollLeft: 0, //tab标题的滚动条位置
    list:[],
    // dlist: [],
    nodata:false,
    type:'',
    time:[],
    arr1: [],
    arr2: [],
    arr3: [],
  },
  tiao: function (e) {
    console.log(e,'e')
    var id=e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/queren/queren?id='+id,
    })
  },

  shuju2:function(index){
    wx.showLoading({
      title: '加载中',
    })
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=StoreMember&a=orderform',
      method: 'GET',
      data: {
        token: app.globalData.token,
        unid: wx.getStorageSync('unionid')
      },
      success(res) {
        wx.hideLoading()
        console.log(res, 'daifukuan')
        if (res.data.data == null) {
          that.setData({
            nodata: true
          })
        }

        var ntime = '';
        var time1 = [];
        var type1 = [];
        let arr1 = [];
        let arr2 = [];
        let arr3 = [];
        let arr4 = [];
        for (let i = 0; i < res.data.data.length; i++) {
          let type = res.data.data[i].ordertype;
          let time = res.data.data[i].orderid;
          var timej = time.substring(0, time.length - 6);
          var timej2 = timej.substr(0, 4);
          var timej3 = timej.substr(4, 2);
          var timej4 = timej.substr(6, 2);
          var timej5 = timej.substr(8, 2);
          var timej6 = timej.substr(10, 2);
          var timej7 = timej.substr(12, 2);
          ntime = timej2 + '-' + timej3 + '-' + timej4 + ' ' + timej5 + ':' + timej6 + ':' + timej7
          time1.push(ntime)
          type1.push(type)


          if (type == 0) {
            arr1.push(res.data.data[i]);
          } else if (type == 1) {
            arr2.push(res.data.data[i]);
          } else if (type == 2) {
            arr3.push(res.data.data[i]);
          } else if (type == 3) {
            arr4.push(res.data.data[i]);
          }

        }
        console.log(arr1, 'arr1')
        console.log(arr2, 'arr2')
        console.log(arr3, 'arr3')
        console.log(arr4, 'arr4')
        console.log(type1, 'type1')
        if (index == 0) {
          console.log('0')
          that.setData({
            list: res.data.data
          })
        } else if (index == 1) {
          console.log('1')
          that.setData({
            list:arr1
          })
        } else if (index == 2) {
          console.log('2')
          that.setData({
            list:arr2
          })
        } else if (index == 3) {
          console.log('3')
          that.setData({
            list:arr3
          })
        }
        that.setData({
          time: time1,
        })
      }
    })

  },
  // 点击标题切换当前页时改变样式
  clickTab: function (e) {
    var cur = e.currentTarget.dataset.current;
    var index=cur
    if (this.data.currentTab == cur) { return false; }
    else {
      that.shuju2(index)
      that.setData({
        currentTab: cur
      })
    }
  },
  swiperTab: function (e) {
    console.log(e)
    this.setData({
      currentTab: e.detail.current
    });
    var index = e.detail.current
    that.shuju2(index)
    
  },
  //判断当前滚动超过一屏时，设置tab标题滚动条。
  // checkCor: function () {
  //   if (this.data.currentTab > 5) {
  //     this.setData({
  //       scrollLeft: 300
  //     })
  //   } else {
  //     this.setData({
  //       scrollLeft: 0
  //     })
  //   }
  // },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 0;
        // console.log(calc)
        that.setData({
          winHeight: calc
        });
      }
    });
    var index = that.data.currentTab
    that.shuju2(index)

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