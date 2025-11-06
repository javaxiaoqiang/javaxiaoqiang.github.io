import axios from 'axios'
import { useAppStore } from '../stores/app'

// 创建axios实例
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    const appStore = useAppStore()
    appStore.setLoading(true)
    
    // 从本地存储获取token
    const token = localStorage.getItem('token')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    
    return config
  },
  error => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    
    const res = response.data
    
    // 如果返回的状态码不是200，说明接口请求有误
    if (response.status !== 200) {
      console.error('请求错误', res.message || '未知错误')
      return Promise.reject(new Error(res.message || '未知错误'))
    } else {
      return res
    }
  },
  error => {
    const appStore = useAppStore()
    appStore.setLoading(false)
    
    console.error('请求错误', error.message)
    
    // 处理401未授权错误
    if (error.response && error.response.status === 401) {
      // 清除token并跳转到登录页
      localStorage.removeItem('token')
      localStorage.removeItem('userInfo')
      window.location.href = '/user/login'
    }
    
    return Promise.reject(error)
  }
)

export default service