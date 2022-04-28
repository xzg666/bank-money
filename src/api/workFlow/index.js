import request from '@/utils/request'
const form_api = {
  getFormList(params) {
    return request({
      url: `/formcfg/getListByPage`,
      method: 'get',
      params
    })
  },
  deleteFormById(formId) {
    return request({
      url: `/formcfg/delete/${formId}`,
      method: 'get'
    })
  },
  getWorkFlowListByTypeId(linkId) {
    return request({
      url: `/actmodelent/queryActReModel?category=${linkId}`,
      method: 'get'
    })
  },
  addForm(data, id) {
    return request({
      url: id ? `/formcfg/${id}` : `/formcfg`,
      method: 'post',
      data
    })
  },
  getFormByFormId(id) {
    return request({
      url: `/formcfg/${id}`,
      method: 'get'
    })
  },
  queryAllTaskBykey(key) {
    // /flowcfgent/queryList?flowId=cdf
    return request({
      url: `/flowcfgent/queryList?flowId=${key}`,
      method: 'get'
    })
  }
}
const processApi = {
  getProcessList(params) {
    // /actmodelent
    return request({
      url: `/actmodelent/getListByPage`,
      method: 'get',
      params
    })
  },
  addProcess(data) {
    return request({
      url: `/actmodelent`,
      method: 'post',
      data
    })
  },
  delProcessById(id) {
    return request({
      url: `/actmodelent/delete/${id}`,
      method: 'get',
    })
  },
  publicProcess(id) {
    return request({
      url: `/actmodelent/release/${id}`,
      method: 'post'
    })
  }
}
const processConfigApi = {
  getTreeData() {
    return request({
      url: `/actmodelent/getAllModel`,
      method: 'get'
    })
  },
  getCallBack() {
    return request({
      url: `/flowcfgent/getCustomClz/1`,
      method: 'get'
    })
  },
  getNodeConfig(id) {
    return request({
      url: `/flowcfgent/${id}`
    })
  },
  getFormName(formId) {
    return request({
      url: `/formcfg/${formId}`,
    })
  },
  saveConfig(data) {
    return request({
      url: data.lsh ? `/flowcfgent/${data.lsh}` : `/flowcfgent`,
      method: 'post',
      data
    })
  }
}
export {
  form_api,
  processApi,
  processConfigApi
}