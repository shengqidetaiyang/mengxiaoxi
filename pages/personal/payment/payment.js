// pages/personal/payment/payment.js
var util = require('../../../utils/util.js');
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
var cancelUrl = require('../../../config').wxCancelOrderUrl;
var payUrl = require('../../../config').wxpayUrl;
var md5 = require('../../../utils/md5.js');
var start;
var end;
var length;
var top;
var bottom;
var height;
Page({
  data:{
    flagCart:false,
    dealFlag:true,
    loadFlag:true,
  },
  bindOrderTap: function(){
    wx.redirectTo({
      url: "../order/order"
    })
  },
  goAllorder:function(){
    wx.redirectTo({
      url: "../allorder/allorder"
    })
  },
  goFinish:function(){
    wx.redirectTo({
      url: "../finish/finish"
    })    
  },
  bindDeliveryTap: function(){
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
                        if(myData[j].status == 1){
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
  cancelOrder:function(event){
    this.setData({
      dealFlag:false
    });
    var that = this;
    var sqlOrder  = this.data.sqlOrder;
    var idx = event.currentTarget.dataset.id;
    var orderId = sqlOrder[idx].order_id;
    wx.login({
      success: function(res){
        wx.request({
          url: cancelUrl,
          data: {
            code:res.code,
            order_id:orderId,
          },
          method: 'GET', 
          success: function(res){
                    wx.showNavigationBarLoading();
                    wx.login({
                      success: function (r) {
                              wx.request({         
                                  url: myOrderUrl,
                                  method: 'GET',
                                  data:{
                                      code:r.code,
                                  },
                                  success:function(res){
                                    if(res.data.code == 1){
                                      var sqlOrder = [];
                                      var timeBox = [];
                                    }else{
                                      var myData = res.data;
                                      var sqlOrder = [];
                                      for(var j = 0;j < myData.length;j++){
                                        if(myData[j].status == 1){
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
                                      flagCart: true,
                                      dealFlag:true
                                    });
                                    wx.hideNavigationBarLoading();
                                  }
                              });
                      }
                    });
          }
        })
      }
    })
  },
  goPay:function(e){
    this.setData({
      loadFlag:false
    });
    var that = this;
    var idx = e.currentTarget.dataset.id;
    var orderId = this.data.sqlOrder[idx].order_id;
    console.log(orderId);
                    wx.login({
                      success: function(r){        
                        wx.request({         
                          url: payUrl,
                          method: 'GET',
                          data:{
                            code:r.code,
                            order_id:orderId,
                          },
                          success:function(response){
                            that.setData({
                              loadFlag:true
                            });
                            console.log(response.data); 
                            var appId = response.data.appid;
                            var timeStamp = (Date.parse(new Date()) / 1000).toString();
                            var pkg = 'prepay_id=' + response.data.prepay_id;
                            var nonceStr = response.data.nonce_str;
                            var paySign = md5.hex_md5('appId='+appId+'&nonceStr='+nonceStr+'&package='+pkg+'&signType=MD5&timeStamp='+timeStamp+"&key=f96848edf40625e0e92b532782e93d8e").toUpperCase();
                            console.log(paySign);
                            console.log(appId);
                            wx.requestPayment({
                              'timeStamp': timeStamp,
                              'nonceStr': nonceStr,
                              'package': pkg,
                              'signType': 'MD5',
                              'paySign': paySign,
                              'success':function(res){
                                wx.showModal({
                                  title: '提示',
                                  content: '支付成功',
                                  success: function(res) {
                                    if (res.confirm) {
                                      wx.navigateTo({
                                        url:'/pages/personal/delivery/delivery'
                                      });
                                    }
                                  }
                                })                               
                              },
                              fail:function(){
                                wx.showModal({
                                  title: '提示',
                                  content: '支付失败',
                                  success: function(res) {
                                  }
                                })                                
                              }
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
                        if(myData[j].status == 1){
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
    top = e.touches[0].clientY;
  },
  slideend:function(event){
    var e = event || window.event;
    end = e.touches[0].clientX;
    bottom = e.touches[0].clientY;
  },
  cal:function(){
    length = end - start;
    height = bottom - top;
    if(length < -60 && height < 30 && height > -30){
      wx.redirectTo({
        url:'/pages/personal/delivery/delivery'
      });
    }
    if(length > 60 && height < 30 && height > -30){
      wx.redirectTo({
        url:'/pages/personal/allorder/allorder'
      });
    }
  }
})