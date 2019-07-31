let requestNum = 0
export const request = (params) => {
    requestNum++
    wx.showLoading({
        title: '加载中'
    });

    const baseUrl = "https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve, reject) => {
        wx.request({
            ...params,
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

