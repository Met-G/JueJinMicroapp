const { getArticleById } = require('../../fake-api/index.js')
let time = require('../../time.js')
let historyID = []
Page({
  data: {

  },
  toArticle(e) {
    let articleID = this.data.articles[e.target.dataset.id].article_id
    tt.navigateTo({
      url: '../article/article?articleID=' + articleID
    });
  },
  onLoad: function (options) {
    let articles = []
    historyID = tt.getStorageSync('history');
    historyID.forEach(history => {
      getArticleById(history).then(res => {
        articles.push(res.data.article)
        this.setData({
          articles: articles
        })
      });
    })
  }
})