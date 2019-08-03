// 获取授权信息
export const getSetting = () => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })

}
// 打开授权界面
export const openSetting = () => {
 
    return new Promise((resolve, reject) => {
        wx.openSetting({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })

}
// 获取收货地址
export const chooseAddress = () => {
    return new Promise((resolve, reject) => {
        wx.chooseAddress({
            success: (result) => {
                resolve(result)
            },
            fail: (err) => {
                reject(err)
            }
        })
    })

}
// 弹窗提示
export const showModal = ({content}) => {
   
    
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示',
            content,
            success (res) {
                resolve(res)
            }
          })
    })

}
// 调用微信登录接口
export const login = ({content}) => {
    return new Promise((resolve, reject) => {
       wx.login({
           timeout:10000,
           success: (result) => {
               resolve(result)
           }
      
       });
         
    })

}