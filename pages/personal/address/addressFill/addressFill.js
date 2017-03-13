// pages/personal/address/addressFill/addressFill.js
var addressUrl = require('../../../../config').wxGetAreaUrl;
var addAdressUrl = require('../../../../config').wxAddAddresUrl;
var Data = require('../../../../data/ChineseCities.js');
Page({
  data: {
    "province": "省",
    "city": "市",
    "area": "区",
    "pickerSrc": "../../../../resources/right_arrow.png",
    "provinceFlag": false,
    "provinceIndex": 0,
    "provinceArray": [],
    "cityFlag": false,
    "cityIndex": 0,
    "cityArray": [],
    "cityDisabled": true,
    "areaFlag": false,
    "areaIndex": 0,
    "areaArray": [],
    "areaDisabled": true,
  },
  onLoad: function () {
    var that = this;
    // var provinceArray = []
    // for (var i = 0; i < Data.ChineseCities.length; i++) {
    //   provinceArray.push(Data.ChineseCities[i].name);
    // }
    // this.setData({
    //   provinceArray: provinceArray,
    // });
    wx.login({
      success: function(res){
        wx.request({
          url: addressUrl,
          data: {
            code:res.code,
            pid:0,
          },
          method: 'GET', 
          success: function(res){
            var provinceName = [];
            for(var i = 0;i < res.data.length;i++){
              provinceName.push(res.data[i].Name);
            }
            that.setData({
              provinceArray:provinceName,
              provinceA:res.data
            })
          }
        })
      }
    });
  },
  bindProvinceChange: function (e) {
    var that = this;
    var idx = e.detail.value;
    var provinceId = this.data.provinceA[idx];
    var cityName = []
    // for (var i = 0; i < Data.ChineseCities[e.detail.value].city.length; i++) {
    //   cityArray.push(Data.ChineseCities[e.detail.value].city[i].name);
    // }
    wx.login({
      success: function(res){
        wx.request({
          url: addressUrl,
          data: {
            code:res.code,
            pid:provinceId.Id,
          },
          method: 'GET', 
          success: function(res){
            for(var i = 0;i < res.data.length;i++){
              cityName.push(res.data[i].Name);
            }
            that.setData({
              cityArray:cityName,
              cityA:res.data
            })
          }
        })
      }
    });
    this.setData({
      provinceIndex: e.detail.value,
      provinceFlag: true,
      cityFlag: false,
      areaFlag: false,
      cityDisabled: false,
      areaDisabled: true
    })
  },
  bindCityChange: function (e) {
    // var areaArray = Data.ChineseCities[this.data.provinceIndex].city[e.detail.value].area
    var that = this;
    var idx = e.detail.value;
    var cityId = this.data.cityA[idx];  
    var areaName = [];
    wx.login({
      success: function(res){
        wx.request({
          url: addressUrl,
          data: {
            code:res.code,
            pid:cityId.Id,
          },
          method: 'GET', 
          success: function(res){
            for(var i = 0;i < res.data.length;i++){
              areaName.push(res.data[i].Name);
            }
            that.setData({
              areaArray:areaName,
              areaA:res.data
            })
          }
        })
      }
    }); 
    this.setData({
      cityIndex: e.detail.value,
      cityFlag: true,
      areaFlag: false,
      areaDisabled: false
    })
  },
  bindAreaChange: function (e) {
    this.setData({
      areaIndex: e.detail.value,
      areaFlag: true
    })
  },
  formSubmit: function (e) {
    var provinceIdx = e.detail.value.province;
    var cityIdx = e.detail.value.city;
    var areaIdx = e.detail.value.area;
    var provinceA = this.data.provinceA;
    var cityA = this.data.cityA;
    var areaA = this.data.areaA;
    var userName = e.detail.value.userName;
    var userNumber = e.detail.value.userNumber;
    var province = this.data.provinceArray[e.detail.value.province];
    var city = this.data.cityArray[e.detail.value.city];
    var area = this.data.areaArray[e.detail.value.area];
    var detailedAddress = e.detail.value.detailedAddress;
    var userAddress = province + city + area + detailedAddress;
    var res = /^1\d{10}$/
    var provinceId = provinceA[provinceIdx].Id;
    var cityId = cityA[cityIdx].Id;
    if(areaA[areaIdx]){
    var areaId = areaA[areaIdx].Id;    
    };
    if (userName == "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#ffa500",
        content: '请输入收货人名字'
      })
      }else if (!res.test(userNumber)||userNumber == "") {
        wx.showModal({
          title: '提示',
          showCancel: false,
          confirmColor: "#ffa500",
          content: '请输入正确的手机号码'
        })
    } else if (province == undefined) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#ffa500",
        content: '请选择省份'
      })
    } else if (city == undefined) {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#ffa500",
        content: '请选择城市'
      })
    } 
    else if (area == undefined ) {
      if( provinceIdx == 0 || provinceIdx == 1 || provinceIdx == 8){
        wx.redirectTo({
          url: "../address?userinfo=userinfo&userName=" + userName + "&userNumber=" + userNumber + "&userAddress=" + userAddress
        });
        var addressArr = wx.getStorageSync('userInfo')||[];;
        var userInfo = {
          userName: userName,
          userNumber: userNumber,
          userAddress: userAddress,
          userAddressDefault:false
        }
        addressArr.push(userInfo);
        wx.setStorageSync('userInfo', addressArr);
        wx.login({
          success: function(res){
            wx.request({
              url: addAdressUrl,
              data: {
                code:res.code,
                province:provinceId,
                city:cityId,
                detail:detailedAddress,
                is_default:1,
                name:userName,
                phone:userNumber,
              },
              method: 'GET', 
              success: function(res){
                console.log(res);
              }
            })
          }
        }); 
      }
      else{
        wx.showModal({
          title: '提示',
          showCancel: false,
          confirmColor: "#ffa500",
          content: '请选择区'
        })
      }
    } 
    else if (detailedAddress == "") {
      wx.showModal({
        title: '提示',
        showCancel: false,
        confirmColor: "#ffa500",
        content: '输入收货人详细地址'
      })
    } else {
      wx.login({
        success: function(res){
          wx.request({
            url: addAdressUrl,
            data: {
              code:res.code,
              province:provinceId,
              city:cityId,
              county:areaId,
              detail:detailedAddress,
              is_default:1,
              name:userName,
              phone:userNumber,
            },
            method: 'GET', 
            success: function(res){
              console.log(res);
            }
          })
        }
      }); 
    }
    var addressStatus = wx.getStorageSync("addressStatus");
    if(addressStatus == 0){
      wx.redirectTo({
        url: "../address"
      });      
    }
    else if(addressStatus == 2){
      wx.setStorageSync("addressStatus",0);
      wx.redirectTo({
        url: "/pages/personal/address/addressb/addressb"
      });  
    }
    else if(addressStatus == 1){
      wx.setStorageSync("addressStatus",0);
      wx.redirectTo({
        url: "/pages/personal/address/addressc/addressc"
      });  
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})