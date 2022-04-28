import request from '@/utils/request'
const messageApi = {
  getList(params) {
    return request({
      url: '/loan/smsConfig/list',
      method: 'get',
      params
    })
  },
  saveMessage(url, data) {
    return request({
      url,
      method: 'post',
      data
    })
  },
  deleteMessage(ids) {
    return request({
      url: `/loan/smsConfig/delSmsConfig/${ids}`,
      method: 'post',
    })
  }
}
export {
  messageApi
}
