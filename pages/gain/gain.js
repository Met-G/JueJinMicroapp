Page({
  data: {
    currentTab: 0,
    goods: ['随机限量徽章', '掘金新款T恤', '乐高海洋巨轮', 'Switch', 'Yoyo抱枕', '掘金马克杯'],
    imageUrl: ['https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab31c183950541d4a0731c0b8765b173~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp']
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

  toLottery(e) {
    tt.navigateBack()
  },

  onLoad: function (options) {
    tt.getStorage({
      key: 'gain', // 缓存数据的key
      success: (res) => {
        let gainList = res.data
        let drawList = gainList.slice(1, 7)
        let isEmpty = true
        console.log(gainList)
        drawList.forEach(draw => {
          if (draw != 0) isEmpty = false
        })
        this.setData({
          gainList: gainList,
          drawList: drawList,
          isEmpty: isEmpty
        })
      }
    })
    tt.getStorage({
      key: 'date', // 缓存数据的key
      success: (res) => {
        let dateList = res.data.slice(1,8)
        for (let i = 0; i < 7; i++) {
          if (dateList[i]) dateList[i] = dateList[i].substring(0, 10)
        }
        this.setData({
          dateList: dateList
        })
        console.log(this.data.dateList)
      }
    });
  }
})