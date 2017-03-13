//index.js
//获取应用实例
var url = require('../../../config').produceUrl;
var loginUrl = require('../../../config').loginUrl
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
var app = getApp();
var flag = false;
var onShowFlag = false;
var index = 0;
Page({
  data: {
    userSetImage:"../../resources/set.png",
    userLevel:"M0",
    userAssets:"0妙钻",
    userCoupons:"2张优惠券",
    userPayment: 0,
    userGoods: 0,
    userCollection:0,
    paymentNum:0,
    pageShow:false,
    buttonShow:false,
    deliveryNum:0,
    dataFlag:false
  },
  bindMoreTap: function(){
    wx.navigateTo({
      url: '../more/more'
    })
  },
  bindLevelTap: function(){
    wx.navigateTo({
      url: '../level/level'
    })
  },
  bindAssetsTap: function(){
    wx.navigateTo({
      url: '../assets/assets'
    })
  },
  bindCouponsTap: function(){
    wx.navigateTo({
      url: '../coupons/coupons'
    })
  },
  bindOrderTap: function(){
    wx.navigateTo({
      url: '../allorder/allorder'
    })
  },
  bindPaymentTap: function(){
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  bindDeliveryTap: function(){
    wx.navigateTo({
      url: '../delivery/delivery'
    })
  },
  bindCollectionTap: function(){
    wx.navigateTo({
      url: '../collection/collection'
    })
  },
  bindHistoryTap: function(){
    wx.navigateTo({
      url: '../history/history'
    })
  },
  bindAddressTap: function(){
    wx.navigateTo({
      url: '../address/address'
    })
  },
  bindcallingTap: function(){
    wx.makePhoneCall({
      phoneNumber:"020-22196477"
    })
  },
  goRegister:function(){
    wx.navigateTo({
      url: '/pages/register/index'
    })   
  },
  onLoad: function () {
    var that = this
    wx.login({
      success: function (r) {
       wx.request({
        url: loginUrl,
        method: 'GET',
        data: {
          code: r.code
        },
        header: {
          'Accept': 'application/json'
        },
        success: function(res) {
         var user = res.data;
         if(user.code=='2'){
          that.setData({
            buttonShow:true
          })
          wx.hideNavigationBarLoading();
        }else if(user.code=='1'){
         console.log("user.code == 1");
         onShowFlag = true;
         that.setData({
          pageShow:true
        });
               wx.login({
                success: function (r) {
                  wx.request({         
                    url: url,
                    method: 'GET',
                    data:{
                      code:r.code,
                      page:1,
                      page_size:10000,
                    },
                    success:function(res){
                      var list = res.data;
                      var count = 0;
                      for(var i = 0;i < list.length;i++){
                        if(list[i].is_wish == 1){
                          count++
                        }
                      }
                      that.setData({
                        userCollection:count
                      });
                      wx.hideNavigationBarLoading();
                      index++;
                      if(index == 3){
                        that.setData({
                          dataFlag:true
                        });
                      }
                    }
                  });
                }
              });
               wx.login({
                success: function (r) {
                  wx.request({         
                    url: myOrderUrl,
                    method: 'GET',
                    data:{
                      code:r.code,
                    },
                    success:function(res){
                      var sqlOrder = [];
                      for(var j = 0;j < res.data.length;j++){
                        if(res.data[j].status == 1){
                          sqlOrder.push(res.data[j]);
                        }
                      };
                      var num = sqlOrder.length;
                      that.setData({
                        paymentNum:num
                      });
                      wx.hideNavigationBarLoading();
                      index++;
                      if(index == 3){
                        that.setData({
                          dataFlag:true
                        });
                      }
                    }
                  });
                }
              });
              wx.login({
                success: function (r) {
                  wx.request({         
                    url: myOrderUrl,
                    method: 'GET',
                    data:{
                      code:r.code,
                    },
                    success:function(res){
                      var sqlOrder = [];
                      for(var j = 0;j < res.data.length;j++){
                        if(res.data[j].status == 2){
                          sqlOrder.push(res.data[j]);
                        }
                      };
                      var num = sqlOrder.length;
                      that.setData({
                        deliveryNum:num
                      });
                      wx.hideNavigationBarLoading();
                      index++;
                      if(index == 3){
                        that.setData({
                          dataFlag:true
                        });
                      }
                    }
                  });
                }
              });
       }  
     }            
   })
}
})
wx.showNavigationBarLoading();
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    });
  },
  onShow:function(){
    // 页面显示
    var that = this;
    var orders = wx.getStorageSync("orders");
    var lens = orders.length;
    this.setData({
      userPayment:lens
    });
    flag = true;
    if(onShowFlag){
        wx.login({
          success: function (r) {
            wx.request({         
              url: url,
              method: 'GET',
              data:{
                code:r.code,
                page:1,
                page_size:10000,
              },
              success:function(res){
                var list = res.data;
                var count = 0;
                for(var i = 0;i < list.length;i++){
                  if(list[i].is_wish == 1){
                    count++
                  }
                }
                that.setData({
                  userCollection:count
                });
                wx.hideNavigationBarLoading();
              }
            });
          }
        });
         wx.login({
          success: function (r) {
            wx.request({         
              url: myOrderUrl,
              method: 'GET',
              data:{
                code:r.code,
              },
              success:function(res){
                var sqlOrder = [];
                for(var j = 0;j < res.data.length;j++){
                  if(res.data[j].status == 1){
                    sqlOrder.push(res.data[j]);
                  }
                };
                var num = sqlOrder.length;
                that.setData({
                  paymentNum:num
                });
                wx.hideNavigationBarLoading();
              }
            });
          }
        });
        wx.login({
          success: function (r) {
            wx.request({         
              url: myOrderUrl,
              method: 'GET',
              data:{
                code:r.code,
              },
              success:function(res){
                var sqlOrder = [];
                for(var j = 0;j < res.data.length;j++){
                  if(res.data[j].status == 2){
                    sqlOrder.push(res.data[j]);
                  }
                };
                var num = sqlOrder.length;
                that.setData({
                  deliveryNum:num
                });
                wx.hideNavigationBarLoading();
              }
            });
          }
        });
    }
  }
})
