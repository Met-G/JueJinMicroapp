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

})