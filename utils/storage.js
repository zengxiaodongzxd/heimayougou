// 获取商品列表数据
export const getStorageCates=()=>{
    return wx.getStorageSync('cate');
}
// 存储商品列表数据
export const setStorageCates=(obj)=>{
    wx.setStorageSync('cate',obj);

}
// 获取购物车数据
export const getStorageCart=()=>{
    return wx.getStorageSync('cart');
}
// 存储购物车数据
export const setStorageCart=(obj)=>{
    wx.setStorageSync('cart',obj);

}
// 获取收货地址
export const getStorageAddress=()=>{
    return wx.getStorageSync('address');
}
// 存储收货地址
export const setStorageAddress=(obj)=>{
    wx.setStorageSync('address',obj);

}
// 获取token
export const getStorageToken=()=>{
    return wx.getStorageSync('token');
}
// 存储token
export const setStorageToken=({token})=>{
    wx.setStorageSync('token',token);

}
// 获取用户信息
export const getStorageUserInfo=()=>{
    return wx.getStorageSync('userInfo');
}
// 存储用户信息
export const setStorageUserInfo=(obj)=>{
    wx.setStorageSync('userInfo',obj);

}
// 获取收藏商品
export const getStorageCollect=()=>{
    return wx.getStorageSync('collect');
}
// 存储收藏商品
export const setStorageCollect=(arr)=>{
    wx.setStorageSync('collect',arr);

}