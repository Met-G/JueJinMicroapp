const app = getApp()
const { getArticles } = require('../../fake-api/index.js')
const { categories } = require('../../fake-api/data/categories.js')
let time = require('../../time.js')

Page({
  data: {
    currentTab: 0,
    currentCategory: 0,
    feed: [
      '推荐',
      '后端',
      '前端',
      'Android',
      'iOS'
    ],
    categories
  },

  switchTab(e) {
    var that = this
    if (this.data.currentTab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currentTab: e.target.dataset.id
      })
    }
  },

  swiperChange(e) {
    var that = this
    that.setData({
      currentTab: e.detail.current
    })
    getArticles(this.data.currentTab).then(res => {
      // 获取创建时间
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        this.setData({
          ['feed[' + this.data.currentTab + ']']: res.data.articles
        })
      })
      this.setData({
        currentCategory: this.data.currentTab
      })
    })
    tt.setNavigationBarTitle({
      title: String(this.data.categories[this.data.currentTab].category_name)
    })
  },

  switchCategory(e) {
    if (this.data.currentCategory === e.target.dataset.secondId) {
      return false
    } else {
      this.setData({
        currentCategory: e.target.dataset.secondId
      })
    }
    console.log(e)
    getArticles(this.data.currentCategory).then(res => {
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        this.setData({
          ['feed[' + this.data.currentTab + ']']: res.data.articles
        })
      })
    })
  },

  onLoad() {
    //获取文章数据
    getArticles().then(res => {
      // 获取创建时间
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        this.setData({
          ['feed[' + this.data.currentTab + ']']: res.data.articles
        })
      })
    })

    /*let temp = []
    getArticles().then(res => {
      res.data.articles.forEach(article => {
        temp.push(article.article_info)
      });
    })
    this.setData({
      article_infos: temp
    })
    console.log(this.data)
    */

  },

  toArticle(e) {
    let articleID = this.data.feed[this.data.currentTab][e.target.dataset.id].article_id
    tt.navigateTo({
      url: '../article/article?articleID=' + articleID
    });
  }

});
