const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {},
      observer: function (newVal, oldVal) {}
    }
  },
  data: {
    height: '',
    //默认值  默认显示左上角
    navbarData: {
      showCapsule: 1
    },
    isBackShow:true
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    let pages = getCurrentPages();
    let isBackShow = true;
    if(pages.length === undefined || pages.length<=1){
      isBackShow=false;
    }
    // 定义导航栏的高度   方便对齐
    
    this.setData({
      height: app.globalData.height,
      isBackShow:isBackShow
    })
    
  },
  methods: {
  // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
  //返回到首页
    _backhome() {
      wx.switchTab({
        url: '/pages/switch/switch',
      })
    }
  }

}) 