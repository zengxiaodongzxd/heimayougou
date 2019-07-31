import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_list/index.js
Page({
  data: {
    tabs: [
      { id: 0, title: '综合', isActive: true },
      { id: 1, title: '销量', isActive: false },
      { id: 2, title: '价格', isActive: false }],
    currentIndex: 0,
    goods: []
  },
  search: {
    query: '',
    cid: 0,
    pagenum: 1,
    pagesize: 10
  },
  // 总条数
  total: 0,
  onLoad(options) {
    // console.log(options);
    this.search.cid = options.cid
    // 获取商品列表
    this.getGoodsList()
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.search.pagenum = 1
    this.setData({
      goods: []
    })
    this.getGoodsList()

  },
  // 触底获取下一页
  onReachBottom() {
    const totalPageNum = Math.ceil(this.total / this.search.pagesize)
    if (this.search.pagenum >= totalPageNum) {
      // console.log('没有下一页了');
      wx.showToast({
        title: '没有下一页了',
        icon: 'none'
      });

      return
    }
    this.search.pagenum++
    this.getGoodsList()
  },
  // tab栏标题选中切换
  handleTitleChange(e) {
    let { tabs, currentIndex } = this.data
    currentIndex = e.detail.index
    tabs.forEach((v, i) => i === currentIndex ? v.isActive = true : v.isActive = false)
    this.setData({
      tabs,
      currentIndex
    })

  },
  // 获取商品列表
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.search
    })
    
      wx.stopPullDownRefresh()
    // console.log(res);
    this.total = res.total
    this.setData({
      goods: [...this.data.goods, ...res.goods]
    })

  }

})