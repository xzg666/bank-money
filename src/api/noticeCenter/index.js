import request from '@/utils/request'
import { getUserName } from '@/utils/auth';
const noticeApi = {
  getNoticeList(data) {
    return request({
      url: `/loan/dbtx/list`,
      // url: `/loan/dbtx/unreadCount`,
      method: 'get',
      params: {
        userName: getUserName(),
        ...data
      }
    })
  },
  getNoticeNum() {
    return request({
      url: `/loan/dbtx/unreadCount`,
      method: 'get',
      params: {
        userName: getUserName()
      }
    })
  },
  getMessageInfo(id) {
    return request({
      url: `/loan/dbtx/get/${id}`,
      method: 'get'
    })
  },
  changeMessageStatus(id) {
    return request({
      url: `/loan/dbtx/readMessage/${id}`
    })
  },
  changeTodoStatus(id) {
    return request({
      url: `/loan/dbtx/get/${id}`
    })
  },
  todo(data) {
    return request({
      url: `/loan/dbtx/handleDb`,
      method: 'post',
      data
    })
  },
  queryHisTodoList(params) {
    return request({
      url: `/loan/dbtx/dbtxInfoList`,
      params
    })
  }
}
export {
  noticeApi
}