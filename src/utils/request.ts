import { config } from '../common/config'
type Method = 'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT';
class Request {
  public withBaseURL: boolean
  public baseURL: string
  public requestTask: any
  constructor(parms: any) {
    this.withBaseURL = parms.withBaseURL
    this.baseURL = parms.baseURL 
    this.requestTask = null
  }

  get(url: string, data: any, header: any) {
    return this.request('GET', url, data, header)
  }

  post(url: string, data: any, header: any) {
    return this.request('POST', url, data, header)
  }

  put(url: string, data: any) {
    return this.request('PUT', url, data)
  }

  request(method: Method, url: string, data: any, header?: any) {
    const vm = this
    if (!header) {
      header = {
        'User-Aid': wx.getStorageSync('userAid'),
        'User-Code': wx.getStorageSync('userCode'),
        usercode: wx.getStorageSync('userCode'),
        'User-Id': wx.getStorageSync('userId'),
        'User-Role': wx.getStorageSync('userRole'),
        'X-AUTH': wx.getStorageSync('appToken'),
        'V-Origin': 'XCX',
      }
    }
    return new Promise((resolve, reject) => {
      this.requestTask = wx.request({
        url: config.base_url + (vm.withBaseURL ? vm.baseURL + url : url) ,
        data,
        method,
        header,
        success(res) {
          resolve(res)
          console.warn(res)
        },
        fail(error) {
          console.warn(error)
          reject({
            msg: '请求失败',
            url: vm.withBaseURL ? vm.baseURL + url : url,
            method,
            data,
          })
        },
      })
    })
  }

  abort() {
    this.requestTask.abort()
  }
}
export { Request }
