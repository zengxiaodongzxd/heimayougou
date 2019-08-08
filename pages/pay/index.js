import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
import { getStorageAddress, getStorageCart,getStorageToken } from '../../utils/storage.js'
import { requestPayment,showToast } from '../../utils/asyncWx.js'
Page({
  data: {
    address: {},
    cart: {},
    isAllchecked: false,
    totalNum: 0,
    totalPrice: 0,
    hasCart: false,
    token:''
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
  // 创建订单
  async createOrder() {

    let cartArr = Object.values(this.data.cart)
    let goods = []
    cartArr.forEach(v => {
      if (v.checked) {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      }

    })
    // console.log(goods);
    const { order_number } = await request({
      url: '/my/orders/create',
      method: 'post',
      data: {
        order_price: this.data.totalPrice,
        consignee_addr: this.data.address.all,
        goods
      }
    })
    // console.log(order_number);

    return order_number
  },
  // 获取支付参数
  async getPayParams(order_number) {
    const { pay } = await request({
      url: '/my/orders/req_unifiedorder',
      method: 'post',
      data: { order_number }
    })
    return pay
    // console.log(pay);
  },

  // 1 计算总价格和总数量以及全选状态并赋值到data中
  // 2 给data中的cart赋值
  // 3 将cart存储到本地存储中
  setCart(cart) {
    // 购物车对象转换成数组
    const cartArr = Object.values(cart)

    //  全选状态

    let totalNum = 0
    let totalPrice = 0
    // 计算总价格
    cartArr.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
      }
    })
    //  计算总数量
    cartArr.forEach(v => {
      if (v.checked) {
        totalNum += v.num
      }
    })
    // 获取本地token值
    const token = getStorageToken() || ''
    this.setData({
      cart,
      totalNum,
      totalPrice,
      token

    })


  },

  // 点击支付触发
  async handlePay() {
  try {
    if (!this.data.token) {
      wx.navigateTo({
        url: '/pages/auth/index'
      });
    } else {
      //  // 创建订单
      const order_number = await this.createOrder()
      //  //  console.log(order_number);
      //  // 获取支付参数
      const pay = await this.getPayParams(order_number)
      // console.log(pay);
      // 调用微信系统的支付
      await requestPayment(pay)
      // 查询订单状态
      const res = await request({
        url: '/my/orders/chkOrder',
        data: {
          order_number
        },
        method: 'post'
      })
      // console.log(res);
      if(res==='支付成功'){
        await showToast({title:'支付成功'})
        wx.navigateTo({
          url: '/pages/order/index'
        });
          
      }
      
    }

  } 
  catch (error) {
    await showToast({title:'支付失败'})
    console.log(error);
    
  }

  }
})
