<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useMarketStore } from '../../stores/market'
import MapChart from '../../components/charts/MapChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()
const router = useRouter()
const marketStore = useMarketStore()

// 搜索关键词
const searchKeyword = ref('')
// 是否正在加载
const isLoading = ref(false)
// 国家列表
const countries = ref([
  {
    id: 'us',
    name: '美国',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: '$350/sqft',
    rentalYield: '4.2%',
    annualGrowth: '+5.8%',
    continent: '北美洲'
  },
  {
    id: 'uk',
    name: '英国',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: '£580/sqft',
    rentalYield: '3.8%',
    annualGrowth: '+4.2%',
    continent: '欧洲'
  },
  {
    id: 'jp',
    name: '日本',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: '¥950,000/sqm',
    rentalYield: '3.5%',
    annualGrowth: '+2.1%',
    continent: '亚洲'
  },
  {
    id: 'au',
    name: '澳大利亚',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: 'A$8,500/sqm',
    rentalYield: '3.9%',
    annualGrowth: '+6.5%',
    continent: '大洋洲'
  },
  {
    id: 'ca',
    name: '加拿大',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: 'C$750/sqft',
    rentalYield: '4.0%',
    annualGrowth: '+4.8%',
    continent: '北美洲'
  },
  {
    id: 'de',
    name: '德国',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: '€4,800/sqm',
    rentalYield: '3.7%',
    annualGrowth: '+3.9%',
    continent: '欧洲'
  },
  {
    id: 'fr',
    name: '法国',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: '€10,500/sqm',
    rentalYield: '3.2%',
    annualGrowth: '+3.5%',
    continent: '欧洲'
  },
  {
    id: 'sg',
    name: '新加坡',
    image: 'https://via.placeholder.com/300x200',
    avgPrice: 'S$1,800/sqft',
    rentalYield: '3.5%',
    annualGrowth: '+5.2%',
    continent: '亚洲'
  }
])

// 世界地图数据
const worldMapData = ref({
  seriesName: '全球房产价格指数',
  min: 0,
  max: 100,
  visualMapText: ['高', '低'],
  data: [
    { name: 'United States', value: 85 },
    { name: 'United Kingdom', value: 78 },
    { name: 'France', value: 72 },
    { name: 'Germany', value: 68 },
    { name: 'Japan', value: 65 },
    { name: 'China', value: 90 },
    { name: 'Australia', value: 82 },
    { name: 'Canada', value: 76 },
    { name: 'Spain', value: 60 },
    { name: 'Italy', value: 55 },
    { name: 'Singapore', value: 88 }
  ]
})

// 大洲列表
const continents = [
  '全球',
  '亚洲',
  '欧洲',
  '北美洲',
  '南美洲',
  '非洲',
  '大洋洲'
]

// 当前选中的大洲
const selectedContinent = ref('全球')

// 过滤后的国家列表
const filteredCountries = computed(() => {
  let result = [...countries.value]
  
  // 按大洲筛选
  if (selectedContinent.value !== '全球') {
    result = result.filter(country => country.continent === selectedContinent.value)
  }
  
  // 按关键词搜索
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    result = result.filter(country => 
      country.name.toLowerCase().includes(keyword) || 
      country.continent.toLowerCase().includes(keyword)
    )
  }
  
  return result
})

// 跳转到国家详情页
const goToCountry = (countryId) => {
  router.push(`/markets/${countryId}`)
}

// 选择大洲
const selectContinent = (continent) => {
  selectedContinent.value = continent
}

// 搜索
const search = () => {
  // 这里可以添加搜索逻辑
}

onMounted(() => {
  // 可以在这里加载初始数据
})
</script>

<template>
  <div class="markets-page">
    <div class="container">
      <h1 class="page-title">{{ t('markets.title') }}</h1>
      
      <!-- 世界地图 -->
      <div class="world-map-container">
        <MapChart :chartData="worldMapData" title="全球房产价格指数" />
      </div>
      
      <!-- 搜索和筛选 -->
      <div class="search-filter-container">
        <div class="search-box">
          <input 
            type="text" 
            v-model="searchKeyword" 
            :placeholder="t('markets.searchPlaceholder')"
            @keyup.enter="search"
          >
          <button @click="search">
            <i class="fas fa-search"></i>
          </button>
        </div>
        
        <div class="continent-filter">
          <button 
            v-for="continent in continents" 
            :key="continent"
            :class="{ active: selectedContinent === continent }"
            @click="selectContinent(continent)"
          >
            {{ continent }}
          </button>
        </div>
      </div>
      
      <!-- 国家列表 -->
      <div v-if="isLoading" class="loading-container">
        <LoadingSpinner size="large" />
      </div>
      <div v-else class="countries-grid">
        <div 
          v-for="country in filteredCountries" 
          :key="country.id" 
          class="country-card"
          @click="goToCountry(country.id)"
        >
          <div class="country-image">
            <img :src="country.image" :alt="country.name">
            <div class="country-continent">{{ country.continent }}</div>
          </div>
          <div class="country-info">
            <h3>{{ country.name }}</h3>
            <div class="country-metrics">
              <div class="metric">
                <span class="metric-label">{{ t('markets.metrics.avgPrice') }}:</span>
                <span class="metric-value">{{ country.avgPrice }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">{{ t('markets.metrics.rentalYield') }}:</span>
                <span class="metric-value">{{ country.rentalYield }}</span>
              </div>
              <div class="metric">
                <span class="metric-label">{{ t('markets.metrics.annualGrowth') }}:</span>
                <span class="metric-value">{{ country.annualGrowth }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 无结果提示 -->
      <div v-if="filteredCountries.length === 0 && !isLoading" class="no-results">
        <p>没有找到匹配的国家，请尝试其他搜索条件。</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.markets-page {
  padding-top: 100px;
  padding-bottom: 50px;
}

.page-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 40px;
  color: var(--text-color);
}

/* 世界地图 */
.world-map-container {
  height: 500px;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* 搜索和筛选 */
.search-filter-container {
  margin-bottom: 40px;
}

.search-box {
  display: flex;
  max-width: 500px;
  margin: 0 auto 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px var(--shadow-color);
}

.search-box input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  font-size: 16px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.search-box input:focus {
  outline: none;
}

.search-box button {
  padding: 0 20px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-box button:hover {
  background-color: var(--primary-hover-color);
}

.continent-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
}

.continent-filter button {
  padding: 8px 15px;
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  border-radius: 20px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s;
}

.continent-filter button.active {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

.continent-filter button:hover:not(.active) {
  background-color: var(--bg-light-color);
}

/* 国家列表 */
.loading-container {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

.countries-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.country-card {
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.country-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-color);
}

.country-image {
  position: relative;
}

.country-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.country-continent {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
}

.country-info {
  padding: 20px;
}

.country-info h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.country-metrics {
  font-size: 14px;
}

.metric {
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
}

.metric-label {
  color: var(--text-light-color);
}

.metric-value {
  font-weight: 600;
  color: var(--text-color);
}

/* 无结果提示 */
.no-results {
  text-align: center;
  padding: 50px 0;
  color: var(--text-light-color);
}

/* 响应式设计 */
@media (max-width: 1200px) {
  .countries-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 992px) {
  .countries-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .countries-grid {
    grid-template-columns: 1fr;
  }
  
  .continent-filter {
    flex-direction: column;
    align-items: center;
  }
  
  .continent-filter button {
    width: 100%;
    max-width: 200px;
  }
}
</style>