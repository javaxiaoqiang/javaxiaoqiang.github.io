import request from './request'

// 获取所有国家列表
export function getCountries() {
  return request({
    url: '/markets/countries',
    method: 'get'
  })
}

// 获取特定国家的详情
export function getCountryDetail(countryId) {
  return request({
    url: `/markets/countries/${countryId}`,
    method: 'get'
  })
}

// 获取特定国家的城市列表
export function getCitiesByCountry(countryId) {
  return request({
    url: `/markets/countries/${countryId}/cities`,
    method: 'get'
  })
}

// 获取特定城市的详情
export function getCityDetail(countryId, cityId) {
  return request({
    url: `/markets/countries/${countryId}/cities/${cityId}`,
    method: 'get'
  })
}

// 获取市场数据
export function getMarketData(params) {
  return request({
    url: '/markets/data',
    method: 'get',
    params
  })
}

// 获取市场趋势数据
export function getMarketTrends(params) {
  return request({
    url: '/markets/trends',
    method: 'get',
    params
  })
}

// 获取市场报告
export function getMarketReports(params) {
  return request({
    url: '/markets/reports',
    method: 'get',
    params
  })
}

// 获取特定市场报告
export function getMarketReport(reportId) {
  return request({
    url: `/markets/reports/${reportId}`,
    method: 'get'
  })
}

// 搜索市场
export function searchMarkets(params) {
  return request({
    url: '/markets/search',
    method: 'get',
    params
  })
}