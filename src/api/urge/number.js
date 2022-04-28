import request from '@/utils/request'
const numberApi = {
  getPageList(params) {
    return request({
      url: `/collectUser/list`,
      method: 'get',
      params
    })
  },
  operationNumber(url = '', data) {
    return request({
      url: url,
      method: 'post',
      data
    })
  },
  delNumber(id) {
    return request({
      url: `/collectUser/del/${id}`,
      method: 'post'
    })
  },
  // 查询催收人员列表
  getSysNameList(params) {
    return request({
      url: '/loan/tdVideoInfo/sysNames',
      method: 'get',
      params
    })
  },
  upSort(id) {
    return request({
      url: `/collectUser/upSort/${id}`,
      method: 'post'
    })
  },
  downSort(id) {
    return request({
      url: `/collectUser/downSort/${id}`,
      method: 'post'
    })
  },
  // 获取最新编号
  getNewOrderNumber() {
    return request({
      url: `/collectUser/getNewOrderNumber`,
      method: 'post'
    })
  }
  // /collectUser/getNewOrderNumber
}
export default numberApi