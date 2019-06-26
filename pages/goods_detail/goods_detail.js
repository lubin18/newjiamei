// pages/goods_detail/goods_detail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'',
    num:1,
    kucun:5,
    hide:true,
    hideup:false,
    hidedown: true,
    currentTab:1,
    name:'',
    num:0,
    snum: 1,
    oprice: 0,
    price: 0,
    catid:'',
    mailprice:'',
    good_img:[],
    ddprice:0,
    id:'',
    doclist:[],
    rijilist:[],
    
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
    // 看一下传过来的是什么
    console.log(options);
    // 获取传过来的id
    const id = options.id; // 这个是你的url里面拼的什么字段,就取什么字段

    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=gooddetail',//后台地址
      method: 'GET',
      data: {
        good_id:id,
        token:'rkplnp1552879213'
      },
      success: function (ret) {
        console.log(ret, '商品信息')
        console.log(ret.data.data.good[0].name, 'name')
        that.setData({
          id: options.id,
          name: ret.data.data.good[0].name,
          num: ret.data.data.good[0].num,
          oprice: ret.data.data.good[0].oprice,
          price: ret.data.data.good[0].price,
          catid: ret.data.data.good[0].catid,
          mailprice: ret.data.data.good[0].mailprice,
          good_img: ret.data.data.good_img,
          ddprice: ret.data.data.good[0].ddprice,
          // title: ret.data.data.good[0].name,
        })
        //动态修改页面标题
        wx.setNavigationBarTitle({
          title: ret.data.data.good[0].name,
        })
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
        good_id: that.data.id,
        token: app.globalData.token,
        unid: unionid,
      },
      success: function (e) {
        console.log(e,'日记信息')
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