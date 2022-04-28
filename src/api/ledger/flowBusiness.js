import request from '@/utils/request'

// 查询实收流水-业务部门数据列表
export function queryYwbmList(query) {
    return request({
        url: '/loan/dchsqr/ywBmList',
        method: 'get',
        params: query
    })
}

// 自动匹配
export function queryAutomatch(data) {
    return request({
        url: '/loan/dchsqr/ls/zdpp',
        method: 'post',
        data: data
    })
}

// 挂起
export function hangUpApi(data) {
    return request({
        url: '/loan/dchsqr/gq',
        method: 'post',
        data: data
    })
}

// 提交财务对账/申诉
export function tjdzssApi(data) {
  return request({
    url: '/loan/dchsqr/tjdzss',
    method: 'post',
    data: data
  })
}

//关联台账
export function relataionApi(data) {
    return request({
        url: '/dchsqrjl/gltz',
        method: 'post',
        data: data
    })
}
//取消关联
export function updateRetaion(query) {
    return request({
        url: '/dchsqrjl/qx/update',
        method: 'get',
        params: query
    })
}
//导出模板
export function exportTemplate(data) {
    return request({
        url: '/loan/dchsqr/exportMb',
        method: 'post',
        params: data
    })
}

//导入模板
export function importTemplate(data) {
    return request({
        url: '/loan/dchsqr/importData',
        method: 'post',
        params: data
    })
}

//取消挂起
export function cacleHanUp(data) {
    return request({
        url: '/loan/dchsqr/qxgq',
        method: 'post',
        data: data
    })
}

//导入模板
export function submitCheck(data) {
    return request({
        url: '/loan/dchsqr/tjCwdz',
        method: 'post',
        data: data
    })
}
