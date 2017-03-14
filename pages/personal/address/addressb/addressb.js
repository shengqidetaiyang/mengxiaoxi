// pages/personal/address/address.js
var adressUrl = require('../../../../config').wxMyAddresListUrl;
var delUrl = require('../../../../config').wxDelAddresUrl;
var defaultUrl = require('../../../../config').wxDefaultAddresUrl;
var addressStatus = 0;
Page({
  data:{
    borderSrc: "../../../../resources/border.png",
    address:[],
    loadFlag:true
  },
  bindAddAddressTap:function(){
    wx.redirectTo({
      url: 'addressFill/addressFill'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    this.setData({
      loadFlag:false
    });
      wx.login({
        success: function(res){
          wx.request({
            url: adressUrl,
            data: {
              code:res.code,
            },
            method: 'GET', 
            success: function(res){
              if(res.data.code == 1){
                var list = [];
                that.setData({
                  list:list,
                  loadFlag:true
                });
              }
              else{
                that.setData({
                  list:res.data,
                  loadFlag:true
                });
              }
            }
          })
        }
      }); 
  },
  goback:function(event){
    console.log(event.currentTarget.dataset.id);
    var idx = event.currentTarget.dataset.id;
    wx.redirectTo({
      url:'/pages/cart/payment/payment?idx=' + idx
    })
  },
  addAdress:function(){
    wx.redirectTo({
      url:"/pages/personal/address/addressFill/addressFill",
    })
    addressStatus = 2;
    wx.setStorageSync("addressStatus",addressStatus);
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