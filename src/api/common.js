import request from '@/utils/request'
const commonApi = {
  getProvince() {
    return request({
      url: `/loan/crmProvince/allProvince`,
      method: 'get'
    })
  },
  getCity(id) {
    return request({
      url: `/loan/crmCity/getCityByPid?provinceId=${id}`,
      method: 'get'
    })
  },
  getArea(id) {
    return request({
      url: `/loan/crmDistrict/getDistrictByCid?cityId=${id}`,
      method: 'get'
    })
  },
}
export {
  commonApi
}