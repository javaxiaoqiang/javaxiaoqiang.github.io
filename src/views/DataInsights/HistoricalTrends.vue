<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import LineChart from '../../components/charts/LineChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()

// 是否正在加载
const isLoading = ref(false)

// 筛选条件
const filters = ref({
  country: '全球',
  city: '所有城市',
  metric: '价格指数',
  startYear: '2015',
  endYear: '2025',
  interval: '年'
})

// 国家列表
const countries = ref([
  '全球',
  '美国',
  '英国',
  '中国',
  '日本',
  '澳大利亚',
  '加拿大',
  '德国',
  '法国'
])

// 城市列表（根据国家动态变化）
const cities = ref({
  '全球': ['所有城市'],
  '美国': ['所有城市', '纽约', '洛杉矶', '迈阿密', '旧金山', '芝加哥'],
  '英国': ['所有城市', '伦敦', '曼彻斯特', '利物浦', '爱丁堡', '伯明翰'],
  '中国': ['所有城市', '北京', '上海', '深圳', '广州', '杭州'],
  '日本': ['所有城市', '东京', '大阪', '福冈', '札幌', '名古屋'],
  '澳大利亚': ['所有城市', '悉尼', '墨尔本', '布里斯班', '珀斯', '阿德莱德'],
  '加拿大': ['所有城市', '多伦多', '温哥华', '蒙特利尔', '卡尔加里', '渥太华'],
  '德国': ['所有城市', '柏林', '慕尼黑', '汉堡', '法兰克福', '科隆'],
  '法国': ['所有城市', '巴黎', '里昂', '马赛', '波尔多', '尼斯']
})

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
  '2015',
  '2016',
  '2017',
  '2018',
  '2019',
  '2020',
  '2021',
  '2022',
  '2023',
  '2024',
  '2025'
])

// 时间间隔选项
const intervals = ref([
  '年',
  '季度',
  '月'
])

// 当前可用城市
const availableCities = computed(() => {
  return cities.value[filters.value.country] || ['所有城市']
})

// 趋势数据
const trendData = ref({
  legend: ['价格指数 (2015=100)'],
  xAxis: ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025'],
  series: [
    {
      name: '价格指数 (2015=100)',
      type: 'line',
      data: [100, 105, 112, 120, 128, 130, 140, 152, 160, 168, 175]
    }
  ]
})

// 趋势统计数据
const trendStats = ref({
  totalGrowth: '+75%',
  cagr: '+5.8%',
  volatility: '中等',
  peakYear: '2025',
  peakValue: '175',
  lowestYear: '2015',
  lowestValue: '100'
})

// 应用筛选条件
const applyFilters = () => {
  isLoading.value = true
  
  // 验证年份范围
  if (parseInt(filters.value.startYear) > parseInt(filters.value.endYear)) {
    alert('开始年份不能大于结束年份')
    isLoading.value = false
    return
  }
  
  // 模拟API请求
  setTimeout(() => {
    // 根据筛选条件更新图表数据
    updateChartData()
    isLoading.value = false
  }, 1000)
}

// 更新图表数据
const updateChartData = () => {
  // 这里应该根据筛选条件从API获取数据
  // 这里使用模拟数据
  
  // 生成X轴数据
  const startYear = parseInt(filters.value.startYear)
  const endYear = parseInt(filters.value.endYear)
  const xAxisData = []
  
  if (filters.value.interval === '年') {
    for (let year = startYear; year <= endYear; year++) {
      xAxisData.push(year.toString())
    }
  } else if (filters.value.interval === '季度') {
    for (let year = startYear; year <= endYear; year++) {
      for (let quarter = 1; quarter <= 4; quarter++) {
        xAxisData.push(`${year} Q${quarter}`)
      }
    }
  } else if (filters.value.interval === '月') {
    for (let year = startYear; year <= endYear; year++) {
      for (let month = 1; month <= 12; month++) {
        xAxisData.push(`${year}-${month.toString().padStart(2, '0')}`)
      }
    }
  }
  
  // 生成Y轴数据
  let seriesData = []
  let baseValue = 100
  let growthRate = 0
  
  if (filters.value.metric === '价格指数') {
    growthRate = filters.value.country === '中国' ? 8 : 5
  } else if (filters.value.metric === '租金回报率') {
    baseValue = 4
    growthRate = 0.2
  } else if (filters.value.metric === '年涨幅') {
    baseValue = 5
    growthRate = 0.5
  } else {
    baseValue = 50
    growthRate = 3
  }
  
  seriesData = generateTrendData(baseValue, growthRate, xAxisData.length)
  
  // 更新图表数据
  trendData.value = {
    legend: [`${filters.value.country} - ${filters.value.city} - ${filters.value.metric}`],
    xAxis: xAxisData,
    series: [
      {
        name: `${filters.value.country} - ${filters.value.city} - ${filters.value.metric}`,
        type: 'line',
        data: seriesData
      }
    ]
  }
  
  // 更新统计数据
  updateTrendStats(seriesData, xAxisData)
}

