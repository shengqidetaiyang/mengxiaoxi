// pages/cart/payment/payment.js
var util = require('../../../utils/util.js');
var md5 = require('../../../utils/md5.js');
var orderUrl = require('../../../config').wxAddOrderUrl;
var myOrderUrl = require('../../../config').wxwxOrderListUrl;
var payUrl = require('../../../config').wxpayUrl;
var adressUrl = require('../../../config').wxMyAddresListUrl;
var orderId;
var idx;
Page({
  data:{
    borderSrc: "../../../resources/border.png",
    payData:{},
    userDefaultAddress:{},
    loadFlag:true,
    dataFlag:true,
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      dataFlag:false
    });
    console.log(options);
    var that = this;
    var payData = wx.getStorageSync("goPayment");
    var addressData;
    var adressFlag = true;
    this.setData({
      payData:payData
    })
    wx.getStorage({
      key: "userDefaultAddress",
      success: function(res) {
        var userDefaultAddress = res.data
        console.log(userDefaultAddress)
        that.setData({
          userDefaultAddress:userDefaultAddress
        })
      }
    })
    if(options.idx){
           idx = options.idx;
           wx.login({
            success: function(res){
              wx.request({
                url: adressUrl,
                data: {
                  code:res.code,
                },
                method: 'GET', 
                success: function(res){
                      addressData = res.data[idx];
                      that.setData({
                        addressData:addressData,
                        dataFlag:true
                      });
                }
              })
            }
          });  
    }
    else{
           wx.login({
            success: function(res){
              wx.request({
                url: adressUrl,
                data: {
                  code:res.code,
                },
                method: 'GET', 
                success: function(res){
                  for(var i = 0;i < res.data.length;i++){
                    if(res.data[i].is_default == 2){
                      addressData = res.data[i];
                      idx = i;
                      that.setData({
                        addressData:addressData,
                        dataFlag:true
                      });
                      adressFlag = false;
                    }
                  };
                  if(adressFlag){
                    addressData = res.data[0];
                    idx = 0;
                    that.setData({
                      addressData:addressData,
                      dataFlag:true
                    });
                  }
                }
              })
            }
          });       
    }

  },
  goPay:function(){
    this.setData({
      loadFlag:false
    });
    var that = this;
    var obj = this.data.payData;
    var id = obj.id;
    var produce_num = obj.count;
    var payDateTemp = new Date().getTime();
    var payDate = (wx.getStorageSync('payDate')||[]);
    var addressId ;
    payDate.push(payDateTemp);
    wx.setStorageSync("payDate",payDate);
    wx.login({
      success: function(res){
        wx.request({
          url: adressUrl,
          data: {
            code:res.code,
          },
          method: 'GET', 
          success: function(res){
            addressId = res.data[idx].id;
              wx.login({
                success: function (r) {
                  wx.request({         
                    url: orderUrl,
                    method: 'GET',
                    data:{
                      code:r.code,
                      id:id,
                      produce_num:produce_num,
                      address_id:addressId,
                    },
                    success:function(res){
                      orderId = res.data.order_info[0].order_id; 
                      console.log(orderId);
                              wx.login({
                                success: function(r){ 
                                  that.setData({
                                    loadFlag:true
                                  });      
                                  wx.request({         
                                    url: payUrl,
                                    method: 'GET',
                                    data:{
                                      code:r.code,
                                      order_id:orderId,
                                    },
                                    success:function(response){
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
                                          console.log('success');
                                          wx.showModal({
                                            title: '提示',
                                            content: '支付成功',
                                            success: function(res) {
                                                wx.redirectTo({
                                                  url:'/pages/personal/delivery/delivery'
                                                });
                                            }
                                          })                               
                                        },
                                        fail:function(){
                                          wx.showModal({
                                            title: '提示',
                                            content: '支付失败',
                                            success: function(res) {
                                                wx.redirectTo({
                                                  url:'/pages/personal/payment/payment'
                                                });
                                            }
                                          })                                
                                        }
                                      }); 
                                    }
                                  });
                          }
                          });
                    }
                  });
                }
              });
          }
        })
      }
    });  
},
goAdress:function(){
  wx.redirectTo({
    url: '../../personal/address/addressb/addressb'
  })
},
goTicket:function(){
  wx.navigateTo({
    url: '../../personal/coupons/coupons'
  })   
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