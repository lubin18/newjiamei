// pages/xinriji/xinriji.js
var that;
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '',
    text:[],
    txt:[],
    // text: [{
    //     id: 1,
    //     titlename: '美眼中心',
    //     item: [{
    //       name: '1明星私人定制双眼皮'
    //     }, {
    //       name: '2明星'
    //     }, {
    //       name: '3明星私人定制双眼皮'
    //     }]
    //   },
    //   {
    //     id: 2,
    //     titlename: '美鼻中心',
    //     item: [{
    //       name: '1明星私人定制双眼皮1'
    //     }, {
    //       name: '2明星私人定制双眼皮1'
    //     }, {
    //       name: '3明星私人定制双眼皮1'
    //     }]
    //   },
    //   {
    //     id: 3,
    //     titlename: '美胸中心',
    //     item: [{
    //       name: '1明星私人定制双眼皮2'
    //     }, {
    //       name: '2明星私人定制双眼皮2'
    //     }, {
    //       name: '3明星私人定制双眼皮2'
    //     }]
    //   },
    //   {
    //     id: 4,
    //     titlename: '美肤中心',
    //     item: [{
    //       name: '1明星私人定制双眼皮3'
    //     }, {
    //       name: '2明星私人定制双眼皮3'
    //     }, {
    //       name: '3明星私人定制双眼皮3'
    //     }]
    //   }
    // ],
    show: {},
    showbox: {},
    add_content: [],
    leftclick: ''

  },

  changeDate: function(e) {
    console.log(e.detail.value)
    this.setData({
      date: e.detail.value
    })
  },
  //左边内容判断点击
  showclassify: function(e) {
    console.log(e.target.dataset.id)
    console.log(this.data.text)

    const id = e.target.dataset.id
    const add_content = that.data.add_content
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=goods',
      data:{
        token: 'rkplnp1552879213',
        id:id
      },
      success({data:{data}}){
        console.log(data)
        that.setData({
          txt:data
        })
        for (var i = 0; i < data.length; i++) {
          for (var a = 0; a < add_content.length; a++) {
            if (add_content[a].id.indexOf(data[i].id) >= 0) {
              console.log(add_content[a].id.indexOf(data[i].id))
              that.data.txt[i].checked = true
              console.log(that.data.txt[i].checked)
              that.setData({
                txt: that.data.txt
              })
            }
          }
        }
      }
    })
    const num = this.data.text
    this.setData({
      leftclick: id
    })
    for (var i = 0; i < num.length; i++) {
      if (num[i].id == id) {
        this.setData({
          show: num[i]
        })
      }
    }
  },
  //右边内容判断点击
  itemshow: function(e) {
    const name = e.target.dataset.name
    const id = e.target.dataset.id
    var add_content = this.data.add_content
    var index = this.data.add_content.indexOf(name)
    for (let i = 0; i < this.data.txt.length; i++) {

      if (this.data.txt[i].name == name) {
        if (this.data.txt[i].checked == true) {
          this.data.txt[i].checked = false;
          for (var s = 0; s < this.data.add_content.length;s++){
            if(this.data.add_content[s].id == id){
              add_content.splice(s, 1)
            }
          }
          // 删除项目展示内容
          this.setData({
            add_content: add_content,
            txt: this.data.txt
          })
        } else {
          this.data.txt[i].checked = true;
          console.log(this.data.txt[i].checked, '2222');
          add_content.push({name,id})
          //右边添加进项目展示
          this.setData({
            add_content: add_content,
            txt: this.data.txt
          })
        }
      }
    }
  },
  //跳转下一步
  next(){
    var data = []
    data.push(this.data.date,this.data.add_content)
    wx.navigateTo({
      url: '/pages/xinrijiben/xinrijiben?tent=' + JSON.stringify(this.data.add_content) + "&date=" + this.data.date
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    that=this
    wx.request({
      url: 'https://wt.lingdie.com/index.php?g=Port&m=Face&a=fen',
      data:{
        token: 'rkplnp1552879213'
      },
      success({data:{data}}){
        that.setData({
          text:data
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    var TIME = util.formatNumber1(new Date());
    this.setData({

      date: TIME,

    });
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