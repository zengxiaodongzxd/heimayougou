import { request } from "../../request/index.js"
import { getStorageCart, setStorageCart } from '../../utils/storage.js'
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    goodsDetail: {}
  },
  goodsInfo: {},
  goods_id: 0,
  onLoad(options) {
    const goods_id = options.goods_id
    this.getGoodsDetail(goods_id)

  },
  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const res = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    })
    console.log(res);
    this.goodsInfo = res
    this.goods_id = this.goodsInfo.goods_id
    this.setData({
      goodsDetail: {
        pics: res.pics,
        goods_price: res.goods_price,
        goods_name: res.goods_name,
        goods_introduce: res.goods_introduce
      }
    })

  },
  // 预览图片
  handlePreviewImg(e) {
    // console.log(e);
    const { index } = e.currentTarget.dataset
    const preViewImgs = this.data.goodsDetail.pics.map(v => v.pics_big)
    wx.previewImage({
      current: preViewImgs[index], // 当前显示图片的http链接
      urls: preViewImgs // 需要预览的图片http链接列表
    })
  },
  // 加入购物车
  handleCartAdd() {

    let res = getStorageCart('cart')||{}
    if (!res ||!res[this.goods_id]) {
      this.goodsInfo.num = 1
     
      res[this.goods_id] = this.goodsInfo
    
    } else {
      res[this.goods_id].num++
    

    }
    setStorageCart(res)
    wx.showToast({
      title: '添加购物车成功',
      icon: 'success',
      duration: 2000,
      mask:true
    })

  }


})