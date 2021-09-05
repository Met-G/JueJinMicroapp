// d:\TTMircroApp\test_01\pages\search\search
Page({
  data: {
    message: '搜索文章/小册/标签/用户',
    title: ['文章/小册/标签/用户', '文章', '小册', '标签', '用户'],
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