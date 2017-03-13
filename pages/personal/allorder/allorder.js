// pages/personal/payment/payment.js
var util = require('../../../utils/util.js');
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
var cancelUrl = require('../../../config').wxCancelOrderUrl;
var payUrl = require('../../../config').wxpayUrl;
var md5 = require('../../../utils/md5.js');
var deliveryUrl = require('../../../config').wxLogisticsUrl;
var confirm = require('../../../config').wxPorduceSureGetUrl;
Page({
  data:{
    flagCart:false,
    dealFlag:true,
    loadFlag:true
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
                    if(res.data.code == 1){
                      var sqlOrder = [];
                      var timeBox = [];
                      var sqlOrderB = [];
                      var timeBoxB = [];
                      var sqlOrderC = [];
                      var timeBoxC = [];
                      var sqlOrderD = [];
                      var timeBoxD = [];
                      var sqlOrderE = [];
                      var timeBoxE = [];
                    }else{
                      var myData = res.data;
                      var sqlOrder = [];
                      var sqlOrderB = [];
                      var timeBoxB = [];
                      var sqlOrderC = [];
                      var timeBoxC = [];
                      var sqlOrderD = [];
                      var timeBoxD = [];
                      var sqlOrderE = [];
                      var timeBoxE = [];
                      for(var j = 0;j < myData.length;j++){
                        if(myData[j].status == 1){
                          sqlOrder.unshift(myData[j]);
                        }
                        else if(myData[j].status == 2 ||myData[j].status == 3){
                          sqlOrderB.unshift(myData[j]);
                        }
                        else if(myData[j].status == 4){
                          sqlOrderC.unshift(myData[j]);
                        }
                        else if(myData[j].status == 5){
                          sqlOrderD.unshift(myData[j]);
                        }
                        else if(myData[j].status == -1){
                          sqlOrderE.unshift(myData[j]);
                        }
                      };
                      var timeBox = [];
                      for(var i = 0;i < sqlOrder.length;i++){
                        timeBox.push(util.formatTime(new Date(parseInt(sqlOrder[i].addtime) * 1000)));
                      }
                      for(var i = 0;i < sqlOrderB.length;i++){
                        timeBoxB.push(util.formatTime(new Date(parseInt(sqlOrderB[i].addtime) * 1000)));
                      }
                      for(var i = 0;i < sqlOrderC.length;i++){
                        timeBoxC.push(util.formatTime(new Date(parseInt(sqlOrderC[i].addtime) * 1000)));
                      }
                      for(var i = 0;i < sqlOrderD.length;i++){
                        timeBoxD.push(util.formatTime(new Date(parseInt(sqlOrderD[i].addtime) * 1000)));
                      }
                      for(var i = 0;i < sqlOrderE.length;i++){
                        timeBoxE.push(util.formatTime(new Date(parseInt(sqlOrderE[i].addtime) * 1000)));
                      }
                    }
                    that.setData({
                      sqlOrder:sqlOrder,
                      timeBox:timeBox,
                      sqlOrderB:sqlOrderB,
                      timeBoxB:timeBoxB,
                      sqlOrderC:sqlOrderC,
                      timeBoxC:timeBoxC,
                      sqlOrderD:sqlOrderD,
                      timeBoxD:timeBoxD,
                      sqlOrderE:sqlOrderE,
                      timeBoxE:timeBoxE,
                      flagCart: true
                    });
                    wx.hideNavigationBarLoading();
                  }
              });
      }
    });
  },
  goPay:function(e){
    this.setData({
      loadFlag:false
    });
    var that = this;
    var idx = e.currentTarget.dataset.id;
    var orderId = this.data.sqlOrder[idx].order_id;
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
  cancelOrder:function(event){
    this.setData({
      dealFlag:false
    });
    var that = this;
    var sqlOrder  = this.data.sqlOrder;
    var timeBox = this.data.timeBox;
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
                        sqlOrder.splice(idx,1);
                        timeBox.splice(idx,1);
                        that.setData({
                          sqlOrder:sqlOrder,
                          timeBox:timeBox,
                          dealFlag:true
                        });
                      }
                    });
          }
        })
      }
    })
  },
  goCheck:function(e){
    this.setData({
      dealFlag:false
    });
    var that = this;
    var sqlOrderC = this.data.sqlOrderC;
    var idx = e.currentTarget.dataset.id;
    var orderId = sqlOrderC[idx].order_id;
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
    var sqlOrderC = this.data.sqlOrderC;
    var timeBoxC = this.data.timeBoxC;
    var idx = e.currentTarget.dataset.id;
    var orderId = sqlOrderC[idx].order_id;
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
                    sqlOrderC.splice(idx,1);
                    timeBoxC.splice(idx,1);
                    that.setData({
                      dealFlag:true,
                      timeBoxC:timeBoxC,
                      sqlOrderC:sqlOrderC
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
  }
})