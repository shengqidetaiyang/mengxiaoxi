var Data = require('../../data/data.js');
var app = getApp();
var page =1;
var page_size = 4;
var wishUrl = require('../../config').wxAddWishListUrl;
var loginUrl = require('../../config').loginUrl;
var cartUrl = require('../../config').wxAddCartUrl;
var cartListUrl = require('../../config').wxCartListUrl;
var bannerUrl = require('../../config').wxBannerImgUrl;
var flag = true;
var loadMore = function(that,a){  
  that.setData({
    dataFlag:false
  });
  wx.showNavigationBarLoading();
  switch(that.data.actionList)
  {
   case 'ProduceAll':
   var url = require('../../config').produceUrl
   break;
   case 'ProduceNew':
   var url = require('../../config').newProduceUrl
   break;
   case 'recommendProduce':
   var url = require('../../config').recommendProduceUrl
   break;
   case 'hotProduce':
   var url = require('../../config').hotProduceUrl
   break;
   default:
   var url = require('../../config').produceUrl
 }
 wx.login({
  success: function (r) {
   var code = r.code;
   wx.request({
    url:loginUrl,
    method: 'GET',
    data: {
      code: code,
    },
    header: {
      'Accept': 'application/json'
    },
    success: function(res) {
     var user = res.data;
     if(user.code == '2'){
      flag = true;
      wx.request({         
       url: url,
       method: 'GET',
       data:{
         page : page,
         page_size : page_size,
       },
       success:function(res){
         var list = that.data.list ;
         for(var i = 0; i < res.data.length; i++){
           list.push(res.data[i]);
         }
         that.setData({
           list : list,
           dataFlag:true
         });
         wx.hideNavigationBarLoading();
         page ++;
         a = true;
       }
     }); 
    }else if(user.code == '1'){
      flag = true;
      wx.login({
        success:function(r){
          wx.request({         
           url: url,
           method: 'GET',
           data:{
             page : page,
             page_size : page_size,
             code:r.code,
           },
           success:function(res){
             var list = that.data.list ;
             for(var i = 0; i < res.data.length; i++){
               list.push(res.data[i]);
             }
             that.setData({
               list : list,
               dataFlag:true
             });
             wx.hideNavigationBarLoading();
             page ++;
             a = true;
           }
         })
        }
      });
    }  
  }            
})
}
});
}
//获取应用实例
Page({
  data: {
    interval: 5000,
    duration: 1000,
    actionList:'recommendProduce',
    list:[],
    goCart:true,
    dataFlag:true,
    top:[]
  },
  //事件处理函数
  onLoad: function () {
    flag = false;
    var  that = this;
    var appData = wx.getStorageSync("key") || Data;
    this.setData({
      appData:appData
    });
    app.getUserInfo();
    loadMore(that,flag);
    wx.request({
        url:bannerUrl,
        method: 'GET',
        data:{
        },
        success:function(res){
        console.log(res.data);
        that.setData({
          bannerData:res.data
        });
        }         
    })
       var urlInner = require('../../config').produceCategoryUrl;
       wx.request({         
           url: urlInner,
           method: 'GET',
           data:{
               page : 1,
               page_size : 3,
           },
           success:function(res){
               var top = that.data.top ;
               for(var i = 0; i < res.data.length; i++){
                   top.push(res.data[i]);
               }
               that.setData({
                   top : top
               });
               wx.hideNavigationBarLoading();
           }
       });
  },
  onShow:function(){
  },
  onReachBottom:function(){
   if(flag){
     var that = this;
     loadMore(that);
   }
 },
 onPullDownRefresh: function(){
   flag = false;
   page = 1;
   this.setData({
     list : []
   });
   loadMore(this,flag);
   wx.stopPullDownRefresh()
 },
 goodsDetailTap: function (event) {
  var ids = event.currentTarget.dataset.id;
  var id = this.data.list[ids].id;
  wx.setStorageSync("currentGoodsId",id);
  wx.navigateTo({
    url: '../classfiy/goodsDetail/goodsDetail?'
  })
},
goCart:function(event){    
  var that = this;                              
  var idx = event.currentTarget.dataset.id;
  var list = this.data.list;
  var info = list[idx];
  var id = info.id;
  var code;
  var proNum;
  var flag = true;
  wx.login({
    success:function(r){
      that.setData({
        goCart:false
      });
      wx.request({
        url:loginUrl,
        method: 'GET',
        data: {
          code: r.code,
        },
        header: {
          'Accept': 'application/json'
        },
        success: function(res) {
         var user = res.data;
         if(user.code == '2'){
          that.setData({
            goCart:true
          });
          wx.navigateTo({
            url: '/pages/register/index'
          }) 
        }else if(user.code =='1'){
          wx.login({
            success:function(r){
              wx.request({
                url:cartListUrl,
                method:'GET',
                data:{
                  code:r.code,
                },
                success:function(res){
                  var list = res.data;
                  for(var i = 0;i < list.length;i++){
                    if(list[i].id == id){
                      proNum = parseInt(list[i].produce_num) + 1;
                      flag = false;
                    }
                  }
                  if(flag){
                    proNum = 1
                  }
                  wx.login({
                    success:function(r){
                      wx.request({
                        url:cartUrl,
                        method:'GET',
                        data:{
                          code:r.code,
                          id:id,
                          produce_num:proNum,
                        },
                        success:function(res){
                          that.setData({
                            goCart:true
                          });
                        }
                      });
                    }
                  });

                }
              });
}
});
}  
}            
})
}
});    
},
getHeart:function(event){
  var idx = event.currentTarget.dataset.id;
  var list = this.data.list;
  var dis = list[idx].is_wish;
  var id  = list[idx].id;
  if(dis == 1){
    dis = 0;
  }
  else{
    dis = 1;
  }
  list[idx].is_wish = dis;
  this.setData({
    list:list
  });
  wx.login({
    success: function (r) {
     var code = r.code;
     wx.request({
      url:loginUrl,
      method: 'GET',
      data: {
        code: code,
      },
      header: {
        'Accept': 'application/json'
      },
      success: function(res) {
       var user = res.data;
       if(user.code=='2'){

       }else if(user.code=='1'){
        wx.login({
          success:function(r){
            wx.request({         
              url: wishUrl,
              method: 'GET',
              data:{
                id:id,
                code:r.code,
              },
              success:function(res){
                console.log(res);
              }
            });
          }    
        });
      }  
    }            
  })
   }
 });
},
bannerGo:function(event){
  var idx = event.currentTarget.dataset.id;
  var bannerData = this.data.bannerData;
  var id = bannerData[idx].url;
  var type = bannerData[idx].type;
  wx.setStorageSync("currentGoodsId",id);
  if(type == 1){
    wx.navigateTo({
      url: '../classfiy/goodsDetail/goodsDetail?'
    })    
  }
  else if(type == 2){
    wx.navigateTo({
      url: '/pages/vision/arctical/arctical?id='+ id
    })
  };
  },
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }

})
