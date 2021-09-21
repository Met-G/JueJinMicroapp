// d:\TTMircroApp\test_01\pages\login\login
Page({
  data: {

  },
  onLoad: function (options) {

  },
  login(res) {
    tt.login({
      force: true,
      url:'https://developer.toutiao.com/api/apps/token',
      success(res) {
        console.log(`login调用成功${res.code} ${res.anonymousCode}`);
      },
      fail(res) {
        console.log(`login调用失败`)
      },
    });
  },
})