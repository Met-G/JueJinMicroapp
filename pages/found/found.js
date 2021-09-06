const { getArticles } = require('../../fake-api/index.js')
let time = require('../../time.js')

Page({
  data: {

  },

  toArticle(e) {
    let articleID = this.data.articles[e.target.dataset.index].article_id
    tt.navigateTo({
      url: '../article/article?articleID=' + articleID
    });
  },

  toLottery(e) {
    tt.navigateTo({
      url: '../lottery/lottery'
    });
  },
  
  onLoad: function (options) {
    getArticles().then(res => {
      // 获取创建时间
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        this.setData({
          articles: res.data.articles
        })
      })
    })
  }
})