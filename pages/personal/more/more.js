// pages/personal/more/more.js
Page({
  data:{},
  bindAboutTap: function(){
    wx.navigateTo({
      url: 'about/about'
    })
  },
  bindContactTap: function(){
    wx.navigateTo({
      url: 'contact/contact'
    })
  },
  bindOtherTap: function(){
    wx.navigateTo({
      url: 'other/other'
    })
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
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