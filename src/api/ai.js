import request from './request'

// 向AI提问
export function askQuestion(data) {
  return request({
    url: '/ai/ask',
    method: 'post',
    data
  })
}

// 获取推荐问题
export function getSuggestedQuestions() {
  return request({
    url: '/ai/suggested-questions',
    method: 'get'
  })
}

// 获取相关数据
export function getRelatedData(params) {
  return request({
    url: '/ai/related-data',
    method: 'get',
    params
  })
}

// 获取完整趋势数据
export function getFullTrend(params) {
  return request({
    url: '/ai/full-trend',
    method: 'get',
    params
  })
}