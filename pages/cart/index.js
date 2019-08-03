import { getSetting, openSetting, chooseAddress, showModal } from '../../utils/asyncWx';
import regeneratorRuntime from '../../lib/runtime/runtime';
// import { request } from "../../request/index.js"
import { getStorageAddress, setStorageAddress, getStorageCart,setStorageCart } from '../../utils/storage.js'
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
  // 点击添加收货地址按钮
  async handleAddAddress() {
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting['scope.address']
    if (scopeAddress === false) {
      await openSetting()
    }
    let address = await chooseAddress()
    // console.log(res2);
    address.all = address.provinceName + address.cityName + address.countyName + address.detailInfo
    // console.log(address);

    this.setData({
      address
    })
    setStorageAddress(address)
  },
  // 1 计算总价格和总数量以及全选状态并赋值到data中
  // 2 给data中的cart赋值
  // 3 将cart存储到本地存储中
  setCart(cart){
    // 购物车对象转换成数组
   const cartArr= Object.values(cart)
  //  是否有购物车数据
   const hasCart=cartArr.length?true:false
  //  全选状态
    const isAllchecked=cartArr.length? cartArr.every(v=>v.checked):false
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
      isAllchecked,
      totalNum,
      totalPrice,
      hasCart
    })
    setStorageCart(cart)
    
  },
  // 点击购物车某一项的复选框触发
  handleChecked(e){
   const {id}=e.currentTarget.dataset
   let cart=this.data.cart
   cart[id].checked=!cart[id].checked
    this.setCart(cart)
  },
  // 点击全选框
  handleAllchecked(){
    let {isAllchecked,cart}=this.data
    isAllchecked=!isAllchecked
    let cartArr=Object.values(cart)
    cartArr.forEach(v=>{
      v.checked=isAllchecked
    })
    this.setCart(cart)
  },
  // 点击加减按钮触发
 async handleEdit(e) {
    const {operator,id} =e.currentTarget.dataset
    let {cart}=this.data
    if (cart[id].num===1&&operator===-1){
      const content ='您确定要删除该商品吗？'
     const res=await showModal({content})
     if (res.confirm) {
  
      delete cart[id]
     this.setCart(cart)
     
     } 
      
    }else {
      cart[id].num+=operator
      this.setCart(cart)
    }
  },
  // 点击结算触发
  handlePay(){
    const {hasCart,cart,address}=this.data
    const cartArr=Object.values(cart)
  const hasCheckedCart= cartArr.some(v=>v.checked)
    if(!hasCart||!hasCheckedCart) {
      wx.showToast({
        title: '您还没有添加商品',
        icon: 'none',
        mask:true
      })
    } else if (!address.userName){
      wx.showToast({
        title: '您还没有添加收货地址',
        icon: 'none',
        mask:true
      })
    } else {
      wx.navigateTo({
        url: '/pages/pay/index',
      });
        
      
    }
  }
})