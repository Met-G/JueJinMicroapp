const { getArticleById } = require('../../fake-api/index.js')
const { getCommentsByArticleId } = require('../../fake-api/index.js')
let time = require('../../time.js')

Page({
  data: {
    articleContent: '',
    location: 'author'
  },

  //跳转到评论区
  toComments() {
    this.setData({
      location: 'comments'
    })
  },
  // 返回顶部
  toAuthor() {
    this.setData({
      location: 'author'
    })
  },
  clearLocation() {
    this.setData({
      location: ''
    })
  },
  // 跳转到评论页
  toCommentsPage(e) {
    let commentID = this.data.comments[e.target.dataset.id].comment_id
    tt.navigateTo({
      url: '../comments/comments?commentID=' + commentID
    });
  },
  previewImage(e) {
    tt.previewImage({
      urls: [this.data.articleInfo.cover_image], // 图片地址列表
      success: (res) => {
        console.log(`previewImage调用成功`);
      }
    });
  },
  onLoad(options) {
    // 通过ID获取文章
    getArticleById(options.articleID).then(res => {
      this.setData({
        userInfo: res.data.article.author_user_info,
        articleContent: res.data.article.article_content,
        articleInfo: res.data.article.article_info,
        categoryInfo: res.data.article.category_info
      })
      tt.setNavigationBarTitle({
        title: this.data.articleInfo.title,
        fail(res) {
          console.log(`setNavigationBarTitle 调用失败:`, res.errMsg);
        },
      })
    })
    // 获取评论数据
    getCommentsByArticleId(options.articleId, 0, 20).then(res => {
      // 获取创建时间
      res.data.comments.forEach(comment => {
        let ctime = Number(comment.comment_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        comment.comment_info.time_ago = atime
        this.setData({
          comments: res.data.comments
        })
      })
    })
  },
  onShareAppMessage(res) {
    return {
      title: this.data.articleInfo.title,
      imageUrl: "/img/logo_round.png",
      success() {
        console.log("分享成功");
      },
      fail(e) {
        console.log("分享失败", e);
      },
    };
  }
})