import request from '@/utils/request'
// 查询数据
export function getListData(query) {
    return request({
        url: '/wxCustom/menu',
        method: 'get',
        params: query
    })
}

// 修改数据
export function editData(data) {
    return request({
        url: '/wxCustom/menu',
        method: 'post',
        data: data
    })
}

// 获取二维码
export function getEwmImg(query) {
    return request({
        url: '/wxCustom/createQR',
        method: 'get',
        params: query
    })
}