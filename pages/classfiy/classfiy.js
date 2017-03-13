// pages/classfiy/classfiy.js
var loadData = function(that){  
       wx.showNavigationBarLoading();
       var url = require('../../config').produceCategoryUrl;
       wx.request({         
           url: url,
           method: 'GET',
           data:{
               page : 1,
               page_size : 15,
           },
           success:function(res){
               var list = that.data.list ;
               for(var i = 0; i < res.data.length; i++){
                   list.push(res.data[i]);
               }
               that.setData({
                   list : list
               });
               wx.hideNavigationBarLoading();
           }
       });
 };
Page({
  data:{
    list:[]
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    var that = this;
    loadData(that);
    wx.getStorage({
      key:'key',
      success: function(res) {
           var appData = res.data;
           that.setData({
              classData:appData
            })
      }
    })
    console.log(this.data);
    console.log(this.data.classData);
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
  goList:function(event){
    var id = event.currentTarget.dataset.id;
    wx.navigateTo({
      url:'goodsList/goodsList?type=2&id=' + id
    })
  },
  goListB:function(event){
    wx.navigateTo({
      url:'goodsList/goodsList?type=1&id=produceUrl'
    })
  }
})