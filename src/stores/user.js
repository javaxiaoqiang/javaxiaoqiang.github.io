import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  // 状态
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'))
  const savedQuestions = ref([])
  const historyQuestions = ref([])
  const followedMarkets = ref([])
  
  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const username = computed(() => userInfo.value.username || '')
  
  // 操作
  function setToken(newToken) {
    token.value = newToken
    localStorage.setItem('token', newToken)
  }
  
  function setUserInfo(info) {
    userInfo.value = info
    localStorage.setItem('userInfo', JSON.stringify(info))
  }
  
  function logout() {
    token.value = ''
    userInfo.value = {}
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
  }
  
  function saveQuestion(question) {
    savedQuestions.value.push(question)
  }
  
  function addHistoryQuestion(question) {
    historyQuestions.value.unshift(question)
    // 限制历史记录数量
    if (historyQuestions.value.length > 20) {
      historyQuestions.value.pop()
    }
  }
  
  function followMarket(market) {
    if (!followedMarkets.value.some(m => m.id === market.id)) {
      followedMarkets.value.push(market)
    }
  }
  
  function unfollowMarket(marketId) {
    followedMarkets.value = followedMarkets.value.filter(m => m.id !== marketId)
  }
  
  return {
    token,
    userInfo,
    savedQuestions,
    historyQuestions,
    followedMarkets,
    isLoggedIn,
    username,
    setToken,
    setUserInfo,
    logout,
    saveQuestion,
    addHistoryQuestion,
    followMarket,
    unfollowMarket
  }
})