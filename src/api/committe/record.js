import request from '@/utils/request'


//资金池变动记录列表
export function recordList(query) {
    return request({
        url: '/system/log/list',
        method: 'get',
        params: query
    })
}

//资金池管理
export function moneyManage(query) {
    return request({
        url: '/system/quota/query',
        method: 'get',
        params: query
    })
}