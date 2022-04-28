import request from '@/utils/request'

// 查询树形结构
export function rulesTypeTree(query) {
    return request({
        url: '/loan/ruleType/listByRuleType',
        method: 'get',
        params: query
    })
}
// 查询规则类别
export function queryRules(query) {
    return request({
        url: '/loan/ruleType/getTdRuleTypeById',
        method: 'get',
        params: query
    })
}
//新增和修改规则类型
export function addRules(data) {
    return request({
        url: '/loan/ruleType/submitTdRuleType',
        method: 'post',
        data: data
    })
}

//删除
export function delRules(data) {
    return request({
        url: '/loan/ruleType/deleteTdRuleType',
        method: 'post',
        data: data
    })
}

// 获取条目列表
export function itemListApi(query) {
    return request({
        url: '/loan/ruleEntryType/listByRuleEntryType',
        method: 'get',
        params: query
    })
}

// 新增条目类型
export function addItemList(data) {
    return request({
        url: '/loan/ruleEntryType/submitTdRuleEntryType',
        method: 'post',
        data: data
    })
}

// 查询条目信息
export function queryItems(query) {
    return request({
        url: '/loan/ruleEntryType/getTdRuleEntryTypeById',
        method: 'get',
        params: query
    })
}

// 删除条目信息
export function delItems(data) {
    return request({
        url: '/loan/ruleEntryType/deleteTdRuleEntryType',
        method: 'post',
        data: data
    })
}

// 获取规则模板列表
export function rulesListApi(query) {
    return request({
        url: '/loan/ruleEntryTemplate/listByRuleEntryTemplate',
        method: 'get',
        params: query
    })
}

// 新增修改规则模板
export function rulesAddUpdataApi(data) {
    return request({
        url: '/loan/ruleEntryTemplate/submitTdRuleEntryTemplate',
        method: 'post',
        data: data
    })
}

// 查询规则模板
export function queryRulesTemplate(query) {
    return request({
        url: '/loan/ruleEntryTemplate/getTdRuleEntryTemplateById',
        method: 'get',
        params: query
    })
}

// 删除规则模板
export function delRulesTemplate(data) {
    return request({
        url: '/loan/ruleEntryTemplate/deleteTdRuleEntryTemplate',
        method: 'post',
        data: data
    })
}

//获取规则配置下拉选择
export function getBussinessSelect(query) {
    return request({
        url: '/loan/ruleType/listTreeByRuleType',
        method: 'get',
        params: query
    })
}


//获取规则配置列表页
export function getRulesConfigList(query) {
    return request({
        url: '/loan/ruleVersion/listByRuleVersion',
        method: 'get',
        params: query
    })
}

//查询模板配置接口
export function queryTemplateConfig(query) {
    return request({
        url: '/loan/ruleVersion/getTdRuleVersionByRuleTypeId',
        method: 'get',
        params: query
    })
}

//查询业务类型下拉选择
export function getBusSelect(query) {
    return request({
        url: '/loan/busType/listByBusType',
        method: 'get',
        params: query
    })
}

//新增修改规则配置
export function add_updata_rules(data) {
    return request({
        url: '/loan/ruleVersion/submitTdRuleVersion',
        method: 'post',
        data: data
    })
}

//查询规则配置详细
export function queryRuleDetail(query) {
    return request({
        url: '/loan/ruleVersion/getTdRuleVersionById',
        method: 'get',
        params: query
    })
}

//查询业务类型树形结构
export function queryBusType(query) {
    return request({
        url: '/loan/busType/listByBusType',
        method: 'get',
        params: query
    })
}


//新增修改业务类型
export function add_updata_bus(data) {
    return request({
        url: '/loan/busType/submitTdBusType',
        method: 'post',
        data: data
    })
}

//查询业务类型
export function queryBusTypeData(query) {
    return request({
        url: '/loan/busType/getTdBusTypeById',
        method: 'get',
        params: query
    })
}

//删除业务类型
export function delBusType(data) {
    return request({
        url: '/loan/busType/deleteTdBusType',
        method: 'post',
        data: data
    })
}

//历史版本
export function queryHis(query) {
    return request({
        url: '/loan/ruleVersion/listByHisRuleVersion',
        method: 'get',
        params: query
    })
}

//生效
export function effectApi(data) {
    return request({
        url: '/loan/ruleVersion/setTdRuleVersionStatus',
        method: 'post',
        data: data
    })
}

//配置日志接口
export function configLogApi(query) {
    return request({
        url: '/loan/ruleVersion/listByRuleVersionLog',
        method: 'get',
        params: query
    })
}

export function downloadApi(query) {
    return request({
        url: '/loan/ruleVersion/download',
        method: 'get',
        params: query
    })
}


// 查看台账
// export function queryDetail(query) {
//     return request({
//         url: '/loan/dchsqr/ygl',
//         method: 'get',
//         params: query
//     })
// }
// export function deleteApi(agreementId) {
//   return request({
//     url: '/agreement/deleteAgreement/' + agreementId,
//     method: 'delete'
//   })
// }