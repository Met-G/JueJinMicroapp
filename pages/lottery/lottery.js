let index = 0
let interval
let num

Page({
  data: {
    itemColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
    gainList: [0, 0, 0, 0, 0, 0, 0, 0],
    dateList: ['', '', '', '', '', '', '', ''],
    imageUrl: ['https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ed6a7619934144882d841761b63d3c~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71c68de6368548bd9bd6c8888542f911~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5bf91038a6384fc3927dee294a38006b~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aabe49b0d5c741fa8d92ff94cd17cb90~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4decbd721b2b48098a1ecf879cfca677~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33f4d465a6a9462f9b1b19b3104c8f91~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab31c183950541d4a0731c0b8765b173~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp', 'https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4ce25d48b8405cbf5444b6195928d4~tplv-k3u1fbpfcp-no-mark:0:0:0:0.awebp'],
    isDisabled: false
  },
  // 跳转规则页
  toRule(e) {
    tt.navigateTo({
      url: '../rule/rule'
    })
  },
  // 跳转收获页
  toGain(e) {
    tt.navigateTo({
      url: '../gain/gain'
    })
  },
  // 抽奖逻辑
  gainNum() {
    const weight = [7489, 5, 5, 1, 1, 5, 5, 2489]
    const reducer = (accumulator, currentValue) => accumulator + currentValue
    const total = weight.reduce(reducer)
    let randomNum = Math.random() * total
    for (let i = 0; i < weight.length; i++) {
      if (randomNum < weight[i]) {
        return i
      } else {
        randomNum -= weight[i]
      }
    }
  },
  // 获得奖品
  gainGoods(num) {
    const goods = ['66矿石', '随机限量徽章', '掘金新款T恤', '乐高海洋巨轮', 'Switch', 'Yoyo抱枕', '掘金马克杯', 'Bug']
    return goods[num]
  },
  startLottery(e) {
    let that = this
    let isDisabled = that.data.isDisabled
    if (isDisabled) {
      return
    } else {
      this.setData({
        isDisabled: true
      })
      interval = setInterval(() => {
        if (index > 7) {
          index = 0
          that.data.itemColor[7] = '#fff'
        } else if (index != 0) {
          that.data.itemColor[index - 1] = '#fff'
        }
        that.data.itemColor[index] = '#fece8a'
        that.setData({
          itemColor: that.data.itemColor,
        })
        index++
      }, 100)
      num = this.gainNum()
      setTimeout(() => {
        this.stop(num)
        index = 0
      }, 800)
    }
  },
  //num为中奖位置,需要停止时调用该方法
  stop(num) {
    let that = this
    clearInterval(interval)
    //初始化当前位置
    let current = -1
    let color = that.data.itemColor
    for (var i = 0; i < color.length; i++) {
      if (color[i] == '#fece8a') {
        current = i
      }
    }
    this.slowDown(num, index, 3, 1)
  },
  slowDown(num, index, time, splittime) {
    var that = this
    setTimeout(() => {
      if (index > 7) {
        index = 0
        that.data.itemColor[7] = '#fff'
      } else if (index != 0) {
        that.data.itemColor[index - 1] = '#fff'
      }
      //当前位置为选中状态
      that.data.itemColor[index] = '#fece8a'
      that.setData({
        itemColor: that.data.itemColor,
      })
      //如果旋转时间过短或者当前位置不等于中奖位置则递归执行,直到旋转至中奖位置
      if (time < 320 || index != num) {
        //越来越慢
        if (time > 60) splittime++
        time += splittime
        index++
        that.slowDown(num, index, time, splittime)
      } else {
        index = 0
        let date = new Date()
        that.data.dateList[num] = date.toLocaleDateString()
        console.log(that.data.dateList)
        let gain = this.gainGoods(num)
        that.data.gainList[num]++
        tt.setStorage({
          key: 'gain',
          data: that.data.gainList,
          fail(res) {
            console.log(`setStorage调用失败`)
          },
        })
        tt.setStorage({
          key: 'date',
          data: that.data.dateList,
          fail(res) {
            console.log(`setStorage调用失败`)
          },
        })
        setTimeout(() => {
          tt.showModal({
            title: '恭喜中奖！',
            content: `恭喜获得${gain}`,
            confirmText: '再抽一次',
            cancelText: '查看奖励',
            success(res) {
              that.setData({
                itemColor: ['#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff', '#fff'],
                isDisabled: false
              })
              if (res.cancel) {
                that.toGain()
              }
            }
          })
        }, 1000)
      }
    }, time)
  },

  onLoad: function (options) {

  }
})