import { getStorageUserInfo ,getStorageCollect} from '../../utils/storage.js'

Page({
  data: {
  userInfo:{},
  collectedNum:0
  },
  onShow(){
   const userInfo= getStorageUserInfo()||{}
   this.setData({
    userInfo
   })
  //  console.log(userInfo);
   
   if (!userInfo.nickName){
     wx.navigateTo({
       url: '/pages/auth/index'
     });
    }
   const collect= getStorageCollect()||[]
   this.setData({
     collectedNum:collect.length
   })

  }
})