import request from '@/utils/request'

// 查询【请填写功能名称】列表
export function listLog(query) {
    return request({
        url: '/gjjwd/info/list',
        method: 'get',
        params: query
    })
}

// 查询【请填写功能名称】详细
export function getLog(wdywId) {
    return request({
        url: '/gjjwd/info/' + wdywId,
        method: 'get'
    })
}

// 新增【请填写功能名称】
export function addLog(data) {
    return request({
        url: '/gjjwd/info/add',
        method: 'post',
        data: data
    })
}

// 保存附件
export function saveFile_api(data) {
    return request({
        url: '/loan/uploadFiles/batchsAdd',
        method: 'post',
        data: data
    })
}

// 修改【请填写功能名称】
export function update_info(data) {
    return request({
        url: '/gjjwd/info/upd',
        method: 'post',
        data: data
    })
}

// 登记
export function register_info(data) {
    return request({
        url: '/gjjwd/info/dj',
        method: 'post',
        data: data
    })
}

// 下载【请填写功能名称】
export function download_info(query) {
    return request({
        url: '/gjjwd/info/download',
        method: 'get',
        params: query
    })
}

// 委贷操作日志接口
export function oprate_api(query) {
    return request({
        url: '/gjjwd/info/byWdywidQueryLog/' + query.wdywId,
        method: 'get',
        params: query
    })
}

// 删除【请填写功能名称】
export function delLog(wdywId) {
    return request({
        url: '/system/log/' + wdywId,
        method: 'delete'
    })
}

// 导出【请填写功能名称】
export function exportLog(query) {
    return request({
        url: '/system/log/export',
        method: 'get',
        params: query
    })
}

//查看附件接口
export function getFile_api(query) {
    return request({
        url: '/loan/uploadFiles/list',
        method: 'get',
        params: query
    })
}

//删除附件数据库信息
export function delFileInfo_api(wdywId) {
    return request({
        url: '/loan/uploadFiles/delFileInfo/' + wdywId,
        method: 'get',
    })
}

// 删除服务器附件以及文件夹
export function delFileInfo2_api(fileId) {
    return request({
        url: '/loan/uploadFiles/deleteFile/' + fileId,
        method: 'get',
    })
}

// 委贷发起流程
export function process_api(data) {
    return request({
        url: '/gjjwd/info/gjjWdDataFqFlow',
        method: 'post',
        data: data
    })
}

//上传时的接口
export function preview_api(query) {
    return request({
        url: '/gjjwd/info/byFilePathDownload/',
        method: 'get',
        params: query
    })
}

//录入和发起流程一体化接口
export function addProcess_api(data) {
    return request({
        url: '/gjjwd/info/addAndFlowFq',
        method: 'post',
        data: data
    })
}


//批量登记接口
export function batchRegister_api(data) {
    return request({
        url: '/gjjwd/info/patchDj',
        method: 'post',
        data: data
    })
}

//获取函件模板
export function template_api(data) {
    return request({
        url: '/loan/templateDefInfoMana/selectByTemplateNo',
        method: 'post',
        data: data
    })
}


//获取结清函编号
export function letter_api(query) {
    return request({
        url: '/gjjwd/info/getAllJqhbh',
        method: 'get',
        params: query
    })
}

//打印结清函文件
export function printJqh_api(query) {
    return request({
        url: '/gjjwd/info/crateJqHj',
        method: 'get',
        params: query
    })
}
// export function printJqh_api(query) {
//     return request({
//         url: '/gjjwd/info/crateJqHj/'+ wdywId,
//         method: 'get',
//     })
// }