// pages/personal/delivery/process/process.js
Page({
  data:{
    infoShow:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var process = wx.getStorageSync("process");
    if(process.Traces.length == 0){
      this.setData({
        infoShow:true
      });
    }
    this.setData({
      list:process.Traces
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