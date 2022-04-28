import request from '@/utils/request'
const toDoTaskAudit = {
  getList(params) {
    return request({
      url: '/loan/upComingTask/getUpComingTaskAuditByPage',
      method: 'get',
      params
    })
  },
  changeTask(params) {
    return request({
      url: 'loan/upComingTask/reassignTask',
      method: 'post',
      params
    })
  },
  cancel(params) {
    return request({
      url: 'loan/upComingTask/cannelTask',
      method: 'post',
      params
    })
  },
  querySameCityUserList() {
    return request({
      url: '/system/user/selectBySameCity',
      method: 'get',
    })
  },
  saveAppiontUser(data) {
    return request({
      url: '/loan/collectionRegister/updateRwclr',
      method: 'post',
      data
    })
  },
  auditTask(ids) {
    return request({
      url: `/loan/upComingTask/patchSh/${ids}`,
      method: 'get',
    })
  }
}
export {
  toDoTaskAudit
}