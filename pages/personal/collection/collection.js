// pages/personal/collection/collection.js
var url = require('../../../config').produceUrl;
var loginUrl = require('../../../config').loginUrl
Page({
  data:{
    collection:[{
      collectionSrc: "../../../resources/logo.png",
      collectionName: "【预售】海尔空气净化器|家用车载两用",
      collectionValue: "￥299.00"

    },{
      collectionSrc: "../../../resources/logo.png",
      collectionName: "【预售】海尔空气净化器|家用车载两用",
      collectionValue: "￥299.00"

    }],
    flagCart:false,
    flagLast:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    wx.showNavigationBarLoading();
    var that = this;
    wx.login({
      success:function(r){
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
                      wx.navigateTo({
                          url: '/pages/register/index'
                          }) 
                     }else if(user.code=='1'){
                     }  
                  }            
              });        
      }
    }),
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
                    console.log(res.data);
                    that.setData({
                      list:res.data,
                      flagCart:true,
                      flagLast:true
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
  }
})