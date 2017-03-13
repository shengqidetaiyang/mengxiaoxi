// pages/cart/payment/payment.js
var orderCartUrl = require('../../../config').wxCartToOrder;
var cartList = require('../../../config').wxCartListUrl;
var clearCart = require('../../../config').wxDelCartUrl;
var payUrl = require('../../../config').wxpayUrl;
var md5 = require('../../../utils/md5.js');
var adressUrl = require('../../../config').wxMyAddresListUrl;
var orderId;
var idx;
Page({
  data:{
    borderSrc: "../../../resources/border.png",
    userDefaultAddress:{},
    flag:false,
    loadFlag:true
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    var cart = wx.getStorageSync('cart');
    var cartTemp = [];
    var priceTotal = 0;
    var addressData;
    var adressFlag = true;
    for(var i = 0;i < cart.length;i++){
        if(cart[i].flag){
          cartTemp.push(cart[i]);
          priceTotal += cart[i].price * cart[i].countCart;
        }
    }
    this.setData({
      cart:cartTemp,
      priceTotal:priceTotal
    })
    wx.getStorage({
      key: "userDefaultAddress",
      success: function(res) {
        var userDefaultAddress = res.data;
        that.setData({
          userDefaultAddress:userDefaultAddress
        })
      }
    });
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
                        addressData:addressData
                      });
                }
              })
            }
          });  
    }else{
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
                        addressData:addressData
                      });
                      adressFlag = false;
                    }
                  };
                  if(adressFlag){
                    addressData = res.data[0];
                    idx = 0;
                    that.setData({
                      addressData:addressData
                    });
                  }
                }
              })
            }
          });        
    }

    wx.login({
      success: function (r) {
              wx.request({         
                  url: cartList,
                  method: 'GET',
                  data:{
                      code:r.code,
                  },
                  success:function(res){
                    var list = res.data;
                    var idTemp = wx.getStorageSync("idTemp");
                    var idBox = [];
                    for(var i = 0;i < list.length;i++){
                      if(idTemp.indexOf(list[i].id) > -1){
                          idBox.push(list[i]);
                      }
                    }
                    var sum = 0;
                    for(var i = 0;i < idBox.length;i++){
                        sum += parseInt((idBox[i].price_true)*100)/100 * parseInt(idBox[i].produce_num);
                    }
                    that.setData({
                      list:list,
                      idBox:idBox,
                      flag:true,
                      sum:sum
                    });
                  }
              });
      }
    });
  },
  goAdress:function(){
    wx.redirectTo({
      url: '../../personal/address/addressc/addressc'
    })
  },
  goTicket:function(){
    wx.navigateTo({
      url: '../../personal/coupons/coupons'
    })   
  },
  goPay:function(){
    this.setData({
      loadFlag:false
    });
    var that = this;
    var payDateTemp = new Date().getTime();
    var payDate = (wx.getStorageSync('payDate')||[]);
    var payFlag = false;
    var addressId;
    payDate.push(payDateTemp);
    wx.setStorageSync("payDate",payDate);
    wx.login({
      success: function (res) {
        var idTemp = wx.getStorageSync("idTemp");
        var str = idTemp[0];
        var code = res.code;
        for(var i = 1;i < idTemp.length;i++){
            str += ",";
            str += idTemp[i]
        }
          wx.request({
            url: adressUrl,
            data: {
              code:res.code,
            },
            method: 'GET', 
            success: function(res){
                console.log(res);
                console.log(idx);
                addressId = res.data[idx].id;
                console.log(res.data[idx]);
                wx.login({
                  success:function(res){
                  wx.request({         
                    url: orderCartUrl,
                    method: 'GET',
                    data:{
                      code:res.code,
                      id:str,
                      address_id:addressId,
                    },
                    success:function(res){
                      that.setData({
                        loadFlag:true
                      });
                      orderId = res.data.order_info[0].order_id; 
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


            }})
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