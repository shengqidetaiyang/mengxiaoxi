// pages/vision/arctical/arctical.js
var app = getApp();
var page =1;
var page_size = 8;
var commentUrl = require('../../../config').wxArticleCommentUrl;
var goCommentUrl = require('../../../config').wxAddArticleCommentUrl;
var util = require('../../../utils/util.js');
var articleId;
var loadMore = function(that){
      wx.showNavigationBarLoading();
      wx.login({
        success:function(r){
          wx.request({         
           url: commentUrl,
           method: 'GET',
           data:{
             page : page,
             page_size : page_size,
             code:r.code,
             article_id:articleId,
           },
           success:function(res){
             var list = that.data.list ;
             for(var i = 0; i < res.data.length; i++){
               list.push(res.data[i]);
             }
             var timeList = [];
             for(var i = 0;i < list.length;i++){
               var time = list[i].addtime*1000;
               var timer = new Date(time);
               timeList.push(util.formatTime(timer));
             }
             that.setData({
               list : list,
               timeList:timeList,
             });
             wx.hideNavigationBarLoading();
             page ++;
           }
         })
        }
      });
}
Page({
  data:{
    dis:false,
    list:[],
    timeList:[],
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    page = 1;
    console.log(options);
    var that = this;
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
    articleId = options.id;
    loadMore(that);
  },
  cancel:function(){
    var dis = this.data.dis;
    dis = !dis;
    this.setData({
      dis:dis
    });
  },
  goSay:function(){
    var dis = this.data.dis;
    dis = !dis;
    this.setData({
      dis:dis
    });   
  },
bindFormSubmit:function(event){
  var that = this;
  if(event.detail.value.textarea == ""){
      wx.showModal({
        title: '提示',
        content: '请填写评论内容',
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      })
  }
  else{
    console.log(event.detail.value.textarea);
    var articleComment = event.detail.value.textarea;
      wx.login({
        success:function(r){
          wx.request({         
           url: goCommentUrl,
           method: 'GET',
           data:{
             code:r.code,
             article_id:articleId,
             comment:articleComment,
           },
           success:function(res){
             console.log(res);
              var dis = that.data.dis;
              dis = !dis;
              that.setData({
                dis:dis
              });
              that.setData({
                list:[],
              });
              page = 1;
              loadMore(that);
           }
         })
        }
      });    
  }
},
  onReachBottom:function(){
     var that = this;
     loadMore(that);
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