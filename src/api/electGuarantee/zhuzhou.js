import request from '@/utils/request'

// 电子保函查询列表接口
export function listQuery(query) {
    return request({
        url: '/zzdzztb/ywinfo/list',
        method: 'get',
        params: query
    })
}


//导出 
export function exportLog(query) {
    return request({
        url: '/zzdzztb/ywinfo/export',
        method: 'get',
        params: query
    })
}