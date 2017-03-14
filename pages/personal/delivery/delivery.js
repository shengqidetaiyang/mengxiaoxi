// pages/personal/payment/payment.js
var util = require('../../../utils/util.js');
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
var deliveryUrl = require('../../../config').wxLogisticsUrl;
var confirm = require('../../../config').wxPorduceSureGetUrl;
var order_id;
var start;
var end;
var length;
Page({
  data:{
    flagCart:false,
    dealFlag:true
  },
  order: function(){
    wx.redirectTo({
      url: "../order/order"
    })
  },
  payment: function(){
    wx.redirectTo({
      url: "../payment/payment"
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
                      var sqlOrderB = [];
                      var timeBoxB = [];
                    }else{
                      var myData = res.data;
                      var sqlOrder = [];
                      var sqlOrderB = [];
                      for(var j = 0;j < myData.length;j++){
                        if(myData[j].status == 2 || myData[j].status == 3){
                          sqlOrder.unshift(myData[j]);
                        }
                        else if(myData[j].status == 4){
                          sqlOrderB.unshift(myData[j]);
                        }
                      };
                      var timeBox = [];
                      var timeBoxB = [];
                      for(var i = 0;i < sqlOrder.length;i++){
                        timeBox.push(util.formatTime(new Date(parseInt(sqlOrder[i].addtime) * 1000)));
                      }
                      for(var i = 0;i < sqlOrderB.length;i++){
                        timeBoxB.push(util.formatTime(new Date(parseInt(sqlOrderB[i].addtime) * 1000)));
                      }
                    }
                    that.setData({
                      sqlOrder:sqlOrder,
                      timeBox:timeBox,
                      sqlOrderB:sqlOrderB,
                      timeBoxB:timeBoxB,
                      flagCart: true
                    });
                    wx.hideNavigationBarLoading();
                  }
              });
      }
    });
  },
  goCheck:function(e){
    this.setData({
      dealFlag:false
    });
    var that = this;
    var sqlOrder = this.data.sqlOrderB;
    var idx = e.currentTarget.dataset.id;
    var orderId = sqlOrder[idx].order_id;
    console.log(orderId);
    wx.login({
      success: function (r) {
              wx.request({         
                  url: deliveryUrl,
                  method: 'GET',
                  data:{
                      code:r.code,
                      order_id:orderId,
                  },
                  success:function(res){
                    that.setData({
                      dealFlag:true
                    });
                    wx.setStorageSync('process',res.data);
                    wx.navigateTo({
                      url:'/pages/personal/delivery/process/process'
                    });
                  }
              });
      }
    });
  },
  goConfirm:function(e){
    this.setData({
      dealFlag:false
    });
    var that = this;
    var sqlOrderB = this.data.sqlOrderB;
    var timeBoxB = this.data.timeBoxB;
    var idx = e.currentTarget.dataset.id;
    var orderId = sqlOrderB[idx].order_id;
    wx.login({
      success: function (r) {
              wx.request({         
                  url: confirm,
                  method: 'GET',
                  data:{
                      code:r.code,
                      order_id:orderId,
                  },
                  success:function(res){
                    sqlOrderB.splice(idx,1);
                    timeBoxB.splice(idx,1);
                    that.setData({
                      dealFlag:true,
                      timeBoxB:timeBoxB,
                      sqlOrderB:sqlOrderB
                    });
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
  },
  slide:function(event){
    var e = event || window.event;
    start = e.touches[0].clientX;
  },
  slideend:function(event){
    var e = event || window.event;
    end = e.touches[0].clientX;
  },
  cal:function(){
    length = end - start;
    if(length < -60){
      wx.redirectTo({
        url:'/pages/personal/finish/finish'
      });
    }
    if(length > 60){
      wx.redirectTo({
        url:'/pages/personal/payment/payment'
      });
    }
  }
})