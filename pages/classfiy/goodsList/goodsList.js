var page =1;
var page_size = 4;
var cartListUrl = require('../../../config').wxCartListUrl;
var cartUrl = require('../../../config').wxAddCartUrl;
var wishUrl = require('../../../config').wxAddWishListUrl;
var loginUrl = require('../../../config').loginUrl;
var flagTop = true;
var loadMore = function(that,a){  
  wx.showNavigationBarLoading();
  switch(that.data.actionList)
  {
   case 'ProduceAll':
   var url = require('../../../config').produceUrl
   break;
   case 'ProduceNew':
   var url = require('../../../config').newProduceUrl
   break;
   case 'recommendProduce':
   var url = require('../../../config').recommendProduceUrl
   break;
   case 'hotProduce':
   var url = require('../../../config').hotProduceUrl
   break;
   default:
   var url = require('../../../config').produceUrl
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
       flagTop = true;
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
             list : list
           });
           wx.hideNavigationBarLoading();
           a = true;
           page ++;
         }
       });
     }else if(user.code == '1'){
       flagTop = true;
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
               list : list
             });
             wx.hideNavigationBarLoading();
             a = true;
             page ++;
           }
         });
       }
     });   
     }  
   }            
 })
}
}); 
};
var loadMoreB = function(that,a,f){  
 wx.showNavigationBarLoading();
 var url = require('../../../config').produceCategoryUrl;
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
       flagTop = true;
       wx.request({         
         url: url,
         method: 'GET',
         data:{
           page : page,
           page_size : page_size,
           id:a,
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
           f = true;
           page++;
         }
       });
     }else if(user.code == '1'){
       flagTop = true;
       wx.login({
        success:function(r){
         wx.request({         
           url: url,
           method: 'GET',
           data:{
             page : page,
             page_size : page_size,
             code:r.code,
             id:a,
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
             f = true;
             page++;
           }
         });
       }
     })  
     }  
   }            
 })
}
});       
};
Page({
  data:{
    list:[],
    flagCart:true
  },
  goodsDetailTap:function(event){
    var ids = event.currentTarget.dataset.id;
    var id = this.data.list[ids].id;
    wx.setStorageSync("currentGoodsId",id);
    wx.navigateTo({
      url: '../../classfiy/goodsDetail/goodsDetail'
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
          flagCart:false
        });
        code = r.code;
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
            that.setData({
              flagCart:true
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
                        code = r.code;
                        wx.request({
                          url:cartUrl,
                          method:'GET',
                          data:{
                            code:code,
                            id:id,
                            produce_num:proNum,
                          },
                          success:function(res){
                            that.setData({
                              flagCart:true
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
onLoad:function(options){
  flagTop = false;
  page = 1;
  var that = this;
  var id = options.id;
  var type = options.type;
  this.setData({
    actionList:id,
    type:type
  });
  if(type ==1){
    loadMore(that,flagTop);
  }
  else if(type == 2){
    loadMoreB(that,id,flagTop);
  }
},
onReachBottom:function(){
  var that = this;
  var type = this.data.type;
  var id = this.data.actionList;
  if(flagTop){
    if(type ==1){
      loadMore(that);
    }
    else if(type == 2){
      loadMoreB(that,id);
    }
  }

},
onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
    // var that = this;
    // loadMore(that);
  },
  onHide:function(){
    // 页面隐藏
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
         if(user.code == '2'){

         }else if(user.code == '1'){
          wx.login({
            success: function (r) {
              wx.request({         
                url: wishUrl,
                method: 'GET',
                data:{
                  id:id,
                  code:r.code,
                },
                success:function(res){
                }
              });
            }
          });
        }  
      }            
    })
     }
   });   

  }
})