// 时间转换函数
function timeTrans(timestamp) {
    let date = new Date()
    date.setTime(timestamp * 1000)
    return date
}

function timeAgo(time) {
    let now = new Date()
    let years = now.getFullYear() - time.getFullYear()
    let months = now.getMonth() - time.getMonth()
    let weeks = 0
    let dates = now.getDate() - time.getDate()
    let hours = now.getHours() - time.getHours()
    let minutes = now.getMinutes() - time.getMinutes()
    let seconds = now.getSeconds() - time.getSeconds()
    if (years > 0) {
        if (months < 0) {
            years--
            months += 12
            if (dates < 0) {
                months--
            }
        } else if (months == 0) {
            if (dates < 0) {
                years--
                months = 11
            }
        }
    } else {
        if (months > 1) {
            if (dates < 0) {
                months--
            }
        } else if (months == 1) {
            if (dates < 0) {
                months--
                dates += 30
                weeks = Math.floor(dates / 7)
            }
        } else if (months == 0) {
            if (dates > 7) {
                weeks = Math.floor(dates / 7)
            } else if (dates == 1) {
                if (hours < 0) {
                    dates--
                    hours += 24
                }
            } else if (dates == 0) {
                if (hours == 1) {
                    if (minutes < 0) {
                        hours--
                        minutes += 60
                    }
                } else if (hours == 0) {
                    if (minutes == 1) {
                        if (seconds < 0) {
                            minutes--
                            seconds = '刚刚'
                        }
                    } else if (minutes == 0) {
                        seconds = '刚刚'
                    }
                }
            }
        }
    }
    if (years) return years + '年前'
    else if (months) return months + '月前'
    else if (weeks) return weeks + '周前'
    else if (dates) return dates + '天前'
    else if (hours) return hours + '小时前'
    else if (minutes) return minutes + '分钟前'
    else return '刚刚'
}

module.exports.timeTrans = timeTrans
module.exports.timeAgo = timeAgo