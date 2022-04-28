import request from '@/utils/request'
const videoInfoApi = {
  getVideoInfoList(params) {
    return request({
      url: '/loan/videoInfo/getPageListByCond',
      method: 'get',
      params
    })
  },
  exportFileByCond(query) {
    return request({
      url: '/loan/videoInfo/exportFileByCond',
      method: 'get',
      params: query
    })
  }
}
export {
  videoInfoApi
}
