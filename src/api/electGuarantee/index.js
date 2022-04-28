import request from '@/utils/request'

const guaranteeSendApi = {
  getPageList(params) {
    return request({
      url: '/ctzdzbh/lycginfo/list',
      method: 'get',
      params
    })
  },
  delete(ids) {
    return request({
      url: `/ctzdzbh/lycginfo/del/${ids}`,
      method: 'get',
    })
  },
  postMessage(data) {
    return request({
      url: '/ctzdzbh/lycginfo/sendMsg',
      method: 'post',
      data
    })
  },
  update(data) {
    return request({
      url: `/ctzdzbh/lycginfo/updZxInfo`,
      method: 'post',
      data
    })
  },
  // 保存修改日志
  saveLog(data) {
    return request({
      url: '/ctzdzbh/lycginfo/addLog',
      method: 'post',
      data
    })
  },
  // 保存标签
  editTags(data) {
    return request({
      url: '/ctzdzbh/lycginfo/updZxInfo',
      method: 'post',
      data
    })
  },
  // 查询修改日志
  getUpdateHistory(params) {
    return request({
      url: '/ctzdzbh/lycginfo/updZxlist',
      method: 'get',
      params
    })
  },
  // 获取单条明文秘钥
  // /ctzdzbh/lycginfo/byIdGetYuanWen/{id}
  getYuanWenBySingle(id) {
    return request({
      url: `/ctzdzbh/lycginfo/byIdGetYuanWen/${id}`,
      method: 'get'
    })
  },
  // 获取批量明文秘钥
  getYuanWenBymultiple(data) {
    return request({
      url: `/ctzdzbh/lycginfo/batchGetYuanWen`,
      method: 'post',
      data
    })
  },
  // 保存单条签名
  saveAutograph(data) {
    return request({
      url: `/ctzdzbh/lycginfo/add`,
      method: 'post',
      data
    })
  },
  // 批量保存签名
  saveMultipleAutograph(data) {
    return request({
      url: `/ctzdzbh/lycginfo/bacthAddSign`,
      method: 'post',
      data
    })
  },
  // 生成电子保函
  generateGuarantee(data) {
    return request({
      url: `/ctzdzbh/lycginfo/createDzbh`,
      method: 'post',
      data
    })
  },
  // 撤销增信
  cancleCredit(ctfIdc, bactCode) {
    // /cancelDzbh/{ctfIdc}/{bactCode}
    return request({
      url: `/ctzdzbh/lycginfo/cancelDzbh/${ctfIdc}/${bactCode}`,
      method: 'get'
    })
  }
}
const detailSearchApi = {
  exportDetail(params) {
    return request({
      url: '/ctzdzbh/lycginfo/export',
      method: 'get',
      params
    })
  }
}
const purchaseStaisticsApi = {
  getPageList(data) {
    return request({
      url: '/ctzdzbh/lycginfo/getPcStatistics',
      method: 'post',
      data
    })
  },
  exportStatistic(data) {
    return request({
      url: '/ctzdzbh/lycginfo/exportExc',
      method: 'post',
      data
    })
  }
}
export {
  guaranteeSendApi,
  detailSearchApi,
  purchaseStaisticsApi
}