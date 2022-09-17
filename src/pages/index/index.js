//index.js
//获取应用实例
const app = getApp()
import { listFirst  } from '../../common/api/order'
import { getServiceList } from '../../common/api/service'
import { getCarList, getOpenId, popup } from '../../common/api/common'
Page({
  data: {
    banners: [
      {
        img: 'https://bestune-app-1300211780.cos.ap-beijing.myqcloud.com/cos-washcar/banner0.png',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkxNDQwMTk3NQ==&mid=2247483668&idx=1&sn=e0e53d84dcb69af098e01235e21649df&chksm=c16fbeccf61837dafb87680cd86f44b8929f3a422dc9c5840105e9ededb1057ab3d4431e992c#rd',
      }, 
      {
        img: 'https://bestune-app-1300211780.cos.ap-beijing.myqcloud.com/cos-washcar/banner1.png',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkxNDQwMTk3NQ==&mid=2247483668&idx=1&sn=e0e53d84dcb69af098e01235e21649df&chksm=c16fbeccf61837dafb87680cd86f44b8929f3a422dc9c5840105e9ededb1057ab3d4431e992c#rd',
      }, 
      {
        img: 'https://bestune-app-1300211780.cos.ap-beijing.myqcloud.com/cos-washcar/topnanner.png',
        url: 'https://mp.weixin.qq.com/s?__biz=MzkxNDQwMTk3NQ==&mid=2247483661&idx=1&sn=c76c9a01cddfeb97903ab730cb1cdd92&chksm=c16fbed5f61837c39afaaf8b81a375da6f98ae9e1aa267c4216539a91797d6d367ce1a37e20c#rd',
      },
    ],
    servicePackages: app.globalData.servicePackages,
    waitingOrder: null,
    statusName: '等待接单',
    statusDesc: '等待商家上门,若超过预约时间,商家仍未派出服务人员,系统自动取消订单,请耐心等候',
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 500,
    showFirst: false,
    unLogin: wx.getStorageSync('loginFlag') ? false : true,
  },
  toBanner(e) {    
    wx.navigateTo({
      url: '/pages/webview/index?url=' +  encodeURIComponent(e.currentTarget.dataset.url),
      complete(res) {
        console.log(res)
      }
    })
  },
  toServicePackageDetail(e) {
    let id = e.currentTarget.dataset.id ? e.currentTarget.dataset.id : ''
    wx.navigateTo({
      url: '/pages/servicePackageDetail/index?id=' + id,
    })
  },
  toPage(e) {
    let target = e.currentTarget.dataset.target
    this.setData({
      showFirst: false
    })
    if (this.data.unLogin && target != 'login') {
      wx.showModal({
        title: '提示',
        content: '未登陆用户，请登陆后使用本服务',
        confirmText: '去登录',
        success(e) {
          if (e.confirm) {
            if (wx.getStorageSync('userId')) {
              wx.showToast({
                title: '登录成功!',
              })
              setTimeout(function () {
                wx.setStorageSync('loginFlag', true)
                console.log(wx.getStorageSync('userRole'))
                if (wx.getStorageSync('userRole') == 2) {
                  wx.reLaunch({
                    url: '/servicePackage/pages/index/index',
                  })
                } else {
                  wx.reLaunch({
                    url: '/pages/index/index',
                  })
                }
              }, 2000)
              return false
            }
            wx.navigateTo({
              url: '/pages/login/index',
            })
          }
        },
      })
    } else {
      if (target === 'login') {
        if (wx.getStorageSync('userId')) {
          wx.showToast({
            title: '登录成功!',
          })
          setTimeout(function () {
            wx.setStorageSync('loginFlag', true)
            console.log(wx.getStorageSync('userRole'))
            if (wx.getStorageSync('userRole') == 2) {
              wx.reLaunch({
                url: '/servicePackage/pages/index/index',
              })
            } else {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }
          }, 2000)
          return false
        }
      }
      wx.navigateTo({
        url: '/pages/' + target + '/index',
      })
    }
  },
  toOrderDetail(e) {
    let orderNo = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '/pages/orderDetail/index?orderNo=' + orderNo,
    })
  },
  onShow() {
    let me = this
    getServiceList(0).then((res) => {
      console.log(res)
      if (res.code === 200) {
        this.setData({
          servicePackages: res.data,
        })
        app.globalData.chosedPackage = res.data[0]
        app.globalData.servicePackages = res.data
      }
    })
    this.setData({
      unLogin: wx.getStorageSync('loginFlag') ? false : true,
      servicePackages: app.globalData.servicePackages,
    })
    if (wx.getStorageSync('loginFlag')) {
      popup().then(res => {
        me.setData({
          showFirst: res.data
        })
      })
      if (wx.getStorageSync('userRole') == 2) {
        wx.reLaunch({
          url: '/servicePackage/pages/index/index',
        })
      }
      getCarList({
        current: 1,
        pageSize: 999,
      }).then(res => {
        if (res.code === 200) {
          let defaultcar = res.data.find(t => t.isDefault) ? res.data.find(t => t.isDefault) : res.data[0]
          app.globalData.carList = res.data
          console.log(defaultcar)
          app.globalData.chosedCar = defaultcar
          this.setData({
            chosedCar: defaultcar,
          })
        }
      })
    }
  },
  closeFirst(){
    this.setData({
      showFirst: false
    })
  },
  setWaitingOrder() {
    listFirst().then(res => {
      if (res.code === 200 && res.data.length > 0) {
        let statusDescribe = ''
        switch (res.data[0].statusValue) {
          case '前往车辆':
            statusDescribe = '服务人员已出发，即将到达车辆位置'
            break
          case '服务中':
            statusDescribe = '服务人员已到达车辆位置，正在为您的爱车服务'
            break
          case '服务完成':
            statusDescribe = '服务人员已完成服务，希望您能满意！如您对本订单有疑问，可联系客服热线400-01039666'
            break
          case '等待成团':
            statusDescribe = '在3小时内成团成功则可以享受团购价购买本服务；成团失败的订单将自动结束，并退款回原账户'
            break
          default:
            statusDescribe = '在3小时内成团成功则可以享受团购价购买本服务；成团失败的订单将自动结束，并退款回原账户'
        }
        res.data[0].statusDescribe = statusDescribe
        this.setData({
          waitingOrder: res.data[0],
        })
      }
    })
  },
  onLoad() {
    let me = this
    wx.showLoading({ title: '加载中', mask: true })
    if (wx.getStorageSync('openId')) {
      wx.checkSession({
        success() {
          wx.hideLoading()
          me.setWaitingOrder()
          //session_key 未过期，并且在本生命周期一直有效
        },
        fail() {
          // session_key 已经失效，需要重新执行登录流程
          wx.login({
            success: res => {
              // 发送 res.code 到后台换取 openId, sessionKey, unionId

              getOpenId({ code: res.code }).then(res => {
                console.log(res)
                wx.hideLoading()
                
                if (res.code === 200) {
                  wx.setStorageSync('openId', res.data.openId)
                  wx.setStorageSync('session_3rdkey', res.data.sessionKey)
                  if (res.data.mobile) {
                    wx.setStorageSync('userId', res.data.userId)
                    wx.setStorageSync('appToken', res.data.appToken)
                    wx.setStorageSync('userRole', res.data.roleDictionaryValue)
                    wx.setStorageSync('userMobile', res.data.mobile)
                    wx.setStorageSync('userName', res.data.nickName)
                    wx.setStorageSync('userHeadUrl', res.data.headUrl)
                    me.setWaitingOrder()
                    
                  }
                }
              })
            },
          })
        },
      })
    } else {
      wx.login({
        success: res => {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          getOpenId({ code: res.code }).then(res => {
            console.log(res)
            wx.hideLoading()
            if (res.code === 200) {
              wx.setStorageSync('openId', res.data.openId)
              wx.setStorageSync('session_3rdkey', res.data.sessionKey)
              if (res.data.mobile) {
                wx.setStorageSync('userId', res.data.userId)
                wx.setStorageSync('appToken', res.data.appToken)
                wx.setStorageSync('userRole', res.data.roleDictionaryValue)
                wx.setStorageSync('userMobile', res.data.mobile)
                wx.setStorageSync('userName', res.data.nickName)
                wx.setStorageSync('userHeadUrl', res.data.headUrl)
                me.setWaitingOrder()
                
              }
            }
          })
        },
      })
    }
  },
})