// 生成趋势数据
const generateTrendData = (baseValue, growthRate, length) => {
  const result = [baseValue]
  let current = baseValue
  
  for (let i = 1; i < length; i++) {
    // 添加一些随机波动
    const randomFactor = 0.7 + Math.random() * 0.6 // 0.7 - 1.3
    const growth = growthRate * randomFactor
    
    // 2020年（第6个数据点）模拟疫情影响，可能下降
    if (i === 5 && Math.random() > 0.3) {
      current = current * 0.95
    } else {
      current = current + growth
    }
    
    // 四舍五入到一位小数
    result.push(parseFloat(current.toFixed(1)))
  }
  
  return result
}

// 更新趋势统计数据
const updateTrendStats = (data, xAxis) => {
  const firstValue = data[0]
  const lastValue = data[data.length - 1]
  const totalGrowth = ((lastValue - firstValue) / firstValue * 100).toFixed(1)
  
  // 计算年复合增长率
  const years = (xAxis.length - 1) / (filters.value.interval === '年' ? 1 : filters.value.interval === '季度' ? 4 : 12)
  const cagr = ((Math.pow(lastValue / firstValue, 1 / years) - 1) * 100).toFixed(1)
  
  // 找出最高值和最低值
  let maxValue = data[0]
  let maxIndex = 0
  let minValue = data[0]
  let minIndex = 0
  
  for (let i = 1; i < data.length; i++) {
    if (data[i] > maxValue) {
      maxValue = data[i]
      maxIndex = i
    }
    if (data[i] < minValue) {
      minValue = data[i]
      minIndex = i
    }
  }
  
  // 计算波动性
  let volatility = '低'
  const variations = []
  for (let i = 1; i < data.length; i++) {
    variations.push(Math.abs(data[i] - data[i-1]) / data[i-1])
  }
  const avgVariation = variations.reduce((sum, val) => sum + val, 0) / variations.length
  
  if (avgVariation > 0.05) {
    volatility = '高'
  } else if (avgVariation > 0.02) {
    volatility = '中等'
  }
  
  trendStats.value = {
    totalGrowth: `${totalGrowth > 0 ? '+' : ''}${totalGrowth}%`,
    cagr: `${cagr > 0 ? '+' : ''}${cagr}%`,
    volatility: volatility,
    peakYear: xAxis[maxIndex],
    peakValue: maxValue.toString(),
    lowestYear: xAxis[minIndex],
    lowestValue: minValue.toString()
  }
}

// 导出图表为图片
const exportChart = () => {
  // 这里应该实现导出图表的逻辑
  alert('导出图表')
}

// 导出数据为CSV
const exportData = () => {
  // 这里应该实现导出数据的逻辑
  alert('导出数据为CSV')
}

// 组件挂载时初始化
onMounted(() => {
  // 可以在这里加载初始数据
})
</script>

