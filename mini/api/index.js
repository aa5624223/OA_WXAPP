const host = 'https://linlin.cn1.utools.club'
export function ApiRequest (url,data,method='GET'){
  return new Promise((resolve,reject)=>{
    wx.request({
      url: host+url,
      data,
      method,
      success:(res)=>{
        resolve(res.data);
      },
      fail:(err)=>{
        reject(err);
      }
    })
  })
}
// export const getOpenId = (data)=>{
//   return ApiRequest('Home/getOpenId',data);
// }