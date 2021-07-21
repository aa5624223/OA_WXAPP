//发送ajax请求
import config from './config'
export default (url,data,method='GET')=>{
  console.log("8");
  return new Promise((resolve,reject)=>{
    console.log("9");
    wx.request({
      //url:config.mobileHost+url,
      url:config.mobileHost+url,
      data,
      method,
      success:(res)=>{
        console.log("10");
        console.log(res);
        //console.log("请求成功:",res);
        //resolve 修改Promise 状态未成功
        resolve(res.data);
      },
      fail:(err)=>{
        //console.log("请求失败:",err);
        //reject 修改Promise为失败
        console.log(err);
        reject(err)
      }
    })
  })
}