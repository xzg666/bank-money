import request from '@/utils/request'

// 查询接口列表
export function repaymentList(query) {
    return request({
        url: '/creditloan/repaydetail/list',
        method: 'get',
        params: query
    })
}

//导入
export function importRepayment(data) {
    return request({
        url: '/creditloan/repaydetail/detailImport',
        method: 'post',
        data: data
    })
}