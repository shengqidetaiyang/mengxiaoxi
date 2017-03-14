// pages/personal/payment/payment.js
var util = require('../../../utils/util.js');
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
Page({
  data:{
    flagCart:false
  },
  payment: function(){
    wx.redirectTo({
      url: "../payment/payment"
    })
  },
  delivery: function(){
    wx.redirectTo({
      url: "../delivery/delivery"
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showNavigationBarLoading();
    var that = this;
    wx.login({
      success: function (r) {
              wx.request({         
                  url: myOrderUrl,
                  method: 'GET',
                  data:{
                      code:r.code,
                  },
                  success:function(res){
                    console.log(res.data);
                    if(res.data.code == 1){
                      var sqlOrder = [];
                      var timeBox = [];
                    }else{
                      var myData = res.data;
                      var sqlOrder = [];
                      for(var j = 0;j < myData.length;j++){
                        if(myData[j].status == -1){
                          sqlOrder.unshift(myData[j]);
                        }
                      };
                      var timeBox = [];
                      for(var i = 0;i < sqlOrder.length;i++){
                        timeBox.push(util.formatTime(new Date(parseInt(sqlOrder[i].addtime) * 1000)));
                      }
                    }
                    that.setData({
                      sqlOrder:sqlOrder,
                      timeBox:timeBox,
                      flagCart: true
                    });
                    wx.hideNavigationBarLoading();
                  }
              });
      }
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
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})