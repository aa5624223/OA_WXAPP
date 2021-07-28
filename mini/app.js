// app.js
App({
  onLaunch(options) {
    // 判断是否由分享进入小程序
    if (options.scene == 1007 || options.scene == 1008) {
      this.globalData.share = true
    } else {
      this.globalData.share = false
    };
    wx.getSystemInfo({
      success: (res) => {
        this.globalData.height = res.statusBarHeight;
        console.dir(res.statusBarHeight);
      }
    })
  },
  globalData: {
    userInfo: null
  },
})
