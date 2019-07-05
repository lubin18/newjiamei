// pages/gouwuche/gouwuche.js
var that
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
    index: 0,
  },
  ruku: function (e) {
    var unid = wx.getStorageSync('unionid')
    var token = app.globalData.token;
    var index = that.data.index;
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=goodchange',//后台地址
      // "content-type": 'application/x-www-form-urlencoded',
      method: 'GET',
      data: {
        unid: unid,
        token: token,
        pid: that.data.carts[e].pid,//商品id
        goodnum: that.data.carts[e].goodnum,//商品数量
      },
      success: function (ret) {
        console.log(ret, 'ret')
      }
    })
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
    // var thatnum = snum;
    // var unid = wx.getStorageSync('unionid')
    // var token = app.globalData.token;
    // 总数量-1  
    if (snum > 1) {
      that.data.carts[index].goodnum--;
      that.ruku(index)
      //判断当前商品是否被选中
      if (that.data.carts[index].is_checked == true) {
        console.log(that.data.carts, 'carts1')
        var zongjia = Number(that.data.zonger);//拿购物车总价
        var zongshu = Number(that.data.zongshu);//拿购物车商品总数量
        // var thisnum = Number(that.data.carts[index].goodnum);//本条商品数量
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
      carts: that.data.carts,

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
      that.ruku(index)
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
  // focusNum(e) {
  //   // 手动输入时获取基础数据
  //   this.triggerEvent('StepperEvent', {
  //     action: 'getNum',
  //     num: Number(e.detail.value)
  //   });
  //   console.log(e,'e1')
  // },
  blurNum(e) {
    console.log(e, 'e2')
    var index = e.currentTarget.dataset.gaiid;
    var snum = Number(that.data.carts[index].goodnum);//数量
    // var nsnum = Number(e.detail.value);//修改填写的值
    // var kcun = Number(that.data.carts[index].num);//库存
    var danprice = Number(that.data.carts[index].price);//单价
    var danzong = snum * danprice//单zong价
    var zongjia = Number(that.data.zonger);//拿购物车总价
    var zongshu = Number(that.data.zongshu);//拿购物车商品总数量
    console.log(zongshu, 'zongshu')
    if (e.detail.value == '' || e.detail.value == 0) {
      that.data.carts[index].goodnum = 1;
      that.ruku(index)
      var nzongjia = (zongjia - danzong) + (danprice * 1);
      var nzongshu = zongshu - snum + 1;
      // console.log(nzongjia, 'nzongjia11')
      // console.log(nzongshu, 'nzongshu11')
      that.setData({
        zonger: nzongjia.toFixed(2),
        zongshu: nzongshu,
        carts: that.data.carts
      });
      console.log(that.data.carts, 'cartssss')
    }

  },
  //input输入修改
  gai: function (e) {
    var index = e.currentTarget.dataset.gaiid;
    var that = this
    var snum = Number(that.data.carts[index].goodnum);//数量
    var nsnum = Number(e.detail.value);//修改填写的值
    var kcun = Number(that.data.carts[index].num);//库存
    var danprice = Number(that.data.carts[index].price);//单价
    var danzong = snum * danprice//单zong价
    console.log(snum, '数量')
    console.log(nsnum, '输入的值')
    console.log(kcun, '库存')
    if (nsnum != '') {
      that.ruku(index)
      if (nsnum > kcun || nsnum < 1 || nsnum == 0) {
        wx.showToast({
          title: '填写正确数量',
          icon: 'none',
          duration: 2000
        });
        console.log('jinlaile1')
        that.setData({
          carts: that.data.carts
        });
      } else {
        console.log('jinlaile2')
        var zongjia = Number(that.data.zonger);//拿购物车总价
        var zongshu = Number(that.data.zongshu);//拿购物车商品总数量
        console.log(zongshu, 'zongshu')

        console.log(danzong, 'danzong')
        var nzongjia = zongjia - danzong;
        var nzongshu = zongshu - snum;
        nzongjia = Number(nzongjia + Number(nsnum * that.data.carts[index].price));
        nzongshu = Number(nzongshu + nsnum);
        console.log(nzongjia, 'nzongjia')
        that.setData({
          zonger: nzongjia.toFixed(2),
          zongshu: nzongshu,

        });
        that.data.carts[index].goodnum = Number(e.detail.value);//拿到最新输入的数量值放进数组

      }
    } else {
      console.log('8888')
    }
    console.log(that.data.carts, 'carts')
  },
  //选中的相关逻辑
  checkboxChange: function (e) {
    var that = this;
    var index = e.target.dataset.checkid;
    console.log(e, 'e')
    
    if (e.detail.value.length == 1) {//说明选中
     
      var checkid = e.target.dataset.checkid;
      that.data.carts[checkid].is_checked = true;
      that.ruku(index)

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
        carts: that.data.carts
        // ['checkstatus[' + checkid + ']']: true,
      });
      //判断是否所有商品都被选中
      // var checkstatus = that.data.checkstatus;


    } else {
      var checkid = e.target.dataset.checkid;
      that.data.carts[checkid].is_checked = false;
      that.ruku(index)
      var sum = Number(that.data.carts[checkid].goodnum);//获取本条商品数量
      var zongshu = Number(that.data.zongshu);//获取购物车商品数量

      var price = Number(that.data.carts[checkid].price);//获取本条商品单价
      var dzongjia = sum * price;//获取本商品总价
      var zonger = that.data.zonger;//购物车总价
      var carts = that.data.carts;
      var nzongshu = 0;
      nzongshu = Number(zongshu - sum);
      zonger = zonger - dzongjia;
      sum = sum + carts[checkid].price * carts[checkid].goodnum;
      console.log(checkid, 'checkid')
      console.log(sum, 'sum')
      console.log(price, 'rpice')
      console.log(dzongjia, 'zongjia')
      console.log(carts, 'carts')
      console.log(zonger, 'zonger')
      that.setData({
        zonger: zonger.toFixed(2),
        zongshu: nzongshu,
        carts: that.data.carts
        // ['checkstatus[' + checkid + ']']: false,
      });
      console.log(that.data.carts);
    }

  },

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
              var sum = Number(that.data.carts[did].goodnum);//获取本条商品数量
              var zongshu = Number(that.data.zongshu);//获取购物车商品数量
              var price = Number(that.data.carts[did].price);//获取本条商品单价
              var dzongjia = sum * price;//获取本商品总价
              var zonger = that.data.zonger;//购物车总价
              // console.log(zonger,'zonger')
              // var nzongshu = 0;
              if (that.data.carts[did].is_checked){
                zongshu = Number(zongshu - sum);
                zonger = (zonger - dzongjia).toFixed(2);
              }
              
              // console.log(did, 'did2')
              that.data.carts.splice(did, 1);
              that.setData({
                carts: that.data.carts,
                zonger: zonger,
                zongshu: zongshu,
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
    let arr3 = [];
    console.log(carts, 'carts');

    wx.showModal({
      'content': '确认删除所选商品吗？',
      'cancelColor': '#0076FF',
      'confirmColor': '#0076FF',
      success: function (res) {
        for (let i = 0; i < carts.length; i++) {
          if (carts[i].is_checked == false) {
            arr2.push(carts[i]);
            console.log(arr2, 'arr2')
          }
          if (carts[i].is_checked == true) {
            arr3.push(carts[i]);
            console.log(arr3, 'arr3')
            // var xid=arr3[i].pid
            // console.log(xid,'xid')
          }
        }
        var arr4=[];
        var ddd='';
        for (let j=0;j<arr3.length;j++){
          var xid = arr3[j].id + ',';
          console.log(xid,'xid')
          // var ddd=xid+','
          // console.log(ddd, 'ddd')
          ddd += xid
          // arr4.push(xid);
          // console.log(arr4,'arr4')
        }
        console.log(ddd, 'ddd555')
        if (res.confirm) {
          console.log('用户点击确定')
          var token = app.globalData.token;
          wx.request({
            url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=delcars',//后台地址
            // "content-type": 'application/x-www-form-urlencoded',
            method: 'GET',
            data: {
              token: token,
              carids: ddd,//商品单价

            },
            success: function (ret) {
              console.log(ret, 'ret')
              
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
            fail: function (ret) {

            }
          })
        }
      }
    })


  },


  //去结算
  topay: function (e) {
    
    console.log('进来')
    var carts=that.data.carts;
    var arr2=[];
    var arr3 = [];

    for (let i = 0; i < carts.length; i++) {
        if (carts[i].is_checked == true) {
          arr2.push(carts[i]);
          console.log(arr2, 'arr2')
        }else if(arr2.length==0){
          console.log('没选')
        }
      }
    if (arr2.length == 0) {
      console.log('没选')
      wx.showToast({
        title: '请选择至少一条商品',
        icon: 'none',
        duration: 2000,
      })
      return false;
    }else{
      wx.setStorageSync('goodlist',arr2);
        wx.navigateTo({
          url: '../cart_account/cart_account?zongshu=' + that.data.zongshu + '&zonger='+that.data.zonger
      })
    }
      console.log(arr2,'arr2222')
    // wx.request({
    //   url: 'https://wt.lingdie.com/index.php?g=Port&m=PigcmsStore&a=submit_order',//后台地址
    //   "content-type": 'application/x-www-form-urlencoded',
    //   method: 'POST',
    //   data: {
    //     unid: unid,
    //     token: token,
    //     pid: pid,//商品id
    //     total: total,//商品总数量
    //     price: price,//购买总价格
    //     truename: username,//用户昵称
    //     tel: tel,//用户电话
    //     comment: 'sss',//商品备注
    //     list: [{ pid: '24176', goodnum: '2', price: '84.00' }],//商品单价

    //   },
    //   success: function (ret) {
    //     console.log(ret, 'ret')
    //     for (let i = 0; i < carts.length; i++) {
    //       if (carts[i].is_checked == false) {
    //         arr2.push(carts[i]);
    //         console.log(arr2, 'arr2')
    //       }
    //     }
    //     if (arr2.length == 0) {
    //       that.setData({
    //         isHide: true,
    //         footisHide: false
    //       })
    //     }
    //     that.setData({
    //       carts: arr2,
    //       zonger: 0,
    //       zongshu: 0,
    //     })
    //   },
    //   fail: function (ret) {

    //   }
    // })
  },

  show: function () {
    if (that.data.num == false) {
      that.setData({
        num: true
      })
    } else {
      that.setData({
        num: false
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this;
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
        var dzonger = 0;
        if (ret.data.data!==null){
          for (i = 0; i < ret.data.data.length; i++) {
            // var zonger = Number(ret.data.data[i].prices);
            var shu = Number(ret.data.data[i].goodnum);
            var dzonger = Number(ret.data.data[i].price) * shu;
            zongers += dzonger;
            // dzonger += zongers;
            shus += shu;
          }
          that.setData({
            zonger: zongers.toFixed(2),
            zongshu: shus,
            isHide: false,
            footisHide: true
          })
          // that.setData({
           
          // })
        }else{
          that.setData({
            isHide: true,
            footisHide: false
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