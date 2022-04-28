import request from '@/utils/request'

// 查询催收人员列表
export function getSysNameList(query) {
  return request({
    url: '/loan/tdVideoInfo/sysNames',
    method: 'get',
    params: query
  })
}
// 查询录音文件记录列表
export function listInfo(query) {
  return request({
    url: '/loan/tdVideoInfo/list',
    method: 'get',
    params: query
  })
}


// 导出录音文件记录
export function exportInfo(query) {
  return request({
    url: '/loan/tdVideoInfo/export',
    method: 'get',
    params: query,
    timeout: 120000,
  })
}
