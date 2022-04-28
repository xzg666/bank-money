import request from '@/utils/request'
const templateListApi = {
  gettreeData(params) {
    return request({
      url: '/loan/templateCategoryMana/getTreeData',
      method: 'get',
      params
    })
  },
  addCategory(data) {
    return request({
      url: '/loan/templateCategoryMana/insert',
      method: 'post',
      data
    })
  },
  editCategory(data) {
    return request({
      url: '/loan/templateCategoryMana/update',
      method: 'post',
      data
    })
  },
  delCategory(id) {
    return request({
      url: `/loan/templateCategoryMana/delete/${id}`,
      method: 'post'
    })
  },
  getTableData(params) {
    return request({
      url: '/loan/templateDefInfoMana/selectByPage',
      method: 'get',
      params
    })
  },
  addTemplate(data) {
    return request({
      url: '/loan/templateDefInfoMana/insert',
      method: 'post',
      data
    })
  },
  editTemplate(data) {
    return request({
      url: '/loan/templateDefInfoMana/update',
      method: 'post',
      data
    })
  },
  delTemplate(id) {
    return request({
      url: `/loan/templateDefInfoMana/delete/${id}`,
      method: 'post'
    })
  },
  getHistoryList(params) {
    return request({
      url: '/loan/templateDefHisMana/selectByPage',
      method: 'get',
      params
    })
  }
}
export {
  templateListApi
}