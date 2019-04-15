Page({

  /**
   * 页面的初始数据，只有当前页面可以访问
   */
  data: {
    longitude0: 0,
    latitude0: 0,
    controls: [],
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    wx.getLocation({
      success: function(res) {
        that.setData({
          longitude0: res.longitude,
          latitude0: res.latitude
        })
      },
    })
    wx.getSystemInfo({
      success: function(res) {
        var windWidth = res.windowWidth;
        var windHeight = res.windowHeight;
        that.setData({
          controls: [{
              id: 1,
              iconPath: '/images/p1.png',
              position: {
                width: 40,
                height: 40,
                left: 40,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 2,
              iconPath: '/images/p2.png',
              position: {
                width: 100,
                height: 40,
                left: (windWidth - 100) / 2,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 3,
              iconPath: '/images/p3.png',
              position: {
                width: 40,
                height: 40,
                left: windWidth - 40,
                top: windHeight - 100,
              },
              clickable: true,
            },
            {
              id: 4,
              iconPath: '/images/p4.png',
              position: {
                width: 40,
                height: 40,
                left: windWidth - 40,
                top: windHeight - 60,
              },
              clickable: true,
            },
            {
              id: 5,
              iconPath: '/images/p4.png',
              position: {
                width: 40,
                height: 40,
                left: 20,
                top: 20,
              },
              clickable: true,
            },

          ]
        })
      },
    })
  },
  controltap: function(e) {
    var cid = e.controlId;
    var that = this;
    switch (cid) {
      case 1:
        {
          this.mapContext.moveToLocation();
          break;
        }
      case 2:
        {
          //根据用户状态进入不同页面
          var status = getApp().globalData.status;
          //跳转到注册页面
          if (status == 0) {
            wx.navigateTo({
              url: '../register/register', //..是上级目录
            })
          }
          break;
        }
      case 5:
        {
          //获取当前已有车辆
          // var bikes = that.data.markers;
          //获取到移动后的位置的中心点
          this.mapContext.getCenterLocation({
            success: function(res) {
              var log = res.longitude;
              var lat = res.latitude;
              // //将车辆设置到移动后的位置
              // bikes.push({
              //   iconPath: '/images/bike.png',
              //   width: 40,
              //   height: 40,
              //   longitude: log,
              //   latitude: lat
              // });
              // that.setData({
              //   markers: bikes
              // })
              //发送请求：将添加的单车数据发送到后台（SpringBoot）
              wx.request({
                url: 'http://localhost:80/addBike',
                data: {
                  longitude: log,
                  latitude: lat
                },
                method: 'POST',
                success: function(res) {
                  console.log(res)

                }
              })
            }
          })
        }
    }
  },
  regionchange: function(e) {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    this.mapContext = wx.createMapContext('myMap');
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})