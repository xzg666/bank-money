import request from '@/utils/request'

// 查询接口列表
export function interfaceList(query) {
    return request({
        url: '/loan/interfaceInfo/listByInterfaceInfo',
        method: 'get',
        params: query
    })
}

//接口配置  新增修改
export function addUpdataApi(data) {
    return request({
        url: '/loan/interfaceInfo/submitTdInterfaceInfo',
        method: 'post',
        data: data
    })
}

// 查询接口配置详情
export function interfaceDetails(query) {
    return request({
        url: '/loan/interfaceInfo/getTdInterfaceInfoById',
        method: 'get',
        params: query
    })
}

//接口配置  新增修改
export function delInterfaceApi(data) {
    return request({
        url: '/loan/interfaceInfo/deleteTdInterfaceInfo',
        method: 'post',
        data: data
    })
}

//根据接口id查看接口日志
export function interfaceLogApi(data) {
      
    return request({
        url: '/loan/interfaceInfo/getTlInterfaceLogInfoByInterfaceId/' + data.interfaceInfoId,
        method: 'get',
    })
}