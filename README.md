

# 掘金小程序

---

这是我仿照掘金APP开发的字节小程序，由于找不到掘金的登录接口，所以无法实现登录及帐号相关功能。数据是由字节技术中台提供的，为了避免版权问题，其文章内容全部是字节自己的文章，所以会出现文不对题的情况，请谅解。

> 扫描下方二维码预览

![bc9f611de043f5253e5bb9c0f95288a](C:\Users\mzy01\AppData\Local\Temp\WeChat Files\bc9f611de043f5253e5bb9c0f95288a.png)

主要实现了以下页面

## 首页

首页有5个Tab，分别为“推荐”、“后端”、“前端”、“Android”、“iOS”，除推荐外，其他四个Tab页面各有三个二级Tab。

==亮点==：

- 可以点击顶部tabBar切换tab，也可以滑动切换
- feed流中的文章时间“1月前”之类都是真是时间，这里有时间戳的转化和发布时间的判断

<img src="file:///C:\Users\mzy01\Documents\Tencent Files\609481556\Image\C2C\58BD8A51C1B56462DB7EFFAFDAC948C1.jpg" alt="img" style="zoom: 33%;" /><img src="file:///C:\Users\mzy01\Documents\Tencent Files\609481556\Image\C2C\56D9CB6BD721965D5B70B9C50FDBDA53.jpg" alt="img" style="zoom:33%;" />

## 文章

文章数据由字节技术中台提供，为了避免版权问题，其文章内容全部是字节自己的文章，所以会出现文不对题的情况，请谅解。

==亮点==：

- 可以点击评论图标跳转到评论区
- 可以点击右下角的掘金Logo返回顶部

<img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-223818.jpg" alt="Screenshot_20210905-223818" style="zoom:33%;" />

## 评论

实现了二级评论，可以点击进入评论页

==亮点==：

- 赞数、回复数、回复时间都是真实的
- 当用户的title过长时，可以隐藏超出部分

<img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-221835(1).jpg" alt="Screenshot_20210905-221835(1)" style="zoom: 25%;" /><img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-221846.jpg" alt="Screenshot_20210905-221846" style="zoom: 25%;" />

## 发现

基本与首页推荐一样，搜索功能暂未实现

<img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-221604.jpg" alt="Screenshot_20210905-221604" style="zoom:33%;" />

 ## 我的

由于无法访问掘金登录接口，所以没有实现登录相关功能，这一页只有框架，点击“签到嬴好礼”可以进入抽奖页。

<img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-224347.jpg" alt="Screenshot_20210905-224347" style="zoom:33%;" />

## 抽奖

抽奖仿照掘金APP，九宫格变换速度先加速再减速，整体较为流畅。

==亮点==：

- 抽奖过程中，抽奖键是不可用的，必须等抽奖结束才能进行下一次抽奖
- 获得的奖品是存在本地缓存里的，可以点击“我的收获”查看

<img src="C:\Users\mzy01\Documents\Tencent Files\609481556\FileRecv\Screenshot_20210905-221857.jpg" alt="Screenshot_20210905-221857" style="zoom:33%;" />

