import request from '@/utils/request'
const registerBody = {
    getTestdata(params) {
        return request({
            url: '/collectionInfo/getDcxx',
            method: 'get',
            params,
            baseURL: process.env.VUE_APP_INTERFACE_API
        })
    },
    getRegisterList(params) {
        return request({
            url: '/loan/overdue/getNowLoginListByPage',
            method: 'get',
            params
        })
    },
    //获取待办数量
    getTodoNumber(data) {
        return request({
            url: '/loan/collectionRegister/getTaskCsdbCnt',
            method: 'post',
            data
        })
    },
    getTaskByCond(data) {
        return request({
            url: '/loan/collectionRegister/getTaskByCond',
            method: 'post',
            data
        })
    },
    // 催收任务保存
    saveTelephoneTask(data) {
        return request({
            url: '/loan/collectionRegister/saveTaskAndFile',
            method: 'post',
            data,
        })
    },
    getTaksStatusByTaskId(taskId) {
        return request({
            url: `/loan/overdue/${taskId}`,
            method: 'get'
        })
    },
    getProvince() {
        return request({
            url: `/loan/crmProvince/allProvince`,
            method: 'get'
        })
    },
    getCity(id) {
        return request({
            url: `/loan/crmCity/getCityByPid?provinceId=${id}`,
            method: 'get'
        })
    },
    getArea(id) {
        return request({
            url: `/loan/crmDistrict/getDistrictByCid?cityId=${id}`,
            method: 'get'
        })
    },
    // 获取短信模板
    getMessageTemplate() {
        return request({
            url: `/loan/smsConfig/getCsdxmbList`,
            type: 'get'
        })
    },
    // 获取致电对象
    // /loan/collectionRegister/getCustContacts?zjhm=430232197501255306
    getConectList(IDNumber) {
        return request({
            url: `/loan/collectionRegister/getCustContacts?zjhm=${IDNumber}`,
            type: 'get'
        })
    },
    // 获取催收信息
    getOverDueHisInfo(params) {
        return request({
            url: `/loan/OverdueApi/getCsxx`,
            method: 'get',
            params
        })
    },
    //  获取代偿信息
    getUnitInformation(params) {
        return request({
            url: `/loan/OverdueApi/getDcxx`,
            method: 'get',
            params
        })
    },
    //  获取缴存信息
    getPersonalAmtInfo(params) {
        return request({
            url: `/loan/OverdueApi/getJcxx`,
            method: 'get',
            params
        })
    },
    //  获取单位信息
    getCompanyInfo(params) {
        return request({
            url: `/loan/OverdueApi/getDwxx`,
            method: 'get',
            params
        })
    },
    // getUnitInformation  获取单位信息
    // getUnitInformation(params) {
    //     return request({
    //         url: `/loan/collectionRelatedInfo/getUnitInformation`,
    //         method: 'get',
    //         params
    //     })
    // },
    // getJointOwnerInfo 共有人信息
    getJointOwnerInfo(params) {
        return request({
            url: `/loan/OverdueApi/getGtjkrxx`,
            method: 'get',
            params
        })
    },
    // getCollateralInfoInfo 抵押物信息
    getCollateralInfoInfo(params) {
        return request({
            url: `/loan/OverdueApi/getDywxx`,
            method: 'get',
            params
        })
    },
    // 获取拖欠信息
    getOverDueInfo(params) {
        return request({
            url: `/loan/OverdueApi/getGryqlsxx`,
            method: 'get',
            params
        })
    },
    // 查询还款信息
    // /cydb-admin/loan/collectionRelatedInfo/getCustBackInfo
    getCustBackInfo(params) {
        return request({
            url: `/loan/OverdueApi/getHkxx`,
            method: 'get',
            params
        })
    },
    // 催收登记弹出框业务信息
    getCustomBaseInfo(certNo) {
        return request({
            url: `/loan/custContactsMana/selectListByCertNo/${certNo}`,
            method: 'get',
        })
    },
    // 查询客户贷款信息
    getLoanInfo(id) {
        return request({
            url: `/loan/overdue/byGlidGetInfo/${id}`,
            method: 'get',
        })
    },
    // 获取建议处理方式 /loan/collectionRegister/taskDetail/getYqCsyxjyfs
    getProposal(id) {
        return request({
            url: `/loan/collectionRegister/taskDetail/getYqCsyxjyfs/${id}`,
            method: 'get',
        })
    },
    // 获取催收记录
    getUrgeHistory(params) {
        return request({
            url: `/loan/collectionRegister/selectLsdbByZjhm`,
            method: 'get',
            params
        })
    },
    // 获取客户标签
    getCustomLabel(params) {
        return request({
            url: `/cust/label/list`,
            method: 'get',
            params
        })
    },
    // 新增客户标签
    addCustomLabel(data) {
        return request({
            url: '/cust/label/add',
            method: 'post',
            data
        })
    },
    // 修改客户标签
    updateCustomLabel(data) {
        return request({
            url: '/cust/label/upd',
            method: 'post',
            data
        })
    },
    // 修改客户实际地址
    changeActualAddress(data) {
        return request({
            url: `/loan/custManagement/update`,
            method: 'post',
            data
        })
    },
    getActualTel(certNo) {
        return request({
            url: `/loan/custContactsMana/selectListByCertNo/${certNo}`,
            method: 'get',
        })
    },
    // 获取发函记录
    getSendfilesHistory(data) {
        return request({
            url: `/loan/collectionRegister/getFtzlFhcsList`,
            method: 'post',
            data
        })
    },
    // 导出数据
    exportDetail(params) {
        return request({
            url: '/loan/overdue/export',
            method: 'get',
            params
        })
    }
}
const messageStaticsApi = {
    // 查询短信发送统计
    getMseeageStaticsList(params) {
        return request({
            url: `/loan/dxSendStatis/list`,
            method: 'get',
            params
        })
    },
    reSendMessage(data) {
        return request({
            url: '/loan/dxSendStatis/batchSendDx',
            method: 'post',
            data
        })
    }
}
const toDealApi = {
    // 保存单个用户的待办
    saveTaskBySingle(data) {
        return request({
            url: `/loan/collectionRegister/addCsTask`,
            method: 'post',
            data
        })
    },
    // 保存多个用户
    saveTaskByMultiple(data) {
        return request({
            url: `/loan/collectionRegister/batchAddCsTask`,
            method: 'post',
            data
        })
    },
    // 通过函件类型获取函件模板
    getHjmbByDbId(params) {
        return request({
            url: `/loan/templateDefInfoMana/byCategoryIdGetList`,
            method: 'get',
            params
        })
    },
    // 查询已有的催收任务类型
    queryExistedTodoType(data) {
        return request({
            url: `/loan/collectionRegister/csRwIsExist`,
            method: 'post',
            data
        })
    }

}
export {
    registerBody,
    messageStaticsApi,
    toDealApi
}