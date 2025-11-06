import request from './request'

// 获取博客文章列表
export function getBlogPosts(params) {
  return request({
    url: '/resources/blog',
    method: 'get',
    params
  })
}

// 获取特定博客文章
export function getBlogPost(id) {
  return request({
    url: `/resources/blog/${id}`,
    method: 'get'
  })
}

// 获取术语表
export function getGlossary(params) {
  return request({
    url: '/resources/glossary',
    method: 'get',
    params
  })
}

// 获取常见问题
export function getFAQ() {
  return request({
    url: '/resources/faq',
    method: 'get'
  })
}

// 搜索资源
export function searchResources(params) {
  return request({
    url: '/resources/search',
    method: 'get',
    params
  })
}