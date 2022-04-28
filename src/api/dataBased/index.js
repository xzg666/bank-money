import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listQzx(query) {
    return request({
        url: '/loan/qzx/list',
        method: 'get',
        params: query
    })
}

// 查询【请填写功能名称】详细
export function getQzx(id) {
    return request({
        url: '/system/qzx/' + id,
        method: 'get'
    })
}

// 新增【请填写功能名称】
export function addQzx(data) {
    return request({
        url: '/system/qzx',
        method: 'post',
        data: data
    })
}

// 修改【请填写功能名称】
export function updateQzx(data) {
    return request({
        url: '/loan/qzx/update',
        method: 'post',
        data: data
    })
}

// 删除【请填写功能名称】
export function delQzx(id) {
    return request({
        url: '/system/qzx/' + id,
        method: 'delete'
    })
}

// 导出【请填写功能名称】
export function exportQzx(query) {
    return request({
        url: '/system/qzx/export',
        method: 'get',
        params: query
    })
}