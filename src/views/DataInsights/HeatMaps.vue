<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import MapChart from '../../components/charts/MapChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()

// 是否正在加载
const isLoading = ref(false)

// 筛选条件
const filters = ref({
  region: '全球',
  metric: '价格指数',
  year: '2025'
})

// 地区选项
const regions = ref([
  '全球',
  '北美',
  '欧洲',
  '亚太',
  '拉丁美洲',
  '中东和非洲'
])

// 指标选项
const metrics = ref([
  '价格指数',
  '租金回报率',
  '年涨幅',
  '交易量',
  '空置率',
  '建筑许可'
])

// 年份选项
const years = ref([
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020'
])

// 热力图数据
const heatMapData = ref({
  seriesName: '全球房产价格指数 (2025)',
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
    { name: 'Brazil', value: 45 },
    { name: 'Russia', value: 40 },
    { name: 'India', value: 50 },
    { name: 'South Korea', value: 70 },
    { name: 'Mexico', value: 42 },
    { name: 'South Africa', value: 38 },
    { name: 'Singapore', value: 88 },
    { name: 'Netherlands', value: 65 },
    { name: 'Switzerland', value: 92 },
    { name: 'Sweden', value: 63 }
  ]
})

// 热点国家数据
const hotspotCountries = ref([
  {
    name: '中国',
    value: 90,
    change: '+8.5%',
    trend: 'up',
    comment: '中国房地产市场在2025年保持强劲增长，尤其是一线城市如北京、上海和深圳。政府调控政策和城市化进程继续影响市场走向。'
  },
  {
    name: '瑞士',
    value: 92,
    change: '+4.2%',
    trend: 'up',
    comment: '瑞士房地产市场以其稳定性和高价值而闻名，继续吸引全球投资者。低利率环境和强劲的经济基本面支撑了市场增长。'
  },
  {
    name: '新加坡',
    value: 88,
    change: '+6.8%',
    trend: 'up',
    comment: '新加坡作为亚洲金融中心，其房地产市场在2025年表现出色。政府政策和外国投资推动了市场增长。'
  },
  {
    name: '美国',
    value: 85,
    change: '+5.2%',
    trend: 'up',
    comment: '美国房地产市场在2025年保持稳健增长，尤其是科技中心和沿海城市。低失业率和经济增长支撑了市场表现。'
  },
  {
    name: '澳大利亚',
    value: 82,
    change: '+4.8%',
    trend: 'up',
    comment: '澳大利亚房地产市场在2025年继续增长，悉尼和墨尔本领跑。移民政策和经济表现是主要驱动因素。'
  }
])

// 冷点国家数据
const coldspotCountries = ref([
  {
    name: '俄罗斯',
    value: 40,
    change: '-2.5%',
    trend: 'down',
    comment: '俄罗斯房地产市场在2025年面临挑战，经济不确定性和地缘政治因素影响了市场表现。'
  },
  {
    name: '南非',
    value: 38,
    change: '-1.8%',
    trend: 'down',
    comment: '南非房地产市场在2025年表现疲软，经济增长放缓和政治不确定性是主要原因。'
  },
  {
    name: '墨西哥',
    value: 42,
    change: '+0.5%',
    trend: 'stable',
    comment: '墨西哥房地产市场在2025年基本持平，经济增长缓慢和安全问题影响了市场发展。'
  },
  {
    name: '巴西',
    value: 45,
    change: '+1.2%',
    trend: 'stable',
    comment: '巴西房地产市场在2025年略有增长，但仍面临经济和政治挑战。'
  },
  {
    name: '意大利',
    value: 55,
    change: '+2.0%',
    trend: 'stable',
    comment: '意大利房地产市场在2025年温和增长，但区域差异明显，北部城市表现优于南部地区。'
  }
])

// 应用筛选条件
const applyFilters = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    // 根据筛选条件更新热力图数据
    updateHeatMapData()
    isLoading.value = false
  }, 1000)
}

