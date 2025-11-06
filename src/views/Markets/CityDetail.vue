<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMarketStore } from '../../stores/market'
import LineChart from '../../components/charts/LineChart.vue'
import BarChart from '../../components/charts/BarChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const marketStore = useMarketStore()

// 国家ID和城市ID
const countryId = computed(() => route.params.country)
const cityId = computed(() => route.params.city)
// 是否正在加载
const isLoading = ref(false)
// 城市详情
const cityDetail = ref(null)
// 价格趋势数据
const priceTrendData = ref(null)
// 租金回报率数据
const rentalYieldData = ref(null)
// 相似城市
const similarCities = ref([])

// 模拟城市数据
const cityData = {
  'nyc': {
    id: 'nyc',
    name: '纽约',
    country: '美国',
    image: 'https://via.placeholder.com/800x400',
    description: '纽约是美国最大的城市，也是全球金融、商业和文化中心之一。纽约房地产市场以其高价值和多样性而闻名，从曼哈顿的豪华公寓到布鲁克林的历史建筑，提供各种投资机会。尽管价格高昂，但由于其持续的需求和有限的供应，纽约房地产长期以来一直是稳定的投资选择。',
    avgPrice: '$1,200/sqft',
    rentalYield: '3.8%',
    annualGrowth: '+4.2%',
    population: '840万',
    unemployment: '4.5%',
    medianIncome: '$75,000',
    neighborhoods: [
      {
        name: '曼哈顿',
        avgPrice: '$1,800/sqft',
        rentalYield: '3.2%',
        popularity: '高'
      },
      {
        name: '布鲁克林',
        avgPrice: '$950/sqft',
        rentalYield: '4.0%',
        popularity: '高'
      },
      {
        name: '皇后区',
        avgPrice: '$650/sqft',
        rentalYield: '4.5%',
        popularity: '中'
      },
      {
        name: '布朗克斯',
        avgPrice: '$450/sqft',
        rentalYield: '5.2%',
        popularity: '中低'
      }
    ]
  },
  'london': {
    id: 'london',
    name: '伦敦',
    country: '英国',
    image: 'https://via.placeholder.com/800x400',
    description: '伦敦是英国的首都和最大城市，也是欧洲最重要的金融中心之一。伦敦房地产市场以其国际化和高价值而著称，吸引了来自全球的投资者。尽管英国脱欧带来了一些不确定性，但伦敦的房地产市场仍然保持相对稳定，特别是在黄金地段的优质物业。',
    avgPrice: '£950/sqft',
    rentalYield: '3.5%',
    annualGrowth: '+3.8%',
    population: '900万',
    unemployment: '4.8%',
    medianIncome: '£39,000',
    neighborhoods: [
      {
        name: '威斯敏斯特',
        avgPrice: '£1,500/sqft',
        rentalYield: '3.0%',
        popularity: '高'
      },
      {
        name: '肯辛顿和切尔西',
        avgPrice: '£1,700/sqft',
        rentalYield: '2.8%',
        popularity: '高'
      },
      {
        name: '伊斯灵顿',
        avgPrice: '£950/sqft',
        rentalYield: '3.7%',
        popularity: '中高'
      },
      {
        name: '哈克尼',
        avgPrice: '£750/sqft',
        rentalYield: '4.2%',
        popularity: '中'
      }
    ]
  },
  'tokyo': {
    id: 'tokyo',
    name: '东京',
    country: '日本',
    image: 'https://via.placeholder.com/800x400',
    description: '东京是日本的首都和最大城市，也是全球最大的都市区之一。东京房地产市场以其稳定性和相对较高的租金回报率吸引了众多投资者。尽管日本面临人口老龄化的挑战，但东京作为国际大都市的地位确保了持续的住房需求，特别是在中心区域。',
    avgPrice: '¥1,200,000/sqm',
    rentalYield: '3.2%',
    annualGrowth: '+2.5%',
    population: '1,400万',
    unemployment: '2.8%',
    medianIncome: '¥6,000,000',
    neighborhoods: [
      {
        name: '港区',
        avgPrice: '¥2,000,000/sqm',
        rentalYield: '2.8%',
        popularity: '高'
      },
      {
        name: '涩谷区',
        avgPrice: '¥1,500,000/sqm',
        rentalYield: '3.0%',
        popularity: '高'
      },
      {
        name: '新宿区',
        avgPrice: '¥1,300,000/sqm',
        rentalYield: '3.2%',
        popularity: '高'
      },
      {
        name: '世田谷区',
        avgPrice: '¥950,000/sqm',
        rentalYield: '3.5%',
        popularity: '中高'
      }
    ]
  }
}

