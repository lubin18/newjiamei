// pages/cart_account/cart_account.js
var that
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
    zongshu:0,
    zonger:0,
    carts:[],
    name:'',
    tel:'',
    txt:'',
    arrid:'',
    goods:{},
    shuzu:''
  },
  liuyan:function(e){
    // console.log(e,'e')
    that.setData({
      txt:e.detail.value
    })
  },
tijiao:function(){
   wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=submit_order',//后台地址
      header:{"content-type": 'application/x-www-form-urlencoded'},
      method: 'POST',
      data: {
        unid: wx.getStorageSync('unionid'),
        token: app.globalData.token,
        pid: that.data.arrid,//商品pid
        total: that.data.zongshu,//商品总数量
        price: that.data.zonger,//购买总价格
        truename: that.data.name,//用户昵称
        tel: that.data.tel,//用户电话
        comment: that.data.txt,//商品备注
        list: that.data.shuzu,//商品单价

      },
      success: function (ret) {
        console.log(ret, 'ret')
        wx.showToast({
          title: '即将前往支付页面',
          icon:'none'
          // success：function(){

          // }
        })
        wx.navigateTo({
          url: '/pages/queren/queren?id='+ret.data.id+'',
        })
      },
      fail: function (ret) {
        wx.showToast({
          title: '出错啦！',
        })
      }
    })
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    that = this;
    var carts = wx.getStorageSync('goodlist')
    var name = wx.getStorageSync('user_xinxi').nickName
    var tel = wx.getStorageSync('telephone')
    var arrid='';
    for (let i=0;i<carts.length;i++){
      var xid = carts[i].pid + ',';
      arrid += xid
      // arrid.push(carts[i].id);
    }

    var shuzu = '';
    for (let i = 0; i < carts.length; i++) {
      var ppid = carts[i].pid + ',';
      var nnum = carts[i].goodnum + ',';
      var pprice = carts[i].price + ',-';
      shuzu += ppid
      shuzu += nnum
      shuzu += pprice
      // arrid.push(carts[i].id);
    }
    console.log(shuzu, 'shuzu')

    console.log(arrid,'arrid')
    console.log(carts,'carts')
    that.setData({
      carts: carts,
      zongshu: Number(options.zongshu),
      zonger: Number(options.zonger),
      name: name,
      tel:tel,
      arrid: arrid,
      shuzu: shuzu

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