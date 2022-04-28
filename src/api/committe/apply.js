import request from '@/utils/request'

// 当前业务资金池可用额度接口
export function useCapital(id) {
    return request({
        url: '/system/quota/' + id,
        method: 'get',
    })
}

//发起流程
export function begainProcess(data) {
    return request({
        url: '/zjsq/info/addAndFqFlow',
        method: 'post',
        data: data
    })
}

//申请记录列表
export function applyList(query) {
    return request({
        url: '/zjsq/info/list',
        method: 'get',
        params: query
    })
}