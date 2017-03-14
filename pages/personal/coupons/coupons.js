// pages/personal/coupons/coupons.js
Page({
  data:{
    coupons:[{
      "couponsType": "优惠券",
      "amount": "300.00",
      "periodValidity": "有效期："+ "2017-04-13",
      "qualification": "满"+"2000.00"+"使用"
    },{
      "couponsType": "优惠券",
      "amount": "300.00",
      "periodValidity": "有效期："+ "2017-04-13",
      "qualification": "满"+"2000.00"+"使用"
    }],
    overdueCoupons:[{
      "couponsType": "优惠券",
      "amount": "300.00",
      "periodValidity": "已过期",
      "qualification": "满"+"2000.00"+"使用"
    },{
      "couponsType": "优惠券",
      "amount": "300.00",
      "periodValidity": "已过期",
      "qualification": "满"+"2000.00"+"使用"
    }],
    "condition": true,
    "color": true,
    "popup":false
  },
  bindUseTap:function(){
    this.setData({
      condition: true,
      color: true
    })
  },
  bindOverdueTap:function(){
    this.setData({
      condition: false,
      color: false
    })
  },
  bindPopuptap: function(){
    this.setData({
      popup:true
    })
  },
  bindCanceltap: function(){
    this.setData({
      popup:false
    })
  },
  bindNoticetap: function(){
    wx.navigateTo({
      url: 'notice/notice'
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
  },
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})