// 更新热力图数据
const updateHeatMapData = () => {
  // 这里应该根据筛选条件从API获取数据
  // 这里使用模拟数据
  
  // 根据指标调整数据范围
  let min = 0
  let max = 100
  let seriesName = `${filters.region} ${filters.metric} (${filters.year})`
  
  if (filters.metric === '租金回报率') {
    min = 2
    max = 8
  } else if (filters.metric === '年涨幅') {
    min = -5
    max = 15
  }
  
  // 生成随机数据
  const data = [
    { name: 'United States', value: generateRandomValue(60, 90, filters.metric) },
    { name: 'United Kingdom', value: generateRandomValue(60, 85, filters.metric) },
    { name: 'France', value: generateRandomValue(55, 80, filters.metric) },
    { name: 'Germany', value: generateRandomValue(55, 80, filters.metric) },
    { name: 'Japan', value: generateRandomValue(50, 75, filters.metric) },
    { name: 'China', value: generateRandomValue(70, 95, filters.metric) },
    { name: 'Australia', value: generateRandomValue(65, 90, filters.metric) },
    { name: 'Canada', value: generateRandomValue(60, 85, filters.metric) },
    { name: 'Spain', value: generateRandomValue(45, 70, filters.metric) },
    { name: 'Italy', value: generateRandomValue(40, 65, filters.metric) },
    { name: 'Brazil', value: generateRandomValue(30, 55, filters.metric) },
    { name: 'Russia', value: generateRandomValue(25, 50, filters.metric) },
    { name: 'India', value: generateRandomValue(35, 60, filters.metric) },
    { name: 'South Korea', value: generateRandomValue(55, 80, filters.metric) },
    { name: 'Mexico', value: generateRandomValue(30, 55, filters.metric) },
    { name: 'South Africa', value: generateRandomValue(25, 50, filters.metric) },
    { name: 'Singapore', value: generateRandomValue(70, 95, filters.metric) },
    { name: 'Netherlands', value: generateRandomValue(50, 75, filters.metric) },
    { name: 'Switzerland', value: generateRandomValue(75, 95, filters.metric) },
    { name: 'Sweden', value: generateRandomValue(50, 75, filters.metric) }
  ]
  
  // 更新热力图数据
  heatMapData.value = {
    seriesName,
    min,
    max,
    visualMapText: ['高', '低'],
    data
  }
  
  // 更新热点和冷点国家
  updateHotspotAndColdspotCountries(data)
}

// 生成随机值
const generateRandomValue = (min, max, metric) => {
  if (metric === '租金回报率') {
    // 租金回报率范围通常在2-8%
    return parseFloat((min / 20 + Math.random() * (max - min) / 20).toFixed(1))
  } else if (metric === '年涨幅') {
    // 年涨幅范围通常在-5%到15%
    return parseFloat(((min - 50) / 5 + Math.random() * (max - min) / 5).toFixed(1))
  } else {
    // 其他指标使用0-100的范围
    return Math.floor(min + Math.random() * (max - min))
  }
}

// 更新热点和冷点国家
const updateHotspotAndColdspotCountries = (data) => {
  // 排序数据
  const sortedData = [...data].sort((a, b) => b.value - a.value)
  
  // 获取前5名作为热点
  const topFive = sortedData.slice(0, 5)
  hotspotCountries.value = topFive.map(country => {
    return {
      name: country.name,
      value: country.value,
      change: `+${(Math.random() * 8 + 2).toFixed(1)}%`,
      trend: 'up',
      comment: `${country.name}房地产市场在${filters.year}年表现强劲，是全球投资者关注的热点市场之一。`
    }
  })
  
  // 获取后5名作为冷点
  const bottomFive = sortedData.slice(-5).reverse()
  coldspotCountries.value = bottomFive.map(country => {
    const changeValue = (Math.random() * 4 - 2).toFixed(1)
    const trend = changeValue > 0 ? (changeValue > 1 ? 'up' : 'stable') : 'down'
    
    return {
      name: country.name,
      value: country.value,
      change: `${changeValue > 0 ? '+' : ''}${changeValue}%`,
      trend,
      comment: `${country.name}房地产市场在${filters.year}年表现${trend === 'up' ? '略有增长' : trend === 'stable' ? '基本持平' : '疲软'}，面临一定的挑战和不确定性。`
    }
  })
}

