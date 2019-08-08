
import { setStorageUserInfo } from '../../utils/storage.js';

Page({
  data: {
    
  },
   handleGetUserInfo(e) {
    // console.log(e);
    setStorageUserInfo(e.detail.userInfo)
  wx.navigateBack({
    delta: 1
  });
    
      
  }
})