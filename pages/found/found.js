const { getArticles } = require('../../fake-api/index.js')
let time = require('../../time.js')
let offset = 10
let articleList = []

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
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
      })
      articleList = res.data.articles
      this.setData({
        articles: res.data.articles
      })
    })
  },

  onReachBottom() {
    getArticles(0, 'hot', offset, 10).then(res => {
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
      })
      articleList.push.apply(articleList, res.data.articles)
      this.setData({
        articles: articleList
      })
      offset += 10
    })
  }

})