// pages/category/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    leftGoodsList:[],
    rightGoodsList:[],
    currentTab:0
  },
  onLoad(){
    this.getCateList()
  },
  // 获取分类数据
  getCateList(){
    request({
      url:"/categories"
    })
    .then(res=>{
    const leftGoodsList= res.map((v,i)=>({cat_id:v.cat_id,cat_name:v.cat_name}))
      this.setData({
        leftGoodsList,
        rightGoodsList:res[0].children
      })
     
    })
  }
})