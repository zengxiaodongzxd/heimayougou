// pages/category/index.js
import { request } from "../../request/index.js"
// 商品列表所有数据
let goodsList=[]
Page({
  data: {
    leftGoodsList:[],
    rightGoodsList:[],
    currentTab:0,
    scrollTop:0
  }
  ,
  onLoad(){
    this.getCateList()
  },
  // 获取分类数据
  getCateList(){
    // let currentTab=this.data.currentTab
    const cate=wx.getStorageSync('cate');
      
    
      // 如果小程序本地存储有数据且不过期执行
    if(cate&&Date.now()-cate.time<=10000) {
      goodsList=cate.data
      const leftGoodsList= goodsList.map((v,i)=>({cat_id:v.cat_id,cat_name:v.cat_name}))
        this.setData({
          leftGoodsList,
          rightGoodsList:res[0].children
        })
      return
    }
    request({
      url:"/categories"
    })
    .then(res=>{
      goodsList=res
      wx.setStorageSync('cate', { time:Date.now() ,data:goodsList});
    const leftGoodsList= goodsList.map((v,i)=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      this.setData({
        leftGoodsList,
        rightGoodsList:res[0].children
      })
     
    })
  },
  // 左侧菜单点击切换选中
  handleMenuChange(e) {
    console.log(e);
    const currentTab=e.currentTarget.dataset.index
    this.setData({
      currentTab,
      rightGoodsList:goodsList[currentTab].children,
      scrollTop:0
    })

  }
})