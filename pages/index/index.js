//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    
    appid: app.globalData.appid,
    secret: app.globalData.secret,
    // token: app.globalData.token,
    openid: '',
    isHide: true,
    hasUserInfo: false,
    hasphone: false,
    canIUsep: wx.canIUse('button.open-type.getPhoneNumber'),
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    telephone: '',
    paomatext: '目前微信商城在测试阶段，如有需要请咨询客服！！',
    marqueePace: 1,//滚动速度
    marqueeDistance: 0,//初始滚动距离
    size: 28,
    orientation: 'left',//滚动方向
    interval: 10, // 时间间隔

    banner: {
      urlimg: [],
      indicatorDots: false,
      autoplay: true,
      interval: 4000,
      duration: 500,
      circular: true
    },
    zuo:'',
    you: '',
    chang:'',
    goods_cat: [],
    winHeight: '',
    currentTab: 0,
    goods_list: [],
    // page:0,
    isdata: true,
    page: 1,	//商品页码
    noMoretip: false,    //false为有更多数据，true为数据加载完毕
    soucontent:'',
    xinxi:[]
  },
  cunsearch: function(e){
    console.log(e.detail.value)
    var that=this
    that.setData({
      soucontent: e.detail.value
    })
  },
  search: function (e) {
    console.log(e)
    var link ='http://vipz1-shbk2.kuaishang.cn/bs/im.htm?cas=57324___883958&fi=68047'
    wx.setStorageSync('link', link)
    // var a = 'http://vipz1-shbk2.kuaishang.cn/bs/im.htm/'
    wx.navigateTo({
      url:"/pages/out/out"
    })
  
    // wx.request({
    //   url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=index',
    //   method: 'GET',
    //   data: {
    //     token: app.globalData.token,
    //   },
    //   success: function (e) {
    //     console.log(e)
    //   }
    // })
  },
  tiaozhuan:function(e){
    // console.log(e,'点击轮播图信息')
    // console.log(e.currentTarget.dataset.url, '轮播图url')
    var lunbolink = e.currentTarget.dataset.url
    wx.setStorageSync('link', lunbolink)
    wx.navigateTo({
      url: "/pages/out/out"
    })
  },
  onShow: function () {
    // 页面显示 
    var that = this;
    var unionId = wx.getStorageSync('unionid');
    console.log(unionId,'unionId666')
    if (unionId != '') {
      // wx.showTabBar();
      that.setData({
        isHide: false
      })
    } else {
      that.setData({
        isHide: true
      })
      // wx.hideTabBar();
      console.log('8888')
     }
    //首页数据接口调用
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=index',
      method: 'GET',
      data: {
        token: app.globalData.token,
      },
      success: function (e) {
        console.log(e,'轮播图及三个图片')
        // console.log(e.data.data.zuo_img[0].img)
        that.setData({
          urlimg: e.data.data.lunbo_img,
          zuo: e.data.data.zuo_img[0].img,
          you: e.data.data.you_img[0].img,
          chang: e.data.data.chang_img[0].img,
          goods_cat: e.data.data.goods_cat,
          // data_id:
        })
      }
    })
    that.getGoodList();
  },

  // 禁止滑动
  stopTouchMove:function(){
    return false
  },
  // table选项卡点击筛选
  swichNav: function (e) {
    wx.showLoading({
        title: '加载中',
      })
    var that = this;
    console.log(e)
    var cur = e.target.dataset.current;
    var id = e.target.dataset.id;
    this.setData({
      currentTab: cur,
      data_id: id
    })
    console.log(this.data.currentTab, 666)
    console.log(id, 'id')
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
      method: 'GET',
      data: {
        token: app.globalData.token,
        catid: id,
        page: 1
      },
      success: function (e) {
        
        console.log(e, '我是点击标题刷新请求的数据')
        console.log(e.data.data)
        that.setData({
          goods_list: e.data.data,
        })
        wx.hideLoading()
      }
    })


    if (this.data.currentTab == cur) {
      return false;
    } else {
      // wx.showLoading({
      //   title: '加载中',
      // })
      this.setData({
        currentTab: cur,
        data_id: id
      })
    }

  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  //跳转页面详情
  toDetailsTap: function (e) {
    console.log(e)
    wx.navigateTo({
      url: "/pages/goods_detail/goods_detail?id=" + e.currentTarget.dataset.id
    })
  },
  // 加入购物车
  joincar:function(e){
    // console.log(e)
    var gid=e.currentTarget.dataset.gid;
    // console.log(gid)
    var that = this
    var unid = wx.getStorageSync('unionid')
    var user_xinxi = wx.getStorageSync('user_xinxi')
    // console.log(user_xinxi, 'user_xinxi')
    // console.log(user_xinxi.nickName, 'user_xinxiname')
    // console.log(that.data.snum)
    // console.log(that.data.goodid,'pid')
    var token = app.globalData.token;
    var unid = unid;
    var username = user_xinxi.nickName;
    var pid = that.data.goods_list[gid].id;//商品id
    var goodnum = 1;//商品数量
    var num = that.data.goods_list[gid].num;//kucun
    var price = that.data.goods_list[gid].price;//单价
    var prices = goodnum * price;//总价
    var good_img = that.data.goods_list[gid].good_img;
    var name = that.data.goods_list[gid].name;
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=caradd',//后台地址
      //url: 'https://wt.lingdie.com/index.php?g=Port&m=SendMessage&a=index',//后台地址
      method: 'GET',
      data: {
        token: token,
        unid: unid,
        username: username,
        pid: pid,
        goodnum: goodnum,
        num: num,
        price: price,
        prices: prices,
        good_img: good_img,
        name: name,
        addnum:1
      },
      success: function (ret) {
        console.log(ret,'ret')
        // console.log(ret.data.msg, '加入购物车反馈信息')
        wx.showToast({
          title: '加入' + ret.data.msg,
          icon: 'success',
          duration: 2000
        });
      },
      fail: function (ret) {

      }
    })

  },
  onLoad: function () {
    wx.hideTabBar();
    // 页面初次加载，请求第一页数据
    //this.getGoodList(); //请求列表
    // wx.hideTabBar();

    var that = this//不要漏了这句，很重要
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

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          console.log('自行检查')
          wx.showTabBar();

          wx.getUserInfo({
            success: function (res) {
              console.log(res,'res')
              wx.showTabBar();
              that.setData({
                isHide: false
              });
            }
          });
        } else {
          console.log('没授权')
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  // getPhoneNumber: function (e) {
  //   console.log(e)
  //   var that = this;
  //   // var opid = wx.getStorageSync('openid')
  //   var session_key = wx.getStorageSync('session_key')
  //   if (e.detail.errMsg == 'getPhoneNumber:ok') {
  //     //用户按了允许授权按钮
  //     console.log('点击授权手机号')
  //     // var opid = wx.getStorageSync('openid')
  //     var session_key = wx.getStorageSync('session_key')
  //     // console.log(opid)
  //     // console.log(session_key)
  //     wx.request({
  //       url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=get_phone_number',//后台地址
  //       method: 'GET',
  //       data: {
  //         appid: app.globalData.appid,
  //         encryptedData: e.detail.encryptedData,
  //         iv: e.detail.iv,
  //         sessionKey: session_key
  //       },
  //       success: function (ret) {
  //         console.log(ret, '利用getuserinfo获取phone')
  //         console.log(ret.data.data.purePhoneNumber, 'phone初次点击获取')
  //         that.setData({
  //           telephone: ret.data.data.purePhoneNumber,
  //           hasphone: true,
  //         })
  //         wx.setStorageSync('telephone', (ret.data.purePhoneNumber));
  //       },
  //       fail: function (ret) {
  //         console.log('获取手机信息失败')
  //       }
  //     })
  //   }
  // },
  getUserInfo: function (e) {
    console.log(e)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo, '666');
      // var user_xinxi = JSON.stringify(e.detail.userInfo)
      // var user_xinxi =e.detail.userInfo
      var session_key = wx.getStorageSync('session_key')
      // console.log(app.globalData.code,'code')
      // console.log(app.globalData.appid, 'appid')
      // console.log(app.globalData.secret, 'secret')
      wx.request({
        // url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=get_user&code=' + app.globalData.code +'&appid='+app.globalData.appid+'&secret='+app.globalData.secret,
        // url:'https://yx.lingdie.com/app/WechatUserInfo',
        url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=get_phone_number',
        //后台地址
        method: 'GET',
        data: {
          // code: app.globalData.code,
          // // appid: app.globalData.appid,
          // // secret: app.globalData.secret,
          // encryptedData: e.detail.encryptedData,
          // iv: e.detail.iv,
          // session_key: session_key
          appid: app.globalData.appid,
          encryptedData: e.detail.encryptedData,
          iv: e.detail.iv,
          sessionKey: session_key
        },
        success: function (ret) {
          console.log(ret, '利用getuserinfo获取unionid')
          console.log(ret.data.data.unionId, 'unionid初次点击获取')
          var unionId = ret.data.data.unionId;
          // var user_xinxi = JSON.stringify(ret.data)
          var user_xinxi = ret.data.data
          // console.log(user_xinxi,'user_xinxi')
          wx.setStorageSync('unionid', unionId)
          wx.setStorageSync('user_xinxi', user_xinxi)
          //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
          that.setData({
            isHide: false
          });
          wx.showTabBar();
          //向后台库存数据
          var openid = wx.getStorageSync('openid')
          console.log(openid)
          console.log(user_xinxi)
          console.log(unionId)


          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=user_xinxi',
            method: 'GET',
            data: {
              tel:that.data.telephone,
              token: app.globalData.token,
              openid: openid,
              user_xinxi: user_xinxi
            },
            success: function (res) {
              console.log(res, 'ressss')
              // that.setData({
              //   isHide: false
              // });
              wx.showTabBar();
            },
            fail: function (res){
              // console.log('获取用户信息失败')
            }
          })

        },
        fail: function (ret) {
          console.log('获取用户信息失败')
        }
      })
      // //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false
      });
      wx.showTabBar();
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  },

  getGoodList: function () {
    wx.showLoading({
      title: '加载中',
    })
    var page = this.data.page; //获取页码
    var that = this;
    // 发起请求，获取列表列表
    console.log(page, 'page')
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=catgoods',
      method: 'GET',
      data: {
        token: app.globalData.token,
        page: page
      },
      success: function (e) {
        console.log(e, '我是不需要点击就显示的全部商品')
        if (e.data.pages > 8) {

        }
        that.setData({
          goods_list: e.data.data,
        })
        // console.log(that.data.goods_list[2])
        // if (e.data.ec == 200) {
        //   console.log(e.data.ec, 'ec')

        //   var allArr = [];
        //   var initArr = that.data.goodList ? that.data.goodList : [];  //获取已加载的商品
        //   var newArr = e.data.data.goods;	
        // console.log(newArr,'arrary')
        // 			//获取新加载的商品
        //   var lastPageLength = newArr.length;  			//新获取的商品数量
        //   if (page <= 0) {									//如果是第一页
        //     allArr = e.data.data.goods;
        //   } else {
        //     allArr = initArr.concat(newArr);		//如果不是第一页，连接已加载与新加载商品
        //   }
        // if (lastPageLength < 10) {           //如果新加载的一页课程数量小于10，则没有下一页
        //   that.setData({
        //     noMoretip: true,
        //   });
        // }
        // that.setData({
        //   goodList: allArr,
        // })
        // } else {
        //   console.log('shibai')
        //   // wx.showToast({
        //   //   // title: e.data.em, 	 //错误信息
        //   //   icon: 'none',
        //   //   duration: '2000'
        //   // })
        // }

      },
      fail: function () {
        wx.showToast({
          title: '网络错误',
          icon: 'none'
        })
      },
      complete: function () {
        wx.hideLoading();
      }
    });
  },
  // getgooddetail:function(){

  // },
  /**
 * 页面上拉触底事件的处理函数
 */
  onReachBottom: function () {
    var page = this.data.page;  //获取现在页码
    if (!this.data.noMoretip) {
      page++
      this.setData({			//页码加一，调用函数，获取下一页内容
        page: page
      })
      // this.getGoodList();
    }
  }
})
