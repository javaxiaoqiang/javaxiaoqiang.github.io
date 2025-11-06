import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMarketStore = defineStore('market', () => {
  // 状态
  const countries = ref([])
  const cities = ref({}) // 按国家ID组织的城市列表
  const currentCountry = ref(null)
  const currentCity = ref(null)
  const marketData = ref({})
  const isLoading = ref(false)
  
  // 计算属性
  const sortedCountries = computed(() => {
    return [...countries.value].sort((a, b) => a.name.localeCompare(b.name))
  })
  
  const currentCountryCities = computed(() => {
    if (!currentCountry.value) return []
    return cities.value[currentCountry.value.id] || []
  })
  
  // 操作
  function setCountries(data) {
    countries.value = data
  }
  
  function setCities(countryId, data) {
    cities.value = {
      ...cities.value,
      [countryId]: data
    }
  }
  
  function setCurrentCountry(country) {
    currentCountry.value = country
  }
  
  function setCurrentCity(city) {
    currentCity.value = city
  }
  
  function setMarketData(data) {
    marketData.value = data
  }
  
  function setLoading(status) {
    isLoading.value = status
  }
  
  return {
    countries,
    cities,
    currentCountry,
    currentCity,
    marketData,
    isLoading,
    sortedCountries,
    currentCountryCities,
    setCountries,
    setCities,
    setCurrentCountry,
    setCurrentCity,
    setMarketData,
    setLoading
  }
})