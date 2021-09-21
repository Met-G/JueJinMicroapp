// d:\TTMircroApp\test_01\pages\hotspot\hotspot
Page({
  data: {
    currentTab: 0,
  },
  
  switchTab(e) {
    var that = this;
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      that.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },

  swiperChange(e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current,
    })
  },

  onLoad: function (options) {

  }
})