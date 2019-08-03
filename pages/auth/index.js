import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import { login } from '../../utils/asyncWx';
Page({
  data: {

  },
  async handleGetUserInfo(e) {
    console.log(e);
    const { encryptedData, rawData, iv, signature } = e.detail
    const res = await login()
    const loginParams = {
      encryptedData,
      rawData,
      iv,
      signature,
      code: res.code
    }
    // 获取token
    const res2=await request({
      url:"https://api.zbztb.cn/api/public/v1/users/wxlogin",
      data:loginParams,
      method:'post'
    })
    console.log(res2);
    

  }
})