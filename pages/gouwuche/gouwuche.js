// pages/gouwuche/gouwuche.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    selectedAllStatus: true,
    zongshu: 0,
    zonger: 0,
    num: false,
    isHide: false,
    footisHide: false,
    carts: [], //购物车商品总数据 
    selarr: [],//选择的货物
    iscart: false,
    hidden: null,
    isAllSelect: false,
    isSelect: true,
    totalMoney: 0,
    token: app.globalData.token,
    checkstatus: [],
    // checked:true,
  },
  //点击-
  jian: function (e) {
    var index = e.currentTarget.dataset.jianid;
    console.log(index)
    console.log("刚刚您点击了减1");
    console.log(e)
    var that = this
    var snum = Number(that.data.carts[index].goodnum);//数量
    console.log(snum)
    var thatnum = snum;
    // 总数量-1  
    if (snum > 1) {
      that.data.carts[index].goodnum--;

      //判断当前商品是否被选中
      if (that.data.carts[index].is_checked == true) {
        console.log(that.data.carts, 'carts1')
        var zongjia = Number(that.data.zonger);//拿购物车总价
        var zongshu = Number(that.data.zongshu);//拿购物车商品总数量
        // var thisnum = Number(that.data.carts[index].goodnum);//本条商品数量
        // console.log(zongjia, 'zongjia')
        // console.log(zongshu, 'zongshu')
        // console.log(thisnum, 'thisnum')
        var nzongjia = 0;
        var nzongshu = 0;
        nzongjia = Number(zongjia - Number(1 * that.data.carts[index].price));
        nzongshu = Number(zongshu - 1);
        console.log(nzongjia, 'nzongjia')
        that.setData({
          zonger: nzongjia.toFixed(2),
          zongshu: nzongshu,
        });
      };
      console.log(that.data.carts, 'carts')
    }
    // 将数值与状态写回  
    that.setData({
      carts: that.data.carts
    });
  },
  //点击+
  jia: function (e) {
    var index = e.currentTarget.dataset.jiaid;
    console.log("刚刚您点击了加1");
    var that = this
    var snum = Number(that.data.carts[index].goodnum);//该条商品的数量
    var kcun = Number(that.data.carts[index].num)//该条商品的kucun
    // console.log(kcun, 'kucun')
    // console.log(snum, 'shuliang')
    // console.log(typeof (kcun))
    // 总数量+1  
    if (snum < kcun) {
      that.data.carts[index].goodnum++;

      //判断当前商品是否被选中
      if (that.data.carts[index].is_checked == true) {
        console.log(that.data.carts, 'carts1')
        var zongjia = Number(that.data.zonger);//拿购物车总价
        var zongshu = Number(that.data.zongshu);//拿购物车商品总数量
        console.log(zongjia, 'zongjia')
        var nzongjia = 0;
        var nzongshu = 0;
        nzongjia = Number(zongjia + Number(1 * that.data.carts[index].price));
        nzongshu = Number(zongshu + 1);
        console.log(nzongjia, 'nzongjia')
        that.setData({
          zonger: nzongjia.toFixed(2),
          zongshu: nzongshu,

        });
      };
      console.log(that.data.carts, 'carts')

    }
    // 将数值与状态写回  
    that.setData({
      carts: that.data.carts
    });
    console.log(that.data.carts, 'carts')
  },
  focusNum(e) {
    // 手动输入时获取基础数据
    this.triggerEvent('StepperEvent', {
      action: 'getNum',
      num: Number(e.detail.value)
    });
    console.log(e,'e1')
  },
  blurNum(e) {
    console.log(e, 'e2')
    // 失去焦点，改变状态
    // this.setData({
    //   change: false
    // });
    // 购物篮失去焦点，商品数为0则清空
    let myEventDetail = {}
    let goodsId = e.currentTarget.dataset.goodsid;
    myEventDetail = {
      goodsId: goodsId,
      action: 'blur'
    };
    this.triggerEvent('StepperEvent', myEventDetail)
  },
  //input输入修改
  // gai: function (e) {
  //   var index = e.currentTarget.dataset.gaiid;
  //   var that = this
  //   var snum = Number(that.data.carts[index].goodnum);//数量
  //   var nsnum = Number(e.detail.value);//修改填写的值
  //   var kcun = Number(that.data.carts[index].num);//库存
  //   console.log(snum, '数量')
  //   console.log(nsnum, '输入的值')
  //   console.log(kcun, '库存')

  //   if (nsnum > kcun || nsnum < 1) {
  //     wx.showToast({
  //       title: '填写正确数量',
  //       icon: 'none',
  //       duration: 2000
  //     });
  //     console.log('jinlaile1')
  //     that.setData({
  //       carts: that.data.carts
  //     });
  //   } else {
  //     console.log('jinlaile2')
  //     that.data.carts[index].goodnum = Number(e.detail.value);//拿到最新输入的数量值放进数组
  //     //判断当前商品是否被选中
  //     // if (that.data.carts[index].is_checked == true) {
  //     //   console.log(that.data.carts, 'carts1')
  //     //   var zongjia = Number(that.data.zonger);//拿购物车总价
  //     //   var shuliang = Number(that.data.carts[index].goodnum);//拿输入框内的数量
  //     //   console.log(shuliang,'shuliang')
  //     //   console.log(zongjia, 'zongjia')
  //     //   var nzongjia = 0;
  //     //   // nzongjia = Number(zongjia + Number(1 * that.data.carts[index].price));
  //     //   nzongjia = Number(zongjia+shuliang * that.data.carts[index].price);
  //     //   console.log(nzongjia, 'nzongjia')
  //     //   that.setData({
  //     //     zonger: nzongjia.toFixed(2),
  //     //   });
  //     // };
  //   }
  //   console.log(that.data.carts, 'carts')
  // },
  //选中的相关逻辑
  checkboxChange: function (e) {
    var that = this;
    var i = 0;
    console.log(e, 'e')
    // that.data.carts[e.target.dataset.checkid].checked=false;
    // console.log(that.data.carts[e.target.dataset.checkid],'6666')

    if (e.detail.value.length == 1) {//说明选中

      var checkid = e.target.dataset.checkid;
      that.data.carts[checkid].is_checked = true;
      // console.log(ischeck, 'ischeck2')
      var sum = Number(that.data.carts[checkid].goodnum);//获取本条商品数量
      var zongshu = Number(that.data.zongshu);//获取购物车商品数量
      var price = Number(that.data.carts[checkid].price);//获取本条商品单价
      var dzongjia = Number(sum * price);//获取本商品总价
      var zonger = Number(that.data.zonger);//购物车总价
      var carts = that.data.carts;
      zonger = Number(zonger + dzongjia);
      var nzongshu = 0;
      nzongshu = Number(zongshu + sum);
      // var zonger1 = zonger.toFixed(2);
      // sum = sum + carts[checkid].price * carts[checkid].goodnum;
      console.log(checkid, 'checkid')
      console.log(sum, 'sum')
      console.log(price, 'rpice')
      console.log(dzongjia, 'zongjia')
      console.log(carts, 'carts')
      console.log(zonger, 'zonger')
      that.setData({
        zonger: zonger.toFixed(2),
        zongshu: nzongshu,
        ['checkstatus[' + checkid + ']']: true,
      });
      //判断是否所有商品都被选中
      var checkstatus = that.data.checkstatus;
      // var p = true
      // for (var i = 0; i < carts.length; i++) {
      //   if (checkstatus[i] == false || checkstatus[i] == undefined) {
      //     p = false;
      //   };
      // };

    } else {
      var checkid = e.target.dataset.checkid;
      that.data.carts[checkid].is_checked = false;
      // console.log(ischeck, 'ischeck3')
      var sum = Number(that.data.carts[checkid].goodnum);//获取本条商品数量
      var zongshu = Number(that.data.zongshu);//获取购物车商品数量

      var price = Number(that.data.carts[checkid].price);//获取本条商品单价
      var dzongjia = sum * price;//获取本商品总价
      var zonger = that.data.zonger;//购物车总价
      var carts = that.data.carts;
      var nzongshu = 0;
      nzongshu = Number(zongshu - sum);
      zonger = zonger - dzongjia;
      // sum = sum + carts[checkid].price * carts[checkid].goodnum;
      console.log(checkid, 'checkid')
      console.log(sum, 'sum')
      console.log(price, 'rpice')
      console.log(dzongjia, 'zongjia')
      console.log(carts, 'carts')
      console.log(zonger, 'zonger')
      that.setData({
        zonger: zonger.toFixed(2),
        zongshu: nzongshu,
        ['checkstatus[' + checkid + ']']: false,
      });
      console.log(that.data.checkstatus);
    }

  },
  //计算价格
  // totalprice: function (e) {
  //   var that = this;
  //   that.data.zongshu = 0 //总数
  //   that.data.zonger = 0 //总额
  //   for (var i = 0; i < that.data.carts.length; i++) {
  //     if (that.data.carts[i].isSelect == true) {
  //       that.data.zonger = that.data.zonger + (that.data.carts[i].price * that.data.carts[i].count);
  //     }
  //   }
  //   that.setData({
  //     zonger: that.data.zonger,
  //   })
  //   // for
  // },
  //单删
  del: function (e) {
    var that = this
    var did = e.currentTarget.dataset.did;
    var id = e.currentTarget.id;
    wx.showModal({
      'content': '确认删除该商品吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        console.log(did, 'did1')
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=delcar',//后台地址
            method: 'GET',
            data: {
              carid: id,
              token: that.data.token
            },
            success: function (ret) {
              console.log(did, 'did2')
              that.data.carts.splice(did, 1);
              that.setData({
                carts: that.data.carts
              });
              console.log(ret, 'jieguo')
              wx.showToast({
                title: '删除' + ret.data.msg,
                icon: 'success',
                duration: 2000
              });
              if (that.data.carts.length == 0) {
                that.setData({
                  isHide: true,
                  footisHide: false
                })
              }
            },
            fail: function (ret) {

            }
          })
        }
      }
    })

  },
  //全删
  delall: function (e) {
    console.log(e, 'e')
    var that = this;
    let carts = that.data.carts;
    let arr2 = [];
    console.log(carts, 'carts');
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].is_checked == false) {
        arr2.push(carts[i]);
      }
    }
    if (arr2.length == 0) {
      that.setData({
        isHide: true,
        footisHide: false
      })
    }
    that.setData({
      carts: arr2,
      zonger: 0,
      zongshu: 0,
    })

  },



  //去结算
  topay: function (e) {

  },

  show: function () {
    if (this.data.num == false) {
      this.setData({
        num: true
      })
    } else {
      this.setData({
        num: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // //啦缓存展示购物车添加的
    // wx.getStorage({
    //   key: 'cart',
    //   success: function (res) {
    //     console.log(res,'xinxi')
    //     // that.setData({
    //     //   shopCarInfo: res.data,
    //     //   shopNum: res.data.shopNum
    //     // });
    //   }
    // })
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
    var that = this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=goodcar',//后台地址
      method: 'GET',
      data: {
        unid: wx.getStorageSync('unionid'),
        token: that.data.token
      },
      success: function (ret) {
        console.log(ret, '商品信息列表')
        that.setData({
          carts: ret.data.data,
          selarr: ret.data.data,

        })
        var i = 0;
        var shus = 0;
        var zongers = 0;
        for (i = 0; i < ret.data.data.length; i++) {
          var zonger = Number(ret.data.data[i].prices);
          var shu = Number(ret.data.data[i].goodnum);
          zongers += zonger;
          shus += shu;
          // console.log(zonger.toFixed(2))
        }


        that.setData({
          zonger: zongers.toFixed(2),
          zongshu: shus,
        })
        if (ret.data.data == null) {
          console.log(6666)
          that.setData({
            isHide: true,
            footisHide: false
          })
        } else {
          that.setData({
            isHide: false,
            footisHide: true
          })
        }

      },
      fail: function (ret) {

      }
    })


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