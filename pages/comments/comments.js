const { getCommentById } = require('../../fake-api/index.js')
let time = require('../../time.js')

Page({
  data: {

  },
  onLoad(options) {
    getCommentById(options.commentID).then(res => {
      res.data.comment.reply_infos.forEach(comment => {
        let ctime = Number(comment.reply_info.ctime)
        let atime = time.timeAgo(time.timeTrans(ctime))
        comment.reply_info.time_ago = atime
      })
      this.setData({
        commentInfo: res.data.comment.comment_info,
        userInfo: res.data.comment.user_info,
        replys: res.data.comment.reply_infos
      })
    })
  }
})