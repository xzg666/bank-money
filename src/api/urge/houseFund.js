import request from '@/utils/request'
const houseFund = {
  //获取待办数量
  getListByPage(params) {
    return request({
      url: '/loan/overdue/getListByPage',
      method: 'get',
      params
    })
  },
  // 获取处理用户列表
  getDealUser() {
    return request({
      url: '/loan/overdue/getU',
      method: 'get',
    })
  },
  // 获取任务批次号
  getTskBatchNumber() {
    return request({
      url: '/loan/overdue/getSeq',
      method: 'get',
    })
  },
  // 获取模板下载地址
  getTemplatePath() {
    return request({
      url: `/loan/overdueExcel/exportYqData`,
      method: 'post'
    })
  },
  // 获取分派改派记录
  getDispatchList(params) {
    return request({
      url: '/loan/upComingTask/queryUpdateRecordPage',
      method: 'get',
      params
    })
  },
  save_rwfp(data) {
    return request({
      url: '/loan/overdue/overdueDistribute',
      method: 'post',
      data
    })
  },
  // 保存任务改派
  save_rwgp(data) {
    return request({
      url: '/loan/overdue/overdueReassignment',
      method: 'post',
      data
    })
  },
  // 取消任务
  cancel_rw(data) {
    return request({
      url: '/loan/overdue/overdueCancel',
      method: 'post',
      data
    })
  }
}
export {
  houseFund
}