// pages/vision/vision.js
var page =1;
var page_size = 4;
var url =  require('../../config').articleUrl; 
var articleClassfiyUrl = require('../../config').wxArticleCategoryUrl;
var flag = true;
var util = require('../../utils/util.js');
var idBox = [];
var loadMore = function(that){  
      // wx.showNavigationBarLoading();
      var timeBox = [];
       wx.request({         
           url: url,
           method: 'GET',
           data:{
               page : page,
               page_size : page_size,
           },
           success:function(res){
               console.log(res.data);
               var list = that.data.list ;
               for(var i = 0; i < res.data.length; i++){
                   if(idBox.indexOf(res.data[i].id) == -1){
                    list.push(res.data[i]);                    
                   }
                   idBox.push(res.data[i].id);
               }
               for(var j = 0;j < list.length;j++){
                   timeBox.push(util.formatTime(new Date(parseInt(list[j].addtime) * 1000)));
               }
               that.setData({
                   list : list,
                   timeBox:timeBox
               });
               // wx.hideNavigationBarLoading();
               page++
               flag = true;
           }
       });

 };
Page({
  data:{
    list:[],
    index:0
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    flag = false;
    var that = this;
    loadMore(that);
       wx.request({         
           url: articleClassfiyUrl,
           method: 'GET',
           data:{
           },
           success:function(res){
            console.log(res.data);
            that.setData({
              articleClassfiy:res.data
            });
           }
       });
  },
  goArctical:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url: './arctical/arctical?id='+ id
    })
  },
  onReachBottom:function(){
       var that = this;
       if(flag){
         loadMore(that);
       }
       // wx.hideNavigationBarLoading();
  },
  changeClassfiy:function(event){
      var idTemp = [];
      var that = this;
      var idx = event.currentTarget.dataset.id;
      this.setData({
        index:idx
      });
      var articleClassfiy = this.data.articleClassfiy;
      var id = articleClassfiy[idx].id;
      if(idx == 0){
         flag = true;
         page = 1;
         idBox = [];
         that.setData({
          list:[]
         });
         flag = false;
         loadMore(that);
      }
      else{
         flag = false;
         wx.request({         
           url: articleClassfiyUrl,
           method: 'GET',
           data:{
            id:id
           },
           success:function(res){
              console.log(res.data);
              var list = [];
              var timeTemp = [];
              for(var i = 0; i < res.data.length; i++){
                 if(idTemp.indexOf(res.data[i].id) == -1){
                  list.push(res.data[i]);                    
                 }
                 idTemp.push(res.data[i].id);
              } 
              for(var j = 0;j < list.length;j++){
                 timeTemp.push(util.formatTime(new Date(parseInt(list[j].addtime) * 1000)));
              }           
              that.setData({
                list:list,
                timeBox:timeTemp
              });
           }
       });       
      }
       // wx.hideNavigationBarLoading();
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