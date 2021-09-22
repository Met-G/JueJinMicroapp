Page({
  data: {

  },

  toLogin(e) {
    tt.navigateTo({
      url: '../login/login'
    });
  },

  toLottery(e) {
    tt.navigateTo({
      url: '../lottery/lottery'
    });
  },

  toHistory(e) {
    tt.navigateTo({
      url: '../history/history'
    });
  },

  onLoad: function (options) {
  },
  
  onShow() {
    let history = tt.getStorageSync('history');
    history = Array.from(new Set(history));
    tt.setStorage({
      key: 'history',
      data: history,
      fail(res) {
        console.log(`setStorage调用失败`)
      },
    })
    let historyNum = history.length;
    this.setData({
      historyNum: historyNum
    })
  }

})