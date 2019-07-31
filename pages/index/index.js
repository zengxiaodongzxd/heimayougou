// pages/index/index.js
import { request } from "../../request/index.js"
Page({
  data: {
    swiperList: [],
    cateList: [],
    floorList:[]
  },
  onLoad() {
    this.getSwiperList()
    this.getCateList()
    this.getFloorList()
  },
  // 获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata"
    })
      .then(res => {
        this.setData({
          swiperList: res
        })


      })
  },
  // 获取分类数据
  getCateList() {
    request({
      url: "/home/catitems"
    })
      .then(res => {
        this.setData({
          cateList: res
        })

      })
  },
  // 获取楼层数据
  getFloorList(){
    request({
      url:"/home/floordata"
    })
    .then(res=>{
      // console.log(res);
      this.setData({
        floorList: res
      })

      
    })
  }
})