// 加载城市详情
const loadCityDetail = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    // 获取模拟数据
    const data = cityData[cityId.value]
    
    if (data) {
      cityDetail.value = data
      
      // 生成价格趋势数据
      priceTrendData.value = {
        legend: ['价格指数 (2020=100)'],
        xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
        series: [
          {
            name: '价格指数 (2020=100)',
            type: 'line',
            data: generateRandomData(100, 3, 8, 6)
          }
        ]
      }
      
      // 生成租金回报率数据
      rentalYieldData.value = {
        legend: ['租金回报率 (%)'],
        xAxis: data.neighborhoods.map(n => n.name),
        series: [
          {
            name: '租金回报率 (%)',
            type: 'bar',
            data: data.neighborhoods.map(n => parseFloat(n.rentalYield))
          }
        ]
      }
      
      // 生成相似城市
      similarCities.value = Object.values(cityData)
        .filter(city => city.id !== cityId.value)
        .slice(0, 3)
    } else {
      // 城市不存在，返回国家页面
      router.push(`/markets/${countryId.value}`)
    }
    
    isLoading.value = false
  }, 1000)
}

// 生成随机数据
const generateRandomData = (start, minIncrease, maxIncrease, count) => {
  const result = [start]
  let current = start
  
  for (let i = 1; i < count; i++) {
    const increase = minIncrease + Math.random() * (maxIncrease - minIncrease)
    current += increase
    result.push(Math.round(current))
  }
  
  return result
}

// 组件挂载时加载数据
onMounted(() => {
  loadCityDetail()
})
</script>

