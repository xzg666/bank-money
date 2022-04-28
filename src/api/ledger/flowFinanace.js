import request from '@/utils/request'

// 查询实收流水-财务部门数据列表
export function queryList(query) {
    return request({
        url: '/loan/dchsqr/cwBmList',
        method: 'get',
        params: query
    })
}

// 自动匹配
// export function queryAutomatch(data) {
//     return request({
//         url: '/loan/dchsqr/ls/zdpp',
//         method: 'post',
//         data: data
//     })
// }

// // 挂起
// export function hangUpApi(data) {
//     return request({
//         url: '/loan/dchsqr/gq',
//         method: 'post',
//         data: data
//     })
// }