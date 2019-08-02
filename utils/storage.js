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