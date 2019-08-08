import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx';
import {getStorageCart,setStorageToken} from '../../utils/storage.js'

Page({
  data: {

  },
    // 获取token
 async getToken(loginParams){
     return await request({
      url:"/users/wxlogin",
      data:loginParams,
      method:'post'
    })
   
  },
  // 点击授权按钮
  async handleGetUserInfo(e) {
    // console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail
    // 调用微信登录接口获取code
    const res = await login()
    // console.log(res);
    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code: res.code
    }
      // 获取token
      const {token}= await this.getToken(loginParams)
      // console.log(token);
      setStorageToken({token})
      wx.navigateBack({
        delta: 1
      });

  }
})