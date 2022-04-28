import request from '@/utils/request'

// 电子保函查询列表接口
export function listQuery(query) {
    return request({
        url: '/xtdzztbbus/ywinfo/list',
        method: 'get',
        params: query
    })
}

//电子保函列表查看详情
export function getDzbhDetails(params) {

    return request({
        url: '/xtdzztbbus/ywinfo/' + params.id,
        method: 'get'
    })
}

//电子保函列表查询支付信息
export function getZfInfo(query) {

    return request({
        url: '/xtdzztbbus/ywinfo/paylist',
        method: 'get',
        params: query
    })
}

//导出 
export function exportLog(query) {
    return request({
        url: '/xtdzztbbus/ywinfo/export',
        method: 'get',
        params: query
    })
}


//开票处理保存接口
export function invoiceUpd(data) {
    return request({
        url: '/xtdzztbbus/ywinfo/upd',
        method: 'post',
        data
    })
}


// 电子保函报表列表查询接口
export function eveReportList(query) {
    return request({
        url: '/xtdzztbbus/ywinfo/queryReport',
        method: 'get',
        params: query
    })
}


//退保处理接口
export function invoiceBank(data) {
    return request({
        url: '/xtdzztbbus/ywinfo/dealBank',
        method: 'post',
        data
    })
}

//理赔处理接口
export function dealClaim(data) {
    return request({
        url: '/xtdzztbbus/ywinfo/dealClaim',
        method: 'post',
        data
    })
}


//电子保函报表导出 
export function exportBbList(query) {
    return request({
        url: '/xtdzztbbus/ywinfo/exportQueryReport',
        method: 'get',
        params: query
    })
}


// 支付信息列表查询接口
export function paymentList(query) {
    return request({
        url: '/xtdzztbbus/ywinfo/paylist',
        method: 'get',
        params: query
    })
}

//支付同步接口
export function synPayResult(data) {
    return request({
        url: '/xtdzztbbus/ywinfo/synPayResult',
        method: 'post',
        data
    })
}

// 接口日志查询接口
export function interfaceList(query) {
    return request({
        url: '/xtdzztbbus/interfacelog/list',
        method: 'get',
        params: query
    })
}

// 对账查询接口
export function reconList(query) {
    return request({
        url: '/zj/recon/list',
        method: 'get',
        params: query
    })
}

//对账查询导出接口
export function exportRecon(query) {
    return request({
        url: '/zj/recon/export',
        method: 'get',
        params: query
    })
}

// 对账统计数据列表接口
export function queryReconReprot(query) {
    return request({
        url: '/zj/recon/queryReconReprot',
        method: 'get',
        params: query
    })
}

//对账统计数据列表导出接口
export function exportReconReprot(query) {
    return request({
        url: '/zj/recon/exportReconReprot',
        method: 'get',
        params: query
    })
}

//获取中金对账文件
export function getZjReconFile(data) {
    return request({
        url: '/zj/recon/getZjReconFile',
        method: 'post',
        data
    })
}

//解析中金对账文件
export function jxZjReconFile(data) {
    return request({
        url: '/zj/recon/jxZjReconFile',
        method: 'post',
        data
    })
}

//对账接口
export function payRecon(data) {
    return request({
        url: '/zj/recon/payRecon',
        method: 'post',
        data
    })
}
//字典接口
export function getDict(query) {
    return request({
        url: '/system/dict/data/getAll',
        method: 'get',
        params: query
    })
}