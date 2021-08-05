import ajax from './ajax'
import localStore from '../utils/storageUtils'
const BASE = window.location.origin+"/";
export const Request = (url,formData,type = 'GET')=>{
    const user = localStore.getUser();
    // /OA_WXAPP/
    url="/OA_WXAPP/"+url;
    formData.append("OptUserCode",user.UserCode);
    return ajax(BASE+url,formData,type)
}