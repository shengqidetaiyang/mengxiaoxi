// pages/vision/arctical/arctical.js
var praiseUrl = require('../../../config').wxArticleZanUrl;
var articleId;
var util = require('../../../utils/util.js');
var loadMore = function(a,id){  
      wx.showNavigationBarLoading();
      var url =  require('../../../config').articleDetailrUrl;  
      // wx.login({
        // success:function(r){
           wx.request({         
               url: url,
               method: 'GET',
               data:{
                  id:id,
                  // code:r.code,
               },
               success:function(res){
                console.log(1100011);
                var resdata = res.data;
                var time = util.formatTime(new Date(parseInt(res.data[0].addtime) * 1000));
                   a.setData({
                       list : resdata[0],
                       time:time
                   });
                   wx.hideNavigationBarLoading();
               }
           });
        // }
      // });
 };
Page({
  data:{
    flag:false,
    articelData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var id = options.id;
    articleId = id;
    var that = this;
    loadMore(that,id);
  },
  goPraise:function(){
    var flag = this.data.flag;
    flag = !flag;
    this.setData({
      flag:flag
    });
      wx.login({
      success: function (r) {
              console.log(r.code);
              console.log(articleId);
              wx.request({         
                  url: praiseUrl,
                  method: 'GET',
                  data:{
                      code:r.code,
                      article_id:articleId,
                  },
                  success:function(res){
                    console.log(res.data);
                  }
              });
      }
    });
  },
  goComment:function(){
    wx.navigateTo({
      url: '../comment/comment?id='+ articleId
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
  }
})