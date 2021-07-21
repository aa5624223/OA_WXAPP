// pages/DataInput/DataInput.js
import Memory from '../../utils/memory'
import config from '../../utils/config'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:{},
    signUrl:'',
    errorInfo:'Info',
    uploadUrl:'',
    FileUrl:'1'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      user:Memory.user,
      signUrl:Memory.signImg.signUrl
    }) 
    console.log(Memory.signImg);
  },
  NavtoSign:function(options){
    wx.redirectTo({
      url: '/pages/sign2/sign2',
    })
  },
  uploadSign: function(){
    let url = this.data.signUrl;
    let fc = wx.getFileSystemManager();
    let _this = this;
    fc.readFile({
      filePath:url,
      encoding:'base64',
      success:async (res)=>{
        console.log(_this.data.user);
        wx.request({
          url: config.mobileHost+"Home/getSign",
          method:'POST',
          header: {
            'content-type': 'application/x-www-form-urlencoded' //修改此处即可
          },
          data:{filename:'text',loginid:_this.data.user.loginid,data:res.data,FileRoute:_this.data.user.FileRoute,WxOpenid:_this.data.user.openid},
          success:res=>{
            if(res.data==="1"){
            }else{
              Memory.user.FileRoute = res.data.FileRoute;
              this.data.user.FileRoute = res.data.FileRoute;
              _this.setData({
                user:_this.data.user
              });
              wx.showModal({
                title:'提示',
                content:'上传成功'
              })
              //console.dir(this.data.user);
            }
          },
          fail:error=>{
            _this.setData({
              errorInfo:error.errMsg,
              uploadUrl:config.mobileHost+"/Home/getSign",
            })
          }
        })
      },fail:error=>{
        _this.setData({
          errorInfo:error.errMsg
        })
      }
    })
    //Img.src = url;
    //Img.rotate(-90)
    //var ImgView = 
    //ImgView.appendChild(ImgView);
    //http://tmp/t7GYCSwC9QUUf0834d7598cedf92c3d4842582a94fa0.png
    
  },
  switchToIndex:function(e){
    wx.switchTab({
      url: e.currentTarget.dataset.src,
    })
  }
})