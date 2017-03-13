// pages/personal/address/address.js
var adressUrl = require('../../../config').wxMyAddresListUrl;
var delUrl = require('../../../config').wxDelAddresUrl;
var defaultUrl = require('../../../config').wxDefaultAddresUrl;
Page({
  data:{
    borderSrc: "../../../resources/border.png",
    address:[],
    loadFlag:true,
    dataFlag:true
  },
  bindAddAddressTap:function(){
    wx.redirectTo({
      url: 'addressFill/addressFill'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({
      dataFlag:false
    });
    var that = this;
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
                  dataFlag:true
                });
              }
              else{
                that.setData({
                  list:res.data,
                  dataFlag:true
                });
              }
            }
          })
        }
      }); 
  },
  bindDefaultTap: function(e){
    var that = this;
    var idx = e.currentTarget.dataset.id;
    var addressId = this.data.list[idx].id;
    that.setData({
      loadFlag:false
    });
    wx.login({
      success: function(res){
        wx.request({
          url: defaultUrl,
          data: {
            code:res.code,
            id:addressId,
          },
          method: 'GET', 
          success: function(res){
          wx.login({
            success: function(res){
              wx.request({
                url: adressUrl,
                data: {
                  code:res.code,
                },
                method: 'GET', 
                success: function(res){
                  that.setData({
                    list:res.data,
                    loadFlag:true
                  });
                }
              })
            }
          }); 
          }
        })
      }
    }); 

  },
  bindDeleteTap: function(e){
    var that = this;
    var idx = e.currentTarget.dataset.id;
    var addressId = this.data.list[idx].id;
    that.setData({
      loadFlag:false
    });
    wx.login({
      success: function(res){
        wx.request({
          url: delUrl,
          data: {
            code:res.code,
            id:addressId,
          },
          method: 'GET', 
          success: function(res){
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
                    var list=[];
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
          }
        })
      }
    }); 
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
      var that = this;
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
                  list:list
                });
              }
              else{
                that.setData({
                  list:res.data
                });
              }
            }
          })
        }
      }); 
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})