<template>
  <div class="city-detail-page">
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner size="large" />
    </div>
    
    <div v-else-if="cityDetail" class="container">
      <!-- 城市头部信息 -->
      <div class="city-header">
        <div class="city-image">
          <img :src="cityDetail.image" :alt="cityDetail.name">
        </div>
        <div class="city-header-content">
          <h1>{{ cityDetail.name }}</h1>
          <h2>{{ cityDetail.country }}</h2>
          <div class="city-key-metrics">
            <div class="metric">
              <div class="metric-value">{{ cityDetail.avgPrice }}</div>
              <div class="metric-label">{{ t('markets.metrics.avgPrice') }}</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ cityDetail.rentalYield }}</div>
              <div class="metric-label">{{ t('markets.metrics.rentalYield') }}</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ cityDetail.annualGrowth }}</div>
              <div class="metric-label">{{ t('markets.metrics.annualGrowth') }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 城市描述 -->
      <div class="city-description">
        <p>{{ cityDetail.description }}</p>
      </div>
      
      <!-- 城市指标 -->
      <div class="city-indicators">
        <h2>城市指标</h2>
        <div class="indicators-grid">
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ cityDetail.population }}</div>
              <div class="indicator-label">人口</div>
            </div>
          </div>
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-briefcase"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ cityDetail.unemployment }}</div>
              <div class="indicator-label">失业率</div>
            </div>
          </div>
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-money-bill-wave"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ cityDetail.medianIncome }}</div>
              <div class="indicator-label">中位收入</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 价格趋势图表 -->
      <div class="chart-section">
        <h2>房价趋势 (2020-2025)</h2>
        <div class="chart-container">
          <LineChart :chartData="priceTrendData" height="350px" />
        </div>
      </div>
      
      <!-- 主要社区 -->
      <div class="neighborhoods-section">
        <h2>主要社区</h2>
        <div class="neighborhoods-table">
          <table>
            <thead>
              <tr>
                <th>社区</th>
                <th>平均价格</th>
                <th>租金回报率</th>
                <th>受欢迎程度</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(neighborhood, index) in cityDetail.neighborhoods" :key="index">
                <td>{{ neighborhood.name }}</td>
                <td>{{ neighborhood.avgPrice }}</td>
                <td>{{ neighborhood.rentalYield }}</td>
                <td>{{ neighborhood.popularity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- 租金回报率图表 -->
      <div class="chart-section">
        <h2>社区租金回报率对比</h2>
        <div class="chart-container">
          <BarChart :chartData="rentalYieldData" height="350px" />
        </div>
      </div>
      
      <!-- 相似城市 -->
      <div v-if="similarCities.length > 0" class="similar-cities-section">
        <h2>相似城市</h2>
        <div class="similar-cities-grid">
          <div 
            v-for="city in similarCities" 
            :key="city.id" 
            class="city-card"
            @click="router.push(`/markets/${city.country.toLowerCase()}/${city.id}`)"
          >
            <div class="city-image">
              <img :src="city.image" :alt="city.name">
            </div>
            <div class="city-info">
              <h3>{{ city.name }}</h3>
              <p>{{ city.country }}</p>
              <div class="city-metrics">
                <div class="metric">
                  <span class="metric-label">{{ t('markets.metrics.avgPrice') }}:</span>
                  <span class="metric-value">{{ city.avgPrice }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">{{ t('markets.metrics.rentalYield') }}:</span>
                  <span class="metric-value">{{ city.rentalYield }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 返回按钮 -->
      <div class="back-button">
        <router-link :to="`/markets/${countryId}`" class="btn">
          <i class="fas fa-arrow-left"></i> 返回国家页面
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.city-detail-page {
  padding-top: 100px;
  padding-bottom: 50px;
}

.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 500px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 城市头部 */
.city-header {
  display: flex;
  margin-bottom: 40px;
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.city-image {
  width: 50%;
}

.city-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.city-header-content {
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.city-header-content h1 {
  font-size: 36px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.city-header-content h2 {
  font-size: 20px;
  margin-bottom: 30px;
  color: var(--text-light-color);
}

.city-key-metrics {
  display: flex;
  justify-content: space-between;
}

.city-key-metrics .metric {
  text-align: center;
}

.metric-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.metric-label {
  font-size: 14px;
  color: var(--text-light-color);
}

/* 城市描述 */
.city-description {
  margin-bottom: 40px;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.city-description p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
}

/* 城市指标 */
.city-indicators {
  margin-bottom: 40px;
}

.city-indicators h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.indicators-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.indicator-card {
  display: flex;
  align-items: center;
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.indicator-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.indicator-icon i {
  font-size: 20px;
  color: #fff;
}

.indicator-content {
  flex: 1;
}

.indicator-value {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 5px;
}

.indicator-label {
  font-size: 14px;
  color: var(--text-light-color);
}

/* 图表部分 */
.chart-section {
  margin-bottom: 40px;
}

.chart-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.chart-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

/* 社区表格 */
.neighborhoods-section {
  margin-bottom: 40px;
}

.neighborhoods-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.neighborhoods-table {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
  overflow-x: auto;
}

.neighborhoods-table table {
  width: 100%;
  border-collapse: collapse;
}

.neighborhoods-table th,
.neighborhoods-table td {
  padding: 12px 15px;
  text-align: left;
  border-bottom: 1px solid var(--border-color);
}

.neighborhoods-table th {
  font-weight: 600;
  color: var(--text-color);
  background-color: var(--bg-light-color);
}

.neighborhoods-table tr:last-child td {
  border-bottom: none;
}

/* 相似城市 */
.similar-cities-section {
  margin-bottom: 40px;
}

.similar-cities-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.similar-cities-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.city-card {
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.city-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-color);
}

.city-card .city-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.city-card .city-info {
  padding: 15px;
}

.city-card .city-info h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--text-color);
}

.city-card .city-info p {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 10px;
}

.city-card .city-metrics {
  font-size: 14px;
}

.city-card .city-metrics .metric {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.city-card .metric-label {
  color: var(--text-light-color);
}

.city-card .metric-value {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

/* 返回按钮 */
.back-button {
  margin-top: 40px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .city-header {
    flex-direction: column;
  }
  
  .city-image,
  .city-header-content {
    width: 100%;
  }
  
  .indicators-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .similar-cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .city-key-metrics {
    flex-direction: column;
    align-items: center;
  }
  
  .city-key-metrics .metric {
    margin-bottom: 15px;
  }
  
  .indicators-grid {
    grid-template-columns: 1fr;
  }
  
  .similar-cities-grid {
    grid-template-columns: 1fr;
  }
}
</style>