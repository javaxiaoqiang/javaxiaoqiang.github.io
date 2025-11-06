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

// 国家ID
const countryId = computed(() => route.params.country)
// 是否正在加载
const isLoading = ref(false)
// 国家详情
const countryDetail = ref(null)
// 城市列表
const cities = ref([])
// 价格趋势数据
const priceTrendData = ref(null)
// 租金回报率数据
const rentalYieldData = ref(null)

// 模拟国家数据
const countryData = {
  'us': {
    id: 'us',
    name: '美国',
    image: 'https://via.placeholder.com/800x400',
    description: '美国房地产市场是全球最大和最具流动性的市场之一，提供多样化的投资机会。市场特点包括区域差异大、法律保护完善、融资渠道多样。热门城市包括纽约、洛杉矶、迈阿密和旧金山，每个城市都有其独特的市场动态和投资特点。',
    avgPrice: '$350/sqft',
    rentalYield: '4.2%',
    annualGrowth: '+5.8%',
    population: '3.31亿',
    gdpGrowth: '+2.1%',
    interestRate: '3.5%',
    cities: [
      {
        id: 'nyc',
        name: '纽约',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '$1,200/sqft',
        rentalYield: '3.8%',
        annualGrowth: '+4.2%'
      },
      {
        id: 'la',
        name: '洛杉矶',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '$750/sqft',
        rentalYield: '4.0%',
        annualGrowth: '+5.5%'
      },
      {
        id: 'miami',
        name: '迈阿密',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '$580/sqft',
        rentalYield: '4.5%',
        annualGrowth: '+7.2%'
      },
      {
        id: 'sf',
        name: '旧金山',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '$1,050/sqft',
        rentalYield: '3.5%',
        annualGrowth: '+4.8%'
      }
    ]
  },
  'uk': {
    id: 'uk',
    name: '英国',
    image: 'https://via.placeholder.com/800x400',
    description: '英国房地产市场以其稳定性和长期增长潜力而闻名，尤其是伦敦作为全球金融中心的地位使其成为国际投资者的热门选择。英国市场特点包括供应有限、需求稳定、法律体系完善。除伦敦外，曼彻斯特、利物浦和爱丁堡等城市也提供具有吸引力的投资机会。',
    avgPrice: '£580/sqft',
    rentalYield: '3.8%',
    annualGrowth: '+4.2%',
    population: '6,700万',
    gdpGrowth: '+1.8%',
    interestRate: '2.5%',
    cities: [
      {
        id: 'london',
        name: '伦敦',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '£950/sqft',
        rentalYield: '3.5%',
        annualGrowth: '+3.8%'
      },
      {
        id: 'manchester',
        name: '曼彻斯特',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '£350/sqft',
        rentalYield: '5.2%',
        annualGrowth: '+6.5%'
      },
      {
        id: 'liverpool',
        name: '利物浦',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '£280/sqft',
        rentalYield: '5.8%',
        annualGrowth: '+7.0%'
      },
      {
        id: 'edinburgh',
        name: '爱丁堡',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '£420/sqft',
        rentalYield: '4.5%',
        annualGrowth: '+5.2%'
      }
    ]
  },
  'jp': {
    id: 'jp',
    name: '日本',
    image: 'https://via.placeholder.com/800x400',
    description: '日本房地产市场以其稳定的租金回报和相对较低的入场门槛吸引了众多国际投资者。尽管人口老龄化带来长期挑战，但东京等主要城市的房产仍然保持较高的出租率和稳定的现金流。日本市场特点包括产权清晰、租赁法规对业主友好、融资成本低。',
    avgPrice: '¥950,000/sqm',
    rentalYield: '3.5%',
    annualGrowth: '+2.1%',
    population: '1.26亿',
    gdpGrowth: '+1.0%',
    interestRate: '0.1%',
    cities: [
      {
        id: 'tokyo',
        name: '东京',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '¥1,200,000/sqm',
        rentalYield: '3.2%',
        annualGrowth: '+2.5%'
      },
      {
        id: 'osaka',
        name: '大阪',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '¥750,000/sqm',
        rentalYield: '4.0%',
        annualGrowth: '+3.2%'
      },
      {
        id: 'fukuoka',
        name: '福冈',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '¥580,000/sqm',
        rentalYield: '4.5%',
        annualGrowth: '+3.8%'
      },
      {
        id: 'sapporo',
        name: '札幌',
        image: 'https://via.placeholder.com/300x200',
        avgPrice: '¥480,000/sqm',
        rentalYield: '4.8%',
        annualGrowth: '+2.8%'
      }
    ]
  }
}

