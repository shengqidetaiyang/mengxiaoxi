var page =1;
var page_size = 5;
var cartListUrl = require('../../../config').wxCartListUrl;
var cartUrl = require('../../../config').wxAddCartUrl;
var wishUrl = require('../../../config').wxAddWishListUrl;
var flag = true;
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
                           page ++;
                           a = true;
                       }
                   });
                }
             });   
 }
Page({
  data:{
    list:[],
    flagCart:true
  },
  goodsDetailTap:function(event){
    var ids = event.currentTarget.dataset.id;
    var name = this.data.list[ids].name;
    var price = this.data.list[ids]['price_true'];
    var src = this.data.list[ids]['produce_img'];
    var id = this.data.list[ids].id;
    var wish = this.data.list[ids].is_wish;
    wx.navigateTo({
      url: '../../classfiy/goodsDetail/goodsDetail?name=' + name + '&price=' + price + '&src=' + src + '&id=' + id + '&wish=' + wish
    })
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
  goCart:function(event){                                  
    var that = this;                              
    var idx = event.currentTarget.dataset.id;
    var list = this.data.list;
    var info = list[idx];
    var id = info.id;
    var code;
    var proNum;
    var flag = true;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
          wx.login({
              success:function(r){
                    that.setData({
                      flagCart:false
                    });
                    code = r.code;
                    wx.request({
                      url:cartListUrl,
                      method:'GET',
                      data:{
                        code:code,
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
                                          wx.switchTab({
                                          url: '../../cart/cartlist/cartlist'
                                          })
                                    }
                                  });
                            }
                        });
                      }
                    });
              }
          });    
      },
      fail:function(){
        wx.showModal({
          title: '提示',
          content: '请到个人中心设置收货地址',
          success: function(res) {
            if (res.confirm) {
              wx.navigateTo({
                url: '../personal/address/addressFill/addressFill'
              })
            }
          }
        })
      }
    }); 
  },
  onLoad:function(options){
    page = 1;
    var that = this;
    var id = options.id;
    this.setData({
      actionList:id
    });
    loadMore(that);
  },
  onReachBottom:function(){
      if(flag){
         var that = this;
         loadMore(that);
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

  },
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})