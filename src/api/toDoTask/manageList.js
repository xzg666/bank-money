import request from '@/utils/request'
const toDoTaskManage = {
  getList(params) {
    return request({
      url: '/loan/upComingTask/getUpComingTaskByPage',
      method: 'get',
      params
    })
  },
  sendMessage(params) {
    return request({
      url: '/loan/upComingTask/sendSms',
      method: 'post',
      params
    })
  },
  sendAllMessage() {
    return request({
      url: '/loan/upComingTask/sendAllSms',
      method: 'post'
    })
  },
  sendFile(params) {
    return request({
      url: '/loan/upComingTask/sendLetterApply',
      method: 'post',
      params
    })
  },
  lawsuitApply(params){
    return request({
      url: '/loan/upComingTask/lawsuitApply',
      method: 'post',
      params
    })
  }
}
export {
  toDoTaskManage
}