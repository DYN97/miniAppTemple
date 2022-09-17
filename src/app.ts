//app.js
//import { camelCase } from 'lodash'
App({
  onLaunch: function () {
    console.log(`环境：${process.env.NODE_ENV} 构建类型：${process.env.BUILD_TYPE}`)
    let me = this
    console.log('-----------------------------------------------')
    // 登录
    
  },
  onShow(options) {
    console.log(options)
  },
  globalData: {
    userInfo: null,
    chosedCar: {},
    startService: true,
    startOrder: false,
    carList: [],
    servicePackages: [],
    groupsInfo: [],
    chosedPackage: {}
  },
})
