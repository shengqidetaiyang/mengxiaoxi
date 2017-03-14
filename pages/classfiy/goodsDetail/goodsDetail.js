// pages/classfiy/goodsDetail/goodsDetail.js
var url = require('../../../config').produceDetailsUUrl;
var wishUrl = require('../../../config').wxAddWishListUrl;
var cartUrl = require('../../../config').wxAddCartUrl;
var loginUrl = require('../../../config').loginUrl;
var adressUrl = require('../../../config').wxMyAddresListUrl;
var footprint = function(m,b,c){
  var flag = true;
  var flagB = true;
  var a;
  if(c){
    flagB = false;
  };
  if(flagB){
   a = m[m.length -1];
 }
 else{
   m[m.length] = [];
   a = m[m.length - 1];
 };
 for(var i = 0;i < a.length;i++){
  if(parseInt(a[i].id) == parseInt(b.id)){
    flag = false;
  }
};
if(flag){
  a.push(b);
};
};
var dateDeal = function(a){
  var year = a.getFullYear();
  var month = a.getMonth() + 1;
  var day = a.getDate();
  var date = day + '/' + month + '/' + year;
  return date; 
}
Page({
  data:{
    goodsChoose:false,
    count:1,
    goodsChooseCart:false,
    countCart:1,
    dealFlag:true,
    dataFlag:true
  },
  onLoad:function(options){
    var that = this;
    var id = wx.getStorageSync('currentGoodsId');
    this.setData({
      dataFlag:false
    });

    wx.login({
      success:function(r){
          wx.request({
            url:loginUrl,
            method:'GET',
            data:{
              code:r.code,
            },
            header:{
              'Accept':"application/json"
            },
            success:function(r){
                if(r.data.code == 1){
                    wx.login({
                      success:function(r){
                        wx.login({
                          success:function(r){
                             wx.request({
                              url:url,
                              method:'GET',
                              data:{
                                code:r.code,
                                id:id,
                              },
                              header:{
                                'Accept':'application/json'
                              },
                              success:function(res){
                                    var ops = res.data[0];
                                    var trace = wx.getStorageSync("trace")||[];
                                    var traceDate = wx.getStorageSync("traceDate")||[];
                                    var nowDate = new Date();
                                    var nowDateValue = dateDeal(nowDate);
                                    if(traceDate.length == 0){
                                      footprint(trace,ops,true);
                                      traceDate.push(nowDateValue);
                                    }
                                    else{
                                      if(nowDateValue == traceDate[traceDate.length - 1]){
                                        footprint(trace,ops,false);
                                      }
                                      else{
                                        footprint(trace,ops,true);
                                        traceDate.push(nowDateValue);
                                      }
                                    }
                                    wx.setStorageSync("trace",trace);
                                    wx.setStorageSync("traceDate",traceDate);

                                   that.setData({
                                    newProduce: res.data[0],
                                    info:res.data[0].info,
                                    dataFlag:true           
                                  })                                      
                              }
                             }); 
                          }
                        });
                      }
                    });
                }
                else if(r.data.code == 2){
                    wx.request({
                      url: url,
                      method: 'GET',
                      data: {
                        id:id,
                      },
                      header: {
                        'Accept': 'application/json'
                      },
                      success: function(res) {
                        var ops = res.data[0];
                        var trace = wx.getStorageSync("trace")||[];
                        var traceDate = wx.getStorageSync("traceDate")||[];
                        var nowDate = new Date();
                        var nowDateValue = dateDeal(nowDate);
                        if(traceDate.length == 0){
                          footprint(trace,ops,true);
                          traceDate.push(nowDateValue);
                        }
                        else{
                          if(nowDateValue == traceDate[traceDate.length - 1]){
                            footprint(trace,ops,false);
                          }
                          else{
                            footprint(trace,ops,true);
                            traceDate.push(nowDateValue);
                          }
                        }
                        wx.setStorageSync("trace",trace);
                        wx.setStorageSync("traceDate",traceDate);

                        that.setData({
                          newProduce: res.data[0],
                          info:res.data[0].info,
                          dataFlag:true            
                        })                
                      }            
                    })  
                }
            }
          });
      }
    });     
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){

  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  goIndex:function(){
    wx.switchTab({
      url:'../../index/index'
    })
  },
  goCart:function(){
    wx.login({
      success: function (r) {
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
         if(user.code=='2'){
          wx.navigateTo({
            url: '/pages/register/index'
          }) 
        }else if(user.code=='1'){
          wx.switchTab({
            url:'../../cart/cartlist/cartlist'
          })
        }  
      }            
    })
     }
   });
  },
  confirmBuy:function(){
    var that = this;
    this.setData({
      dealFlag:false
    });
    wx.login({
      success: function (r) {
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
           if(user.code=='2'){
            wx.navigateTo({
              url: '/pages/register/index'
            });
            that.setData({
              dealFlag:true
            });
          }else if(user.code=='1'){
            wx.login({
              success: function(res){
                wx.request({
                  url: adressUrl,
                  data: {
                    code:res.code,
                  },
                  method: 'GET', 
                  success: function(res){
                    if(res.data.code == 1){
                      that.setData({
                        dealFlag:true
                      });
                      wx.showModal({
                        title: '提示',
                        content: '请到地址栏设置地址',
                        success: function(res) {
                          if (res.confirm) {
                            wx.navigateTo({
                              url: '/pages/personal/address/address'
                            })              
                          }
                        }
                      })
                    }
                    else{
                      var dis = that.data.goodsChoose;
                      dis = !dis;
                      that.setData({
                        goodsChoose:dis,
                        dealFlag:true
                      }) 
                    } 
                  }
                })
              }
            });  
          }  
      }            
    })
     }
   });        
  },
  confirmBuyCart:function(){
    var that = this;
    this.setData({
      dealFlag:false
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
          that.setData({
            dealFlag:true
          });
          wx.navigateTo({
            url: '/pages/register/index'
          }) 
        }else if(user.code=='1'){
          var dis = that.data.goodsChooseCart;
          dis = !dis;
          that.setData({
            goodsChooseCart:dis,
            dealFlag:true
          })   
        }  
      }            
    })
     }
   });         
  },
  confirm:function(){
    var name = this.data.newProduce.name;
    var price = this.data.newProduce.price_true;
    var src = this.data.newProduce.produce_img;
    var count = this.data.count;
    var id = this.data.newProduce.id;
    var dis = this.data.goodsChoose;
    dis = !dis;
    this.setData({
      goodsChoose:dis
    });
    var goPayment = {
      name:name,
      price:price,
      src:src,
      count:count,
      id:id
    }
    wx.setStorageSync("goPayment",goPayment);
    wx.navigateTo({
      url: '../../cart/payment/payment'
    })
  },
  confirmCart:function(){
    var name = this.data.newProduce.name;
    var produce_img = this.data.newProduce.produce_img;
    var price_true = this.data.newProduce.price_true;
    var id = this.data.newProduce.id;
    var flag = true;
    var produce_num = this.data.countCart;
    var num;
    var obj = {
      'name':name,
      'produce_img':produce_img,
      'price_true':price_true,
      'produce_num':produce_num,
      'id':id,
      'flag':true
    }
    var cart = wx.getStorageSync('cart');
    for(var i = 0;i < cart.length;i++){
      if(cart[i].id == obj.id){
        cart[i].produce_num = parseInt(cart[i].produce_num) + parseInt(obj.produce_num);
        num = parseInt(cart[i].produce_num);
        flag = false;
        wx.login({
          success:function(r){
            wx.request({
              url:cartUrl,
              method:'GET',
              data:{
                code:r.code,
                id:id,
                produce_num:num,
              },
              success:function(r){
                  console.log(r);
              }
            });
          }
        })
      }
    }
    if(flag){
      wx.login({
        success:function(r){
          wx.request({
            url:cartUrl,
            method:'GET',
            data:{
              code:r.code,
              id:id,
              produce_num:produce_num,
            },
            success:function(r){

            }
          });
        }
      })
    }
    wx.switchTab({
      url: '../../cart/cartlist/cartlist'
    })
  },
  minus:function(){
    var count = this.data.count;
    if(count > 1){
      count--;
    }
    else{
      wx.showModal({
        title: '提示',
        content: '数量不能少于1个'
      })      
    }
    this.setData({
      count:count
    })
  },
  plus:function(){
    var count = this.data.count;
    count++;
    this.setData({
      count:count
    })
  },
  minusCart:function(){
    var countCart = this.data.countCart;
    if(countCart > 1){
      countCart--;
    }
    else{
      wx.showModal({
        title: '提示',
        content: '数量不能少于1个'
      })      
    }
    this.setData({
      countCart:countCart
    })
  },
  plusCart:function(){
    var countCart = this.data.countCart;
    countCart++;
    this.setData({
      countCart:countCart
    })   
  },
  mengHide:function(){
    var dis = this.data.goodsChoose;
    dis = !dis;
    this.setData({
      goodsChoose:dis
    })    
  },
  mengHideCart:function(){
    var disCart = this.data.goodsChooseCart;
    disCart = !disCart;
    this.setData({
      goodsChooseCart:disCart
    })
  },
  getHeart:function(event){
    var newProduce = this.data.newProduce;
    var dis = newProduce.is_wish;
    var id = newProduce.id;
    if(dis == 1){
      dis = 0;
    }
    else{
      dis = 1;
    }
    newProduce.is_wish = dis;
    this.setData({
      newProduce:newProduce
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
                  console.log("点击成功");
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
  onShareAppMessage: function () {
    return {
      title: '萌小熹',
      path: '/pages/index/index'
    }
  }
})