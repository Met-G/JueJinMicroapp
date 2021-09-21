const app = getApp()
const { getArticles } = require('../../fake-api/index.js')
const { categories } = require('../../fake-api/data/categories.js')
let time = require('../../time.js')
let offset = {
  0: 10,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  11: 0,
  12: 0,
  13: 0,
  21: 0,
  22: 0,
  23: 0,
  31: 0,
  32: 0,
  33: 0,
  41: 0,
  42: 0,
  43: 0
}
let articles = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
  11: [],
  12: [],
  13: [],
  21: [],
  22: [],
  23: [],
  31: [],
  32: [],
  33: [],
  41: [],
  42: [],
  43: []
}
let history = []

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
    isLoading: false,
    location: '',
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
    if (articles[this.data.currentTab][0]) {
      this.setData({
        ['feed[' + this.data.currentTab + ']']: articles[this.data.currentTab]
      })
    } else {
      getArticles(this.data.currentTab, 'hot', 0, 10).then(res => {
        // 获取创建时间
        res.data.articles.forEach(article => {
          let ctime = Number(article.article_info.ctime)
          let atime = time.timeAgo(time.timeTrans(ctime))
          article.article_info.time_ago = atime
          tt.getNetworkType({
            success(res) {
              if (res.networkType == 'WiFi') {

              } else {
                article.article_info.cover_image = 'https://img0.baidu.com/it/u=3080016857,1583514494&fm=11&fmt=auto&gp=0.jpg'
              }
            },
            fail(res) {
              console.log('call error')
            }
          })
        })
        articles[this.data.currentTab] = res.data.articles
        this.setData({
          ['feed[' + this.data.currentTab + ']']: articles[this.data.currentTab]
        })
      })
    }
    this.setData({
      currentCategory: this.data.currentTab
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
    getArticles(this.data.currentCategory, 'hot', offset[this.data.currentCategory], 10).then(res => {
      // 获取创建时间
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        tt.getNetworkType({
          success(res) {
            if (res.networkType == 'WiFi') {

            } else {
              article.article_info.cover_image = 'https://img0.baidu.com/it/u=3080016857,1583514494&fm=11&fmt=auto&gp=0.jpg'
            }
          },
          fail(res) {
            console.log('call error')
          }
        })
      })
      Array.prototype.push.apply(articles[this.data.currentCategory], res.data.articles)
      this.setData({
        ['feed[' + this.data.currentTab + ']']: articles[this.data.currentCategory],
        location: 'firstCard'
      })
      offset[this.data.currentCategory] += 10
    })
  },

  toArticle(e) {
    let articleID = this.data.feed[this.data.currentTab][e.target.dataset.id].article_id
    history.push(articleID)
    tt.setStorage({
      key: 'history',
      data: history,
      fail(res) {
        console.log(`setStorage调用失败`)
      },
    })
    tt.navigateTo({
      url: '../article/article?articleID=' + articleID
    });
  },

  clearLocation() {
    this.setData({
      location: ''
    })
  },

  loadmore() {
    this.setData({
      isLoading: true,
    })
    getArticles(this.data.currentCategory, 'hot', offset[this.data.currentCategory], 10).then(res => {
      // 获取创建时间
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        tt.getNetworkType({
          success(res) {
            if (res.networkType == 'WiFi') {

            } else {
              article.article_info.cover_image = 'https://img0.baidu.com/it/u=3080016857,1583514494&fm=11&fmt=auto&gp=0.jpg'
            }
          },
          fail(res) {
            console.log('call error')
          }
        })
      })
      Array.prototype.push.apply(articles[this.data.currentCategory], res.data.articles)
      this.setData({
        ['feed[' + this.data.currentTab + ']']: articles[this.data.currentCategory]
      })
      offset[this.data.currentCategory] += 10
    })
  },

  onLoad() {
    //获取文章数据
    getArticles().then(res => {
      res.data.articles.forEach(article => {
        let ctime = Number(article.article_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        article.article_info.time_ago = atime
        tt.getNetworkType({
          success(res) {
            if (res.networkType == 'WiFi') {

            } else {
              article.article_info.cover_image = 'https://img0.baidu.com/it/u=3080016857,1583514494&fm=11&fmt=auto&gp=0.jpg'
            }
          },
          fail(res) {
            console.log('call error')
          }
        })
      })
      articles[0] = res.data.articles
      this.setData({
        ['feed[' + this.data.currentTab + ']']: res.data.articles
      })
    })
  }
});
