import {getStorageToken } from '../utils/storage.js'
let requestNum = 0
export const request = (params) => {
    requestNum++
    wx.showLoading({
        title: '加载中'
    });

    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    const token=getStorageToken()||''
    const isPrivate=params.url.includes('/my/')
    let header=params.header||{}
    if (isPrivate) {
        if (!token) {
            wx.navigateTo({
                url: '/pages/login/index'
            });      
            return
        }
        header['Authorization']=token
        

    }
    return new Promise((resolve, reject) => {

        wx.request({
            ...params,
            header,
            url: baseUrl + params.url,
            success: (result) => {
                resolve(result.data.message)
            },
            fail: (error) => {
                console.log(error);

            },
            complete: () => {
                requestNum--;
                if (requestNum === 0) {
                    wx.hideLoading()
                }

            }
        });
    })
}

