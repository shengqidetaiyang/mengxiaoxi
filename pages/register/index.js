// pages/register/index.js
var url = require('../../config').registerUrl;
var app = getApp();
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  formSubmit: function(e) {
    var avatarUrl = this.data.userInfo.avatarUrl;
    var nickName = this.data.userInfo.nickName;
    var datas = e.detail.value;
    var res = /^1\d{10}$/;
    console.log(datas.mobile);
    console.log(res.test(datas));
if(!res.test(datas.mobile)||datas.mobile == ""){
        wx.showModal({
          title: '提示',
          showCancel: false,
          confirmColor: "#ffa500",
          content: '请输入正确的手机号码'
        })
}
else{
    wx.login({
        success: function (r) {
          console.log(r.code);
           wx.request({
            url: url,
            method: 'GET',
            data: {
              code: r.code,
              mobile:datas.mobile,
              nickName:nickName,
              avatarUrl:avatarUrl
              },
            header: {
                'Accept': 'application/json'
            },
            success: function(res) {
              console.log("注册成功");
              wx.switchTab({
                url:'../../pages/index/index'
              })
            }            
        })          
        }
      }) 
}

  },
  formReset: function() {
    console.log('form发生了reset事件')
  },
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})