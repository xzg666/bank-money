import request from '@/utils/request'

// 查询实收流水-业务部门数据列表
export function queryList(query) {
    return request({
        url: '/loan/dchsqr/his',
        method: 'get',
        params: query
    })
}
// 查看台账
export function queryDetail(query) {
    return request({
        url: '/loan/dchsqr/ygl',
        method: 'get',
        params: query
    })
}
// export function deleteApi(agreementId) {
//   return request({
//     url: '/agreement/deleteAgreement/' + agreementId,
//     method: 'delete'
//   })
// }