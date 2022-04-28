import request from '@/utils/request'

// 查询接口列表
export function infoList(query) {
    return request({
        url: '/tduser/info/list',
        method: 'get',
        params: query
    })
}

// 导出接口
export function exportList(query) {
    return request({
        url: '/tduser/info/export',
        method: 'get',
        params: query
    })
}

export function infoDetail(id) {
    return request({
        url: '/tduser/info/' + id,
        method: 'get',
    })
}