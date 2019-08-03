// import regeneratorRuntime from '../../lib/runtime/runtime';
// import { request } from "../../request/index.js"
import { getStorageAddress, getStorageCart } from '../../utils/storage.js'
Page({
  data: {
    address: {},
    cart:{},
    isAllchecked:false,
    totalNum:0,
    totalPrice:0,
    hasCart:false
  },
  onShow() {
    // 获取收货地址
    const address = getStorageAddress() || {}
    this.setData({
      address
    })
    //  获取购物车数据
    const cart = getStorageCart()
    // console.log(cart);
    this.setCart(cart)
  },
  
  // 1 计算总价格和总数量以及全选状态并赋值到data中
  // 2 给data中的cart赋值
  // 3 将cart存储到本地存储中
  setCart(cart){
    // 购物车对象转换成数组
   const cartArr= Object.values(cart)

  //  全选状态

    let totalNum=0
    let totalPrice=0
    // 计算总价格
    cartArr.forEach(v=>{
      if (v.checked) {
        totalPrice+=v.num*v.goods_price
      }
    })
  //  计算总数量
    cartArr.forEach(v=>{
      if (v.checked) {
        totalNum+=v.num
      }
    })
    this.setData({
      cart,
      totalNum,
      totalPrice
      
    })

    
  },
 
  // 点击支付触发
  handlePay(){
    wx.navigateTo({
      url: '/pages/auth/index'
    });
      
  }
})