// 加载国家详情
const loadCountryDetail = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    // 获取模拟数据
    const data = countryData[countryId.value]
    
    if (data) {
      countryDetail.value = data
      cities.value = data.cities
      
      // 生成价格趋势数据
      priceTrendData.value = {
        legend: ['价格指数 (2020=100)'],
        xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
        series: [
          {
            name: '价格指数 (2020=100)',
            type: 'line',
            data: generateRandomData(100, 5, 10, 6)
          }
        ]
      }
      
      // 生成租金回报率数据
      rentalYieldData.value = {
        legend: ['租金回报率 (%)'],
        xAxis: data.cities.map(city => city.name),
        series: [
          {
            name: '租金回报率 (%)',
            type: 'bar',
            data: data.cities.map(city => parseFloat(city.rentalYield))
          }
        ]
      }
    } else {
      // 国家不存在，返回市场页面
      router.push('/markets')
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

// 跳转到城市详情页
const goToCity = (cityId) => {
  router.push(`/markets/${countryId.value}/${cityId}`)
}

// 组件挂载时加载数据
onMounted(() => {
  loadCountryDetail()
})
</script>

<template>
  <div class="country-detail-page">
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner size="large" />
    </div>
    
    <div v-else-if="countryDetail" class="container">
      <!-- 国家头部信息 -->
      <div class="country-header">
        <div class="country-image">
          <img :src="countryDetail.image" :alt="countryDetail.name">
        </div>
        <div class="country-header-content">
          <h1>{{ countryDetail.name }}</h1>
          <div class="country-key-metrics">
            <div class="metric">
              <div class="metric-value">{{ countryDetail.avgPrice }}</div>
              <div class="metric-label">{{ t('markets.metrics.avgPrice') }}</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ countryDetail.rentalYield }}</div>
              <div class="metric-label">{{ t('markets.metrics.rentalYield') }}</div>
            </div>
            <div class="metric">
              <div class="metric-value">{{ countryDetail.annualGrowth }}</div>
              <div class="metric-label">{{ t('markets.metrics.annualGrowth') }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 国家描述 -->
      <div class="country-description">
        <p>{{ countryDetail.description }}</p>
      </div>
      
      <!-- 经济指标 -->
      <div class="economic-indicators">
        <h2>经济指标</h2>
        <div class="indicators-grid">
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-users"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ countryDetail.population }}</div>
              <div class="indicator-label">人口</div>
            </div>
          </div>
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ countryDetail.gdpGrowth }}</div>
              <div class="indicator-label">GDP增长率</div>
            </div>
          </div>
          <div class="indicator-card">
            <div class="indicator-icon">
              <i class="fas fa-percentage"></i>
            </div>
            <div class="indicator-content">
              <div class="indicator-value">{{ countryDetail.interestRate }}</div>
              <div class="indicator-label">基准利率</div>
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
      
      <!-- 租金回报率图表 -->
      <div class="chart-section">
        <h2>主要城市租金回报率对比</h2>
        <div class="chart-container">
          <BarChart :chartData="rentalYieldData" height="350px" />
        </div>
      </div>
      
      <!-- 主要城市 -->
      <div class="cities-section">
        <h2>主要城市</h2>
        <div class="cities-grid">
          <div 
            v-for="city in cities" 
            :key="city.id" 
            class="city-card"
            @click="goToCity(city.id)"
          >
            <div class="city-image">
              <img :src="city.image" :alt="city.name">
            </div>
            <div class="city-info">
              <h3>{{ city.name }}</h3>
              <div class="city-metrics">
                <div class="metric">
                  <span class="metric-label">{{ t('markets.metrics.avgPrice') }}:</span>
                  <span class="metric-value">{{ city.avgPrice }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">{{ t('markets.metrics.rentalYield') }}:</span>
                  <span class="metric-value">{{ city.rentalYield }}</span>
                </div>
                <div class="metric">
                  <span class="metric-label">{{ t('markets.metrics.annualGrowth') }}:</span>
                  <span class="metric-value">{{ city.annualGrowth }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 相关报告 -->
      <div class="related-reports">
        <h2>相关报告</h2>
        <div class="reports-list">
          <div class="report-item">
            <div class="report-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="report-info">
              <h3>{{ countryDetail.name }}房地产市场季度报告 (2025 Q3)</h3>
              <p>全面分析{{ countryDetail.name }}房地产市场的最新趋势、价格变动和投资机会。</p>
              <a href="#" class="btn btn-outline">
                <i class="fas fa-download"></i> 下载报告
              </a>
            </div>
          </div>
          <div class="report-item">
            <div class="report-icon">
              <i class="fas fa-file-pdf"></i>
            </div>
            <div class="report-info">
              <h3>{{ countryDetail.name }}投资指南 (2025)</h3>
              <p>详细介绍{{ countryDetail.name }}房地产投资流程、法律法规、税收政策和融资选项。</p>
              <a href="#" class="btn btn-outline">
                <i class="fas fa-download"></i> 下载报告
              </a>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 返回按钮 -->
      <div class="back-button">
        <router-link to="/markets" class="btn">
          <i class="fas fa-arrow-left"></i> 返回市场列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.country-detail-page {
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

/* 国家头部 */
.country-header {
  display: flex;
  margin-bottom: 40px;
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.country-image {
  width: 50%;
}

.country-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.country-header-content {
  width: 50%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.country-header-content h1 {
  font-size: 36px;
  margin-bottom: 30px;
  color: var(--text-color);
}

.country-key-metrics {
  display: flex;
  justify-content: space-between;
}

.country-key-metrics .metric {
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

/* 国家描述 */
.country-description {
  margin-bottom: 40px;
  padding: 20px;
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.country-description p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
}

/* 经济指标 */
.economic-indicators {
  margin-bottom: 40px;
}

.economic-indicators h2 {
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

/* 城市部分 */
.cities-section {
  margin-bottom: 40px;
}

.cities-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.cities-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
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

.city-image img {
  width: 100%;
  height: 150px;
  object-fit: cover;
}

.city-info {
  padding: 15px;
}

.city-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.city-metrics {
  font-size: 14px;
}

.city-metrics .metric {
  margin-bottom: 5px;
  display: flex;
  justify-content: space-between;
}

.city-metrics .metric-label {
  color: var(--text-light-color);
}

.city-metrics .metric-value {
  font-weight: 600;
  color: var(--text-color);
  font-size: 14px;
}

/* 相关报告 */
.related-reports {
  margin-bottom: 40px;
}

.related-reports h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.reports-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.report-item {
  display: flex;
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.report-icon {
  margin-right: 20px;
  font-size: 40px;
  color: var(--primary-color);
}

.report-info {
  flex: 1;
}

.report-info h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.report-info p {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 15px;
}

/* 返回按钮 */
.back-button {
  margin-top: 40px;
  text-align: center;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .country-header {
    flex-direction: column;
  }
  
  .country-image,
  .country-header-content {
    width: 100%;
  }
  
  .indicators-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .cities-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .reports-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .country-key-metrics {
    flex-direction: column;
    align-items: center;
  }
  
  .country-key-metrics .metric {
    margin-bottom: 15px;
  }
  
  .indicators-grid {
    grid-template-columns: 1fr;
  }
  
  .cities-grid {
    grid-template-columns: 1fr;
  }
  
  .report-item {
    flex-direction: column;
    text-align: center;
  }
  
  .report-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
}
</style>