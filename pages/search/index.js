import regeneratorRuntime from '../../lib/runtime/runtime';
import { request } from "../../request/index.js"
Page({

  data: {
    searchInfo: [],
    value: '',
    isCancelHidden: true
  },
  timer: 0,
  handleInput(e) {
    // console.log(e);
    const value = e.detail.value
    if (!value.trim()) {
      this.setData({
        isCancelHidden: true,
        searchInfo: {}
      })
      return
    }
    this.setData({
      isCancelHidden: false
    })
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.getSearchInfo(value)
    }, 1000)
  },
  async getSearchInfo(value) {

    const searchInfo = await request({
      url: '/goods/qsearch',
      data: {
        query: value
      }
    })
    this.setData({
      searchInfo
    })
    // console.log(searchInfo);


  },
  // 点击取消
  handleCancel() {
    this.setData({
      value: '',
      searchInfo: {},
      isCancelHidden: true
    })
  }
})