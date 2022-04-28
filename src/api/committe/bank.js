import request from '@/utils/request'
//银行业务回款记录
export function bankList(query) {
    return request({
        url: '/gjjbusi/pz/list',
        method: 'get',
        params: query
    })
}

//附件按钮
export function uploadFile_api(data) {
    return request({
        url: '/gjjbusi/pz/uploadBankHkInfoExcel',
        method: 'post',
        data: data
    })
}

//批量发起
export function bankProcess_api(data) {
    return request({
        url: '/gjjbusi/pz/batchFqFlow',
        method: 'post',
        data: data
    })
}

//下载模板