// 导出图表为图片
const exportChart = () => {
  // 这里应该实现导出图表的逻辑
  alert('导出热力图')
}

// 组件挂载时初始化
onMounted(() => {
  // 可以在这里加载初始数据
})
</script>

<template>
  <div class="heat-maps-page">
    <div class="container">
      <h1 class="page-title">{{ t('dataInsights.heatMaps') }}</h1>
      
      <!-- 导航标签 -->
      <div class="insights-tabs">
        <router-link to="/data-insights" class="tab">概览</router-link>
        <router-link to="/data-insights/market-reports" class="tab">{{ t('dataInsights.marketReports') }}</router-link>
        <router-link to="/data-insights/historical-trends" class="tab">{{ t('dataInsights.historicalTrends') }}</router-link>
        <router-link to="/data-insights/interactive-charts" class="tab">{{ t('dataInsights.interactiveCharts') }}</router-link>
        <router-link to="/data-insights/heat-maps" class="tab active">{{ t('dataInsights.heatMaps') }}</router-link>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters-section">
        <h2>热力图筛选</h2>
        <div class="filters-container">
          <div class="filter-group">
            <label>地区</label>
            <select v-model="filters.region">
              <option v-for="region in regions" :key="region" :value="region">
                {{ region }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>指标</label>
            <select v-model="filters.metric">
              <option v-for="metric in metrics" :key="metric" :value="metric">
                {{ metric }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>年份</label>
            <select v-model="filters.year">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          
          <button @click="applyFilters" class="apply-btn">应用筛选</button>
        </div>
      </div>
      
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-container">
        <LoadingSpinner size="large" />
      </div>
      
      <!-- 热力图区域 -->
      <div v-else class="heat-map-section">
        <div class="heat-map-container">
          <div class="map-header">
            <h2>{{ heatMapData.seriesName }}</h2>
            <div class="map-actions">
              <button @click="exportChart" class="action-btn">
                <i class="fas fa-download"></i> {{ t('dataInsights.export') }}
              </button>
            </div>
          </div>
          <MapChart :chartData="heatMapData" height="500px" />
        </div>
        
        <!-- 热点和冷点分析 -->
        <div class="hotspot-coldspot-section">
          <div class="hotspot-container">
            <h2>热点市场</h2>
            <div class="country-list">
              <div v-for="(country, index) in hotspotCountries" :key="index" class="country-item">
                <div class="country-rank">{{ index + 1 }}</div>
                <div class="country-info">
                  <div class="country-header">
                    <h3>{{ country.name }}</h3>
                    <div class="country-value">
                      <span>{{ country.value }}</span>
                      <span :class="`trend-${country.trend}`">{{ country.change }}</span>
                    </div>
                  </div>
                  <p class="country-comment">{{ country.comment }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="coldspot-container">
            <h2>冷点市场</h2>
            <div class="country-list">
              <div v-for="(country, index) in coldspotCountries" :key="index" class="country-item">
                <div class="country-rank">{{ index + 1 }}</div>
                <div class="country-info">
                  <div class="country-header">
                    <h3>{{ country.name }}</h3>
                    <div class="country-value">
                      <span>{{ country.value }}</span>
                      <span :class="`trend-${country.trend}`">{{ country.change }}</span>
                    </div>
                  </div>
                  <p class="country-comment">{{ country.comment }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 市场洞察 -->
        <div class="market-insights">
          <h2>市场洞察</h2>
          <div class="insights-content">
            <p>根据{{ filters.year }}年的{{ filters.metric }}热力图分析，全球房地产市场呈现明显的区域差异：</p>
            
            <ul>
              <li><strong>亚太地区</strong>：中国、新加坡和澳大利亚领跑，这些市场受益于强劲的经济增长和城市化进程。</li>
              <li><strong>欧洲</strong>：瑞士表现最佳，而南欧国家如意大利和西班牙相对落后。</li>
              <li><strong>北美</strong>：美国和加拿大保持稳健增长，尤其是主要城市中心。</li>
              <li><strong>新兴市场</strong>：表现参差不齐，印度展现出增长潜力，而俄罗斯和南非面临挑战。</li>
            </ul>
            
            <p>投资者应关注热点市场的可持续性和冷点市场的潜在机会。全球经济环境、利率变化和地缘政治因素将继续影响各地区的房地产市场表现。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.heat-maps-page {
  padding-top: 100px;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.page-title {
  text-align: center;
  font-size: 36px;
  margin-bottom: 30px;
  color: var(--text-color);
}

/* 导航标签 */
.insights-tabs {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  border-bottom: 1px solid var(--border-color);
}

.tab {
  padding: 12px 20px;
  margin: 0 5px;
  font-size: 16px;
  font-weight: 500;
  color: var(--text-light-color);
  border-bottom: 3px solid transparent;
  transition: all 0.3s;
}

.tab:hover {
  color: var(--primary-color);
}

.tab.active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
}

/* 筛选器 */
.filters-section {
  margin-bottom: 40px;
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.filters-section h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.filters-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  align-items: end;
}

.filter-group {
  display: flex;
  flex-direction: column;
}

.filter-group label {
  font-size: 14px;
  margin-bottom: 5px;
  color: var(--text-light-color);
}

.filter-group select {
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: var(--bg-color);
  color: var(--text-color);
}

.apply-btn {
  padding: 10px 15px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.apply-btn:hover {
  background-color: var(--primary-hover-color);
}

/* 加载中 */
.loading-container {
  display: flex;
  justify-content: center;
  padding: 50px 0;
}

/* 热力图区域 */
.heat-map-section {
  margin-bottom: 40px;
}

.heat-map-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.map-header h2 {
  font-size: 20px;
  color: var(--text-color);
  margin: 0;
}

.map-actions {
  display: flex;
}

.action-btn {
  padding: 8px 15px;
  background-color: var(--bg-light-color);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-color);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.action-btn i {
  margin-right: 5px;
}

.action-btn:hover {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

/* 热点和冷点分析 */
.hotspot-coldspot-section {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 30px;
}

.hotspot-container,
.coldspot-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.hotspot-container h2,
.coldspot-container h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
}

.country-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.country-item {
  display: flex;
  background-color: var(--bg-light-color);
  border-radius: 8px;
  overflow: hidden;
}

.country-rank {
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  background-color: var(--primary-color);
}

.hotspot-container .country-rank {
  background-color: #f5222d;
}

.coldspot-container .country-rank {
  background-color: #1890ff;
}

.country-info {
  flex: 1;
  padding: 15px;
}

.country-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.country-header h3 {
  font-size: 18px;
  margin: 0;
  color: var(--text-color);
}

.country-value {
  display: flex;
  align-items: center;
}

.country-value span:first-child {
  font-size: 18px;
  font-weight: 600;
  color: var(--text-color);
  margin-right: 10px;
}

.trend-up {
  color: #52c41a;
}

.trend-down {
  color: #f5222d;
}

.trend-stable {
  color: #faad14;
}

.country-comment {
  font-size: 14px;
  color: var(--text-light-color);
  margin: 0;
  line-height: 1.5;
}

/* 市场洞察 */
.market-insights {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.market-insights h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.insights-content p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 15px;
}

.insights-content ul {
  margin-bottom: 15px;
  padding-left: 20px;
}

.insights-content li {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 8px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hotspot-coldspot-section {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .insights-tabs {
    flex-wrap: wrap;
  }
  
  .tab {
    margin-bottom: 10px;
  }
  
  .map-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .map-actions {
    margin-top: 10px;
  }
}

@media (max-width: 576px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
}
</style>