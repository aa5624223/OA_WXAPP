// pages/login/login.js
import Memory from '../../utils/memory'
import request from '../../utils/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName:'',
    userPas:'',
  },
 
  /**
   * 生命周期函数--监听页面加载
   * 
   */
  onLoad:  function (options) {
    Memory.user = wx.getStorageSync('user');
    console.log(Memory.user );
    // if(Memory.user){
    //   wx.navigateTo({
    //     url: '../DataInput/DataInput',
    //   })
    // }
  },
  login:  function(res){
    const {userName,userPas} = this.data;
    var _this = this;
    if(userName==''||userPas==''){
      wx.showModal({
        title:'提示',
        content:'账号或密码不能为空'
      })
      return;
    }
    if(Memory.user===undefined || Memory.user===''){
      Memory.user = res.detail.userInfo;
    }
    if(Memory.user.openid===undefined){
      Memory.user.openid='';
    }
    _this.setData({
      errorMsg:1
    })
    wx.login({
      success: async function(res2){
        _this.setData({
          errorMsg:2
        })
        if(res2.code){
          let result =  await request("/Home/Login",{code:res2.code,userName:userName,userPas:userPas,openid:Memory.user.openid})
          if(result.status === undefined){
            if(typeof(result)==='string'){
              wx.showModal({
                title:'提示',
                content:result
              })
            }else{
              Memory.user = result;
              wx.setStorageSync('user', Memory.user )
              //页面转向
              wx.redirectTo({
                url: '../DataInput/DataInput',
              })
            }
            
          }else{
            wx.showModal({
              title:'提示',
              content:'服务器无响应'
            })
          }
        }else{
          wx.showModal({
            title:'提示',
            content:'服务器无响应'
          })
        }
      },
      fail:function(error){
        
      }
    })
  },
  bindInput:function(e){
    if(e.target.id ==='input_username'){
      this.setData({
        userName:e.detail.value
      })
    }else if(e.target.id === 'input_pas' ){
      this.setData({
        userPas:e.detail.value
      })
    }
  }
})