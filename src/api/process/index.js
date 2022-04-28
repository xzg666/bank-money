import request from '@/utils/request'
const processApi = {
  getProcessByFlowId(params) {
    return request({
      url: `/actmodelent/queryActReModel`,
      method: 'get',
      params
    })
  },
  queryLinkConfig(data) {
    return request({
      url: `/workflow/process/queryLinkConfig`,
      method: 'post',
      data
    })
  },
  startProcess(flowId, data) {
    return request({
      url: `/workflow/process/${flowId}/start`,
      method: 'post',
      data
    })
  },
  queryMyTask(params) {
    return request({
      url: `/workflow/process/queryProcList/myTask`,
      method: 'get',
      params
    })
  },
  signforProcess(processId) {
    return request({
      url: `/workflow/process/claimTask/${processId}`,
      method: 'post',
      data: {}
    })
  },
  queryLinkFormData(id) {
    return request({
      url: `/workflow/process/queryHistoryForm/${id}`,
      method: 'get'
    })
  },
  // 查询当前节点的历史表单
  queryHistoryForm(processId, id) {
    return request({
      url: `/workflow/process/queryTaskNodes/${processId}/${id}`,
      method: 'get'
    })
  },
  // 查询历史处理节点
  queryHistoryNode(processInstanceId) {
    return request({
      url: `/workflow/process/queryHistoryTask/${processInstanceId}`,
      method: 'get'
    })
  },
  completeTask(processId, id, data) {
    return request({
      url: `/workflow/process/completeTask/${processId}/${id}`,
      method: 'post',
      data
    })
  },
  queryAllOrder(params) {
    return request({
      url: `/workflow/process/queryProcList/all`,
      method: 'get',
      params
    })
  }
}
export {
  processApi
}