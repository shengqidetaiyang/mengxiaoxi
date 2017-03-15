// pages/vision/arctical/arctical.js
var praiseUrl = require('../../../config').wxArticleZanUrl;
var WxParse = require('../../../wxParse/wxParse.js');
var articleId;
var util = require('../../../utils/util.js');
var test;
var id;
var article;
var loadMore = function(a,id){  
      wx.showNavigationBarLoading();
      var url =  require('../../../config').articleDetailrUrl;  
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
                   test = a.data.list.content;
                   article = test;
                   WxParse.wxParse('article', 'html', article, a, 0);
                   console.log(test);
                   console.log(typeof test);
                   console.log(test.length);
                   var test = test.replace(/<p/g, '<view');
                   test = test.replace(/p>/g, 'view>');
                   test = test.replace(/<strong/g, '<text');
                   test = test.replace(/strong>/g, 'text>');
                   test = test.replace(/<img/g, '<image');
                   test = test.replace(/<br\/>/g, '');
                   console.log(test);
                   a.setData({
                      test:test
                   });
                   wx.hideNavigationBarLoading();
               }
           });
 };
Page({
  data:{
    flag:false,
    articelData:{}
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    id = options.id;
    articleId = id;

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
    var that = this;
    loadMore(that,id);
  },
  onShow:function(){
    // 页面显示

    var that = this;
    loadMore(that,id);
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