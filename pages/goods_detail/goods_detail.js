// pages/goods_detail/goods_detail.js
var WxParse = require('../../utils/wxParse/wxParse.js');

const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodid:'',
    title:'',
    num:1,
    kucun:5,
    hide:true,
    hideup:false,
    hidedown: true,
    currentTab:0,
    name:'',
    num:0,
    snum: 1,
    oprice: 0,
    price: 0,
    catid:'',
    mailprice:'',
    good_img:[],
    good_img1:'',
    ddprice:0,
    id:'',
    doclist:[],
    rijilist:[],
    // goodsDetail: {},
    // shopCarInfo: {},
    goods:{},
    str:"",
    project:[],
    url:''
    
  },
  joincar: function (e) {

    var that = this
    var unid = wx.getStorageSync('unionid')
    // wx.getStorage({
    //   key: 'user_xinxi',
    //   success: function (res) {
    //     console.log(res, 'xinxi')
    //     // that.setData({
    //     //   shopCarInfo: res.data,
    //     //   shopNum: res.data.shopNum
    //     // });
    //   }
    // })
    var user_xinxi = wx.getStorageSync('user_xinxi')
    console.log(user_xinxi,'user_xinxi')
    console.log(user_xinxi.nickName, 'user_xinxiname')

    console.log(that.data.snum)  

    var token=app.globalData.token;
    var unid = unid;
    var username = user_xinxi.nickName;
    var pid = that.data.goodid;//商品id
    var goodnum = that.data.snum;//商品数量
    var num = that.data.num;//kucun
    var price = that.data.price;//单价
    var prices = goodnum * price;//总价
    var good_img = that.data.good_img1;
    var name = that.data.name;
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=caradd',//后台地址
      method: 'GET',
      data: {
        token:token,
        unid: unid,
        username: username,
        pid: pid,
        goodnum: goodnum,
        num: num,
        price: price,
        prices: prices,
        good_img: good_img,
        name: name,
        addnum: goodnum
      },
      success: function (ret) {
        console.log(ret.data.msg, '加入购物车反馈信息')
        wx.showToast({
          title: '加入'+ret.data.msg,
            icon: 'success',
            duration: 2000
          });  
      },
      fail: function (ret) {
        
      }
    })

  
  },
  
  zixun:function(e){
    var zixunlink = 'http://vipz1-shbk2.kuaishang.cn/bs/im.htm?cas=57324___883958&fi=72150'
    wx.setStorageSync('link', zixunlink)
    wx.navigateTo({
      url: "/pages/out/out"
    })
  },
  dianji:function(e){
    this.setData({
      hidedown: !(this.data.hidedown),
      hideup: !(this.data.hideup),
      hide: !(this.data.hide)
    })
  },
  jian: function (e) {
    console.log("刚刚您点击了减1");
    var snum = this.data.snum;
    // 总数量-1  
    if (snum >1) {
      this.data.snum--;
    }
    // 将数值与状态写回  
    this.setData({
      snum: this.data.snum
    });
  },
  jia: function (e) {
    console.log("刚刚您点击了加1");
    var snum = this.data.snum;
    // 总数量+1  
    if (snum < this.data.num) {
      this.data.snum++;
    }
    // 将数值与状态写回  
    this.setData({
      snum: this.data.snum
    });
  },
  clickTab:function(e){
    var cur = e.currentTarget.dataset.current;
    if (this.data.currentTab == cur) { return false; }
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
  onLoad: function (options){
    
    var that = this

    //  高度自适应
    wx.getSystemInfo({
      success: function (res) {
        // console.log(res,'122')
        var clientHeight = res.windowHeight,
          clientWidth = res.windowWidth,
          rpxR = 750 / clientWidth;
        var calc = clientHeight * rpxR - 180;
        console.log(calc)
        that.setData({
          winHeight: calc
        })
      }
    })
    // 看一下传过来的是什么
    console.log(options);
    // 获取传过来的id
    const id = options.id; // 这个是你的url里面拼的什么字段,就取什么字段
    that.setData({
      goodid:id
    })
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=gooddetail',//后台地址
      method: 'GET',
      data: {
        good_id:id,
        token:app.globalData.token
      },
      success: function (ret) {
        console.log(ret, '商品信息')
        // console.log(ret.data.data.good[0].name, 'name')
        // console.log(ret.data.data.good[0].intro, 'intro')

        that.setData({
          id: options.id,
          name: ret.data.data.good[0].name,
          num: ret.data.data.good[0].num,
          oprice: ret.data.data.good[0].oprice,
          price: ret.data.data.good[0].price,
          catid: ret.data.data.good[0].catid,
          mailprice: ret.data.data.good[0].mailprice,
          good_img: ret.data.data.good_img,
          good_img1: ret.data.data.good_img[0].image,
          ddprice: ret.data.data.good[0].ddprice,
          // title: ret.data.data.good[0].name,
          str: ret.data.data.good[0].intro
        })
        // console.log(that.data.str,'strrrrrr')
        //动态修改页面标题
        wx.setNavigationBarTitle({
          title: ret.data.data.good[0].name,
        })
        WxParse.wxParse('article', 'html', that.data.str, that, 5);
        that.doctorlist();
       
      },
      fail: function (ret) {
        console.log('获取手机信息失败')
      }
    })
    
    that.rijilist();
    


  },
  //该产品相关医生列表展示
  doctorlist: function () {
    console.log(app.globalData.token)
    var that = this
    console.log(that.data.catid)
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=gooddoc',
      method: 'GET',
      data: {
        good_id: that.data.id,
        token: app.globalData.token,
      },
      success: function (e) {
        console.log(e, '医生信息')
        that.setData({
          doclist:e.data.data,
          
        })
      },
      error: function (e) {

      }
    })
  },
  //该产品相关日记列表展示
  rijilist: function () {
    var that = this
    var unionid = wx.getStorageSync('unionid')
    console.log(unionid,'dsadasd')
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=goodbook',
      method: 'GET',
      data: {
        good_id: that.data.goodid,
        token: app.globalData.token,
        unid: unionid,
      },
      success: function (e) {
        console.log(e,'日记信息')
        that.setData({
          rijilist:e.data.data,
          url: e.data.src
        })
      },
      error: function (e) {

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