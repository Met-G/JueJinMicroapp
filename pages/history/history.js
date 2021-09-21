const { getArticleById } = require('../../fake-api/index.js')
let time = require('../../time.js')
let historyID = []
let articles = []

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
		historyID = tt.getStorageSync('history');
		historyID = Array.from(new Set(historyID))
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