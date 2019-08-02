import { getSetting, openSetting, chooseAddress } from '../../utils/asyncWx';
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({
  data: {

  },
  // 点击添加收货地址按钮
  async handleAddAddress() {
    const res1 = await getSetting()
    const scopeAddress = res1.authSetting['scope.address']
    // console.log(scopeAddress);

    if (scopeAddress || scopeAddress === undefined) {
      const res2 = await chooseAddress()
      console.log(res2);

    } else {

      await openSetting()
      const res3 = await chooseAddress()
      console.log(res3);

    }
  }
})