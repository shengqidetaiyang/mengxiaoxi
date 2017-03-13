// pages/cart/cart.js
var delUrl = require('../../../config').wxDelAllListUrl;
var cartUrl = require('../../../config').wxAddCartUrl;
var cartDelUrl =  require('../../../config').wxDelCartUrl;
var loginUrl = require('../../../config').loginUrl;
var adressUrl = require('../../../config').wxMyAddresListUrl;
var recul = function(a,b,c,d){
  for(var i = 0;i < a.length;i++){
    b += parseInt(a[i].produce_num);
    c += a[i].produce_num * a[i].price_true;
  }
  d.setData({
    cart:a,
    countTotal:b,
    priceTotal:c
  });   
};
var reculA = function(a){
  var cart = wx.getStorageSync('cart');
  var countTotal = 0;
  var priceTotal = 0;
  recul(cart,countTotal,priceTotal,a);
};
var selectCul = function(a,b){
  var countTotal = 0;
  var priceTotal = 0;
  for(var i = 0;i < a.length;i++){
    if(a[i].flag){
      countTotal += parseInt(a[i].produce_num);
      priceTotal += a[i].produce_num * a[i].price_true;
    }
  }
  b.setData({
    countTotal:countTotal,
    priceTotal:priceTotal
  });
};
var cartListUrl = require('../../../config').wxCartListUrl;
Page({
 data: {
  items: [
  {name: 'USA', value: '美国'},
  {name: 'CHN', value: '中国', checked: 'true'},
  {name: 'BRA', value: '巴西'},
  {name: 'JPN', value: '日本'},
  {name: 'ENG', value: '英国'},
  {name: 'TUR', value: '法国'},
  ],
  count:1,
  flag:true,
  countTotal:0,
  priceTotal:0,
  goCart:true,
  pageShow:false,
  buttonShow:false
},
minus:function(event){
  var cartBox = this.data.cart; 
  var ids = event.target.dataset.id;
  var produce_num = this.data.cart[ids].produce_num;
  var id = cartBox[ids].id;
  if(produce_num > 1){
    produce_num--;
  }
  else{
    wx.showModal({
      title: '提示',
      content: '数量不能少于1个'
    })      
  }
  cartBox[ids].produce_num = produce_num;
  this.setData({
    cart:cartBox
  })
  wx.setStorageSync('cart',cartBox);
  var that = this;
  reculA(that);
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
        success:function(res){
          console.log(res.data);
        }
      })

    }
  });
},
plus:function(event){
  var cartBox = this.data.cart; 
  var ids = event.target.dataset.id;
  var produce_num = this.data.cart[ids].produce_num;
  var id = cartBox[ids].id;
  produce_num++;
  cartBox[ids].produce_num = produce_num;
  this.setData({
    cart:cartBox
  })
  wx.setStorageSync('cart',cartBox);
  var that = this;
  reculA(that);
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
        success:function(res){
          console.log(res.data);
        }
      })

    }
  });
},
goPayment:function(){
  var that = this;
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
                    var cart = that.data.cart;
                    var idTemp = [];
                    for(var i = 0;i < cart.length;i++){
                      if(cart[i].flag == true){
                        idTemp.push(cart[i].id);
                      }
                    }
                    wx.setStorageSync("idTemp",idTemp);
                    if(that.data.priceTotal == 0){
                      wx.showModal({
                        title: '提示',
                        content: '请勾选商品',
                        success: function(res) {
                          if (res.confirm) {
                          }
                        }
                      })
                    }
                    else{
                      wx.navigateTo({
                        url:'../paymentCart/paymentCart'
                      })     
                    }
                  } 
                }
              })
            }
          });  
},
checkboxChange: function(e) {
  console.log('checkbox发生change事件，携带value值为：', e.detail.value)
},
selectAll:function(e){
  var flag = this.data.flag;
  var cart = this.data.cart;
  flag = !flag;
  for(var i = 0;i < cart.length;i++){
    cart[i].flag = flag;
  };
  this.setData({
    flag:flag,
    cart:cart
  });
  wx.setStorageSync('cart',cart);
  var that = this;
  selectCul(cart,that);
},
select:function(event){
  var cart = this.data.cart;
  var idx = event.currentTarget.dataset.id;
  var flag = cart[idx].flag;
  flag = !flag;
  cart[idx].flag = flag;
  this.setData({
    cart:cart
  })
  wx.setStorageSync('cart',cart);
  var that = this;
  selectCul(cart,that);
},
del:function(event){
  var cart = this.data.cart;
  var idx = event.currentTarget.dataset.id;
  var id = cart[idx].id;
  cart.splice(idx,1);
  this.setData({
    cart:cart
  });
  wx.setStorageSync("cart",cart);
  var that = this;
  wx.login({
    success:function(r){
      wx.request({         
        url: cartDelUrl,
        method: 'GET',
        data:{
          code:r.code,
          id:id,
        },
        success:function(res){
          console.log(res.data);
        }
      });
    }
  });
  reculA(that);   
},
onLoad:function(options){
  var that = this;
  this.setData({
    goCart:false
  });
  wx.login({
    success:function(r){
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
         console.log(user);
         if(user.code == '2'){
          that.setData({
            buttonShow:true,
          });
        }else if(user.code =='1'){
          that.setData({
            pageShow:true
          });
          wx.login({
            success:function(r){
              wx.request({         
                url: cartListUrl,
                method: 'GET',
                data:{
                  code:r.code,
                },
                header: {
                  'Accept': 'application/json'
                },
                success:function(res){
                  var list = res.data;
                  var cart = [];
                  for(var i = 0;i < list.length;i++){
                    var obj = {
                      name:list[i].name,
                      price_true:list[i].price_true,
                      produce_img:list[i].produce_img,
                      produce_num:list[i].produce_num,
                      id:list[i].id,
                      flag:true
                    }
                    cart.push(obj);
                  }
                  that.setData({
                    cart:cart,
                    goCart:true
                  });
                  wx.setStorageSync('cart',cart);
                  reculA(that);
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
onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var that = this;
    this.setData({
      goCart:false
    });
    wx.login({
      success:function(r){
        wx.request({
          url:loginUrl,
          method: 'GET',
          data: {
            code:r.code,
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
          }else if(user.code =='1'){
            wx.login({
              success:function(r){
                wx.request({         
                  url: cartListUrl,
                  method: 'GET',
                  data:{
                    code:r.code,
                  },
                  header: {
                    'Accept': 'application/json'
                  },
                  success:function(res){
                    var list = res.data;
                    var cart = [];
                    for(var i = 0;i < list.length;i++){
                      var obj = {
                        name:list[i].name,
                        price_true:list[i].price_true,
                        produce_img:list[i].produce_img,
                        produce_num:list[i].produce_num,
                        id:list[i].id,
                        flag:true
                      }
                      cart.push(obj);
                    }
                    that.setData({
                      cart:cart,
                      goCart:true
                    });
                    wx.setStorageSync('cart',cart);
                    reculA(that);
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
onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
})