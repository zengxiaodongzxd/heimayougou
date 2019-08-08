import { request } from "../../request/index.js"
import regeneratorRuntime from '../../lib/runtime/runtime';
  Page({
    data: {
      tabs: [
        { id: 0, title: '全部', isActive: true },
        { id: 1, title: '待付款', isActive: false },
        { id: 2, title: '待发货', isActive: false },
        { id: 3, title: '退款/退货', isActive: false },
      ],
      currentIndex: 0,
      goods: [],
      orderInfo:{}
    },
    onShow(){
      const currentPages =  getCurrentPages();
      const currentPage= currentPages[currentPages.length-1]
      // console.log(currentPage);
      const type=currentPage.options.type
      this.getOrderInfo(type)
      this.setData({
        currentIndex:type-1
      })
      let { tabs ,currentIndex } = this.data
      tabs.forEach((v, i) => i === currentIndex ? v.isActive = true : v.isActive = false)
      this.setData({
        tabs,
        currentIndex
      })
    },
    handleTitleChange(e) {
      let { tabs, currentIndex } = this.data
      currentIndex = e.detail.index
      tabs.forEach((v, i) => i === currentIndex ? v.isActive = true : v.isActive = false)
      this.setData({
        tabs,
        currentIndex
      })
      this.getOrderInfo(currentIndex+1)
    },
    async getOrderInfo(type){
       const res= await request({
          url:'/my/orders/all',
          data:{ type }
        })
        let orderInfo=res.orders
        orderInfo.forEach(v=>{
      
        let  create_time_format= new Date(v.create_time*1000).toLocaleString()
          v.create_time_format=create_time_format
        })
      this.setData({
        orderInfo
      })
      // console.log(orderInfo);
      
    }
  })