import { getStorageCollect} from '../../utils/storage.js'

Page({
  data: {
    collect:[]
  },
  onShow(){
    const collect =getStorageCollect()||[]
    this.setData({
      collect
    })
  }
})