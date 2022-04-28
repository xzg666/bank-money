import request from '@/utils/request'

// 查询接口列表
export function supplierList(query) {
    return request({
        url: '/cztdzbh/contractinfo/list',
        method: 'get',
        params: query
    })
}