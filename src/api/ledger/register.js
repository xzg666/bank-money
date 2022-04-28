import request from '@/utils/request'

// 查询实收流水-业务部门数据列表
export function queryList(query) {
    return request({
        url: '/tzdj/tzdjList',
        method: 'get',
        params: query
    })
}
//新增和修改
export function addUpadataRegister(data) {
    return request({
        url: '/tzdj',
        method: 'post',
        data: data
    })
}
//获取单条记录
export function getRegisterData(id) {
    return request({
        url: 'tzdj/tzdjList?id=' + id,
        method: 'get',
    })
}
// 修改
// export function updateRegister(data) {
//     return request({
//         url: '/tzdj',
//         method: 'put',
//         data: data
//     })
// }
// export function deleteApi(agreementId) {
//   return request({
//     url: '/agreement/deleteAgreement/' + agreementId,
//     method: 'delete'
//   })
// }