// pages/category/index.js
import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
import {getStorageCates,setStorageCates} from '../../utils/storage.js'
// 商品列表所有数据

Page({
  data: {
    leftGoodsList: [],
    rightGoodsList: [],
    currentTab: 0,
    scrollTop: 0
  },
  goodsList: [],
  onLoad() {
    this.getCateList()
  },
  // 获取分类数据
  async getCateList() {
    // let currentTab=this.data.currentTab
    const cate = getStorageCates()


    // 如果小程序本地存储有数据且不过期执行
    if (cate && Date.now() - cate.time <= 10000) {
      this.goodsList = cate.data
      const leftGoodsList = goodsList.map((v, i) => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
      this.setData({
        leftGoodsList,
        rightGoodsList: this.goodsList[0].children
      })
      return
    }
    const res = await request({
      url: "/categories"
    })

    this.goodsList = res
    // wx.setStorageSync('cate', { time: Date.now(), data: this.goodsList });
    setStorageCates({ time: Date.now(), data: this.goodsList })
    const leftGoodsList = this.goodsList.map((v, i) => ({ cat_id: v.cat_id, cat_name: v.cat_name }))
    this.setData({
      leftGoodsList,
      rightGoodsList: this.goodsList[0].children


    })
  },
  // 左侧菜单点击切换选中
  handleMenuChange(e) {
    // console.log(e);
    const currentTab = e.currentTarget.dataset.index
    this.setData({
      currentTab,
      rightGoodsList: this.goodsList[currentTab].children,
      scrollTop: 0
    })

  }
})