import request from './request'

// 用户登录
export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

// 用户注册
export function register(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

// 获取用户信息
export function getUserInfo() {
  return request({
    url: '/user/info',
    method: 'get'
  })
}

// 更新用户信息
export function updateUserInfo(data) {
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}

// 获取用户保存的问题
export function getSavedQuestions() {
  return request({
    url: '/user/saved-questions',
    method: 'get'
  })
}

// 保存问题
export function saveQuestion(data) {
  return request({
    url: '/user/save-question',
    method: 'post',
    data
  })
}

// 删除保存的问题
export function deleteSavedQuestion(id) {
  return request({
    url: `/user/saved-questions/${id}`,
    method: 'delete'
  })
}

// 获取用户历史问题
export function getHistoryQuestions() {
  return request({
    url: '/user/history-questions',
    method: 'get'
  })
}

// 获取用户关注的市场
export function getFollowedMarkets() {
  return request({
    url: '/user/followed-markets',
    method: 'get'
  })
}

// 关注市场
export function followMarket(data) {
  return request({
    url: '/user/follow-market',
    method: 'post',
    data
  })
}

// 取消关注市场
export function unfollowMarket(id) {
  return request({
    url: `/user/followed-markets/${id}`,
    method: 'delete'
  })
}