<template>
  <div class="historical-trends-page">
    <div class="container">
      <h1 class="page-title">{{ t('dataInsights.historicalTrends') }}</h1>
      
      <!-- 导航标签 -->
      <div class="insights-tabs">
        <router-link to="/data-insights" class="tab">概览</router-link>
        <router-link to="/data-insights/market-reports" class="tab">{{ t('dataInsights.marketReports') }}</router-link>
        <router-link to="/data-insights/historical-trends" class="tab active">{{ t('dataInsights.historicalTrends') }}</router-link>
        <router-link to="/data-insights/interactive-charts" class="tab">{{ t('dataInsights.interactiveCharts') }}</router-link>
        <router-link to="/data-insights/heat-maps" class="tab">{{ t('dataInsights.heatMaps') }}</router-link>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters-section">
        <h2>趋势筛选</h2>
        <div class="filters-container">
          <div class="filter-group">
            <label>{{ t('dataInsights.filters.country') }}</label>
            <select v-model="filters.country">
              <option v-for="country in countries" :key="country" :value="country">
                {{ country }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>{{ t('dataInsights.filters.city') }}</label>
            <select v-model="filters.city">
              <option v-for="city in availableCities" :key="city" :value="city">
                {{ city }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>{{ t('dataInsights.filters.metrics') }}</label>
            <select v-model="filters.metric">
              <option v-for="metric in metrics" :key="metric" :value="metric">
                {{ metric }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>开始年份</label>
            <select v-model="filters.startYear">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>结束年份</label>
            <select v-model="filters.endYear">
              <option v-for="year in years" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>时间间隔</label>
            <select v-model="filters.interval">
              <option v-for="interval in intervals" :key="interval" :value="interval">
                {{ interval }}
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
      
      <!-- 趋势图表 -->
      <div v-else class="trend-section">
        <div class="trend-chart-container">
          <div class="chart-header">
            <h2>{{ filters.country }} - {{ filters.city }} - {{ filters.metric }} 历史趋势</h2>
            <div class="chart-actions">
              <button @click="exportChart" class="action-btn">
                <i class="fas fa-image"></i> 导出图表
              </button>
              <button @click="exportData" class="action-btn">
                <i class="fas fa-file-csv"></i> 导出数据
              </button>
            </div>
          </div>
          <LineChart :chartData="trendData" height="400px" />
        </div>
        
        <!-- 趋势统计 -->
        <div class="trend-stats-container">
          <h2>趋势统计</h2>
          <div class="stats-grid">
            <div class="stat-card">
              <div class="stat-title">总体增长</div>
              <div class="stat-value">{{ trendStats.totalGrowth }}</div>
              <div class="stat-desc">从{{ filters.startYear }}年到{{ filters.endYear }}年</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-title">年复合增长率</div>
              <div class="stat-value">{{ trendStats.cagr }}</div>
              <div class="stat-desc">从{{ filters.startYear }}年到{{ filters.endYear }}年</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-title">波动性</div>
              <div class="stat-value">{{ trendStats.volatility }}</div>
              <div class="stat-desc">基于历史数据分析</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-title">最高点</div>
              <div class="stat-value">{{ trendStats.peakValue }}</div>
              <div class="stat-desc">{{ trendStats.peakYear }}</div>
            </div>
            
            <div class="stat-card">
              <div class="stat-title">最低点</div>
              <div class="stat-value">{{ trendStats.lowestValue }}</div>
              <div class="stat-desc">{{ trendStats.lowestYear }}</div>
            </div>
          </div>
        </div>
        
        <!-- 趋势分析 -->
        <div class="trend-analysis-container">
          <h2>趋势分析</h2>
          <div class="analysis-content">
            <p>根据历史数据分析，{{ filters.country }}的{{ filters.metric }}在{{ filters.startYear }}年至{{ filters.endYear }}年期间总体呈现{{ trendStats.totalGrowth.startsWith('+') ? '上升' : '下降' }}趋势，总体增长{{ trendStats.totalGrowth }}，年复合增长率为{{ trendStats.cagr }}。</p>
            
            <p>市场波动性为{{ trendStats.volatility }}，最高点出现在{{ trendStats.peakYear }}，达到{{ trendStats.peakValue }}；最低点出现在{{ trendStats.lowestYear }}，为{{ trendStats.lowestValue }}。</p>
            
            <p>这一趋势表明，{{ filters.country }}的房地产市场在过去几年中表现{{ trendStats.totalGrowth.startsWith('+') ? '强劲' : '疲软' }}。投资者应关注市场的周期性变化和潜在的转折点，以制定合适的投资策略。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.historical-trends-page {
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
  grid-column: 1 / -1;
  padding: 10px 15px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-top: 10px;
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

/* 趋势图表 */
.trend-section {
  margin-bottom: 40px;
}

.trend-chart-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h2 {
  font-size: 20px;
  color: var(--text-color);
  margin: 0;
}

.chart-actions {
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
  margin-left: 10px;
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

/* 趋势统计 */
.trend-stats-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.trend-stats-container h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 15px;
}

.stat-card {
  background-color: var(--bg-light-color);
  border-radius: 8px;
  padding: 15px;
  text-align: center;
}

.stat-title {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 10px;
}

.stat-value {
  font-size: 24px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 5px;
}

.stat-desc {
  font-size: 12px;
  color: var(--text-light-color);
}

/* 趋势分析 */
.trend-analysis-container {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.trend-analysis-container h2 {
  font-size: 20px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.analysis-content p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 15px;
}

.analysis-content p:last-child {
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .stats-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .insights-tabs {
    flex-wrap: wrap;
  }
  
  .tab {
    margin-bottom: 10px;
  }
  
  .chart-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .chart-actions {
    margin-top: 10px;
  }
  
  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>