import request from '@/utils/request'

const customerSearchApi = {
  getPageList(params) {
    return request({
      url: '/cztdzbh/supplierInfo/list',
      method: 'get',
      params
    })
  },
  editTags(data) {
    return request({
      url: '/ctzdzbh/lycginfo/updZxInfo',
      method: 'post',
      data
    })
  }
}
const creditStatisticsApi = {
  getPageList(data) {
    return request({
      url: '/ctzdzbh/lycginfo/getStarStatisReport',
      method: 'post',
      data
    })
  }
}
export {
  customerSearchApi,
  creditStatisticsApi
}