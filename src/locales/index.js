import { createI18n } from 'vue-i18n'
import zhCN from './zh-CN'
import zhTW from './zh-TW'
import en from './en'
import ja from './ja'

const messages = {
  'zh-CN': zhCN,
  'zh-TW': zhTW,
  'en': en,
  'ja': ja
}

// 获取浏览器语言设置
const getBrowserLanguage = () => {
  const browserLang = navigator.language || navigator.userLanguage
  // 检查是否支持该语言
  if (messages[browserLang]) {
    return browserLang
  }
  // 如果不支持，检查语言的主要部分（例如 zh-HK -> zh）
  const mainLang = browserLang.split('-')[0]
  if (mainLang === 'zh') {
    return 'zh-CN' // 默认使用简体中文
  }
  return 'en' // 默认使用英文
}

// 从本地存储获取用户设置的语言
const getSavedLanguage = () => {
  return localStorage.getItem('language')
}

// 确定使用的语言
const getLanguage = () => {
  const savedLanguage = getSavedLanguage()
  if (savedLanguage && messages[savedLanguage]) {
    return savedLanguage
  }
  return getBrowserLanguage()
}

const i18n = createI18n({
  legacy: false, // 使用 Composition API 模式
  locale: getLanguage(),
  fallbackLocale: 'en',
  messages
})

export default i18n