import request from '@/utils/request'

// 台账记录列表
export function queryList(query) {
    return request({
        url: '/tzdj/list',
        method: 'get',
        params: query
    })
}
// 台账记录删除
export function deleteTzdj(data) {
  return request({
    url: '/tzdj/remove',
    method: 'post',
    data: data
  })
}
// 台账记录列表
export function exportApi(query) {
    return request({
        url: '/tzdj/export',
        method: 'get',
        params: query
    })
}

//导出模板
export function exportTemplate(data) {
    return request({
        url: '/tzdj/exportMb',
        method: 'post',
        params: data
    })
}

//导入模板
export function importTemplate(data) {
    return request({
        url: '/tzdj/importData',
        method: 'post',
        params: data
    })
}

//台账登记 修改接口
export function updateInfo(data) {
    return request({
        url: '/tzdj/update',
        method: 'post',
        data: data
    })
}
//新增和修改
// export function addUpadataRegister(data) {
//     return request({
//         url: '/tzdj',
//         method: 'post',
//         data: data
//     })
// }
// //获取单条记录
// export function getRegisterData(id) {
//     return request({
//         url: 'tzdj/tzdjList?id=' + id,
//         method: 'get',
//     })
// }
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
