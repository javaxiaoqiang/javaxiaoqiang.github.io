import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAppStore = defineStore('app', () => {
  // 状态
  const language = ref(localStorage.getItem('language') || 'zh-CN')
  const theme = ref(localStorage.getItem('theme') || 'light')
  const isLoading = ref(false)
  const loginModalVisible = ref(false)
  const registerModalVisible = ref(false)
  
  // 操作
  function setLanguage(lang) {
    language.value = lang
    localStorage.setItem('language', lang)
  }
  
  function setTheme(newTheme) {
    theme.value = newTheme
    localStorage.setItem('theme', newTheme)
    // 更新文档根元素的主题类
    document.documentElement.setAttribute('data-theme', newTheme)
  }
  
  function setLoading(status) {
    isLoading.value = status
  }
  
  function openLoginModal() {
    loginModalVisible.value = true
    registerModalVisible.value = false
  }
  
  function openRegisterModal() {
    registerModalVisible.value = true
    loginModalVisible.value = false
  }
  
  function closeAuthModals() {
    loginModalVisible.value = false
    registerModalVisible.value = false
  }
  
  return {
    language,
    theme,
    isLoading,
    loginModalVisible,
    registerModalVisible,
    setLanguage,
    setTheme,
    setLoading,
    openLoginModal,
    openRegisterModal,
    closeAuthModals
  }
})