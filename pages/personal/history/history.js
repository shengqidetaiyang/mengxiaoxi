// pages/personal/history/history.js
Page({
  data:{},
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var trace = wx.getStorageSync("trace")||[];
    var traceDate = wx.getStorageSync("traceDate")||[];
    this.setData({
      trace:trace,
      traceDate:traceDate
    });
  },
  clearTrace:function(){
    wx.setStorageSync("trace",[]);
    wx.setStorageSync("traceDate",[]);
    this.setData({
      trace:[],
      traceDate:[]
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
  },
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})