import request from '@/utils/request'
const customInformationApi = {
  getCustomInfoList(params) {
    return request({
      url: '/loan/custManagement/getListByPage',
      method: 'get',
      params
    })
  },
  addCustomInfo(data) {
    return request({
      url: '/loan/custManagement/insert',
      method: 'post',
      data
    })
  },
  editCustomInfo(data) {
    return request({
      url: '/loan/custManagement/update',
      method: 'post',
      data
    })
  },
  editActualAddress(data) {
    return request({
      url: '/loan/custManagement/updateCustAddress',
      method: 'post',
      data
    })
  },
  deleteCustomInfo(id) {
    return request({
      url: `/loan/custManagement/delete/${id}`,
      method: 'post',
    })
  },
  getCustonContactsInfoByCertNo(certNo) {
    return request({
      url: `/loan/custContactsMana/selectListByCertNo/${certNo}`,
      method: 'get',
    })
  },
  updateContacts(data) {
    return request({
      url: '/loan/custContactsMana/updateBatch',
      method: 'post',
      data
    })
  },
  getAddressInfoByCertNo(certNo) {
    return request({
      url: `/loan/custAdressMana/selectListByCertNo/${certNo}`,
      method: 'get',
    })
  },
  updateAddress(data) {
    return request({
      url: '/loan/custAdressMana/updateBatch',
      method: 'post',
      data
    })
  }
}
export {
  customInformationApi
}
