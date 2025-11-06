<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LineChart from '../../components/charts/LineChart.vue'
import BarChart from '../../components/charts/BarChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()

// 是否正在加载
const isLoading = ref(false)

// 当前选中的图表类型
const selectedChartType = ref('line')

// 图表类型选项
const chartTypes = [
  { id: 'line', name: '折线图', icon: 'fas fa-chart-line' },
  { id: 'bar', name: '柱状图', icon: 'fas fa-chart-bar' },
  { id: 'scatter', name: '散点图', icon: 'fas fa-braille' },
  { id: 'pie', name: '饼图', icon: 'fas fa-chart-pie' }
]

// 筛选条件
const filters = ref({
  dataSet: '全球房价指数',
  countries: ['美国', '英国', '中国', '日本', '澳大利亚'],
  timeRange: '2020-2025',
  compareBy: '国家'
})

// 数据集选项
const dataSets = [
  '全球房价指数',
  '租金回报率',
  '年涨幅',
  '交易量',
  '空置率',
  '建筑许可'
]

// 国家选项
const countryOptions = [
  { id: '美国', name: '美国' },
  { id: '英国', name: '英国' },
  { id: '中国', name: '中国' },
  { id: '日本', name: '日本' },
  { id: '澳大利亚', name: '澳大利亚' },
  { id: '加拿大', name: '加拿大' },
  { id: '德国', name: '德国' },
  { id: '法国', name: '法国' },
  { id: '西班牙', name: '西班牙' },
  { id: '意大利', name: '意大利' }
]

// 时间范围选项
const timeRanges = [
  '2020-2025',
  '2015-2025',
  '2010-2025',
  '最近5年',
  '最近10年',
  '最近15年'
]

// 比较方式选项
const compareByOptions = [
  '国家',
  '城市',
  '年份'
]

// 图表数据
const chartData = ref({
  legend: ['美国', '英国', '中国', '日本', '澳大利亚'],
  xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
  series: [
    {
      name: '美国',
      type: 'line',
      data: [100, 105, 110, 118, 125, 132]
    },
    {
      name: '英国',
      type: 'line',
      data: [100, 103, 108, 112, 118, 124]
    },
    {
      name: '中国',
      type: 'line',
      data: [100, 108, 118, 125, 135, 145]
    },
    {
      name: '日本',
      type: 'line',
      data: [100, 102, 105, 108, 112, 115]
    },
    {
      name: '澳大利亚',
      type: 'line',
      data: [100, 106, 114, 120, 128, 135]
    }
  ]
})

// 切换图表类型
const changeChartType = (type) => {
  selectedChartType.value = type
  
  // 更新图表数据的类型
  const newSeries = chartData.value.series.map(series => {
    return {
      ...series,
      type: type === 'scatter' ? 'scatter' : type
    }
  })
  
  chartData.value = {
    ...chartData.value,
    series: newSeries
  }
}

// 切换国家选择
const toggleCountry = (countryId) => {
  const index = filters.value.countries.indexOf(countryId)
  if (index > -1) {
    // 至少保留一个国家
    if (filters.value.countries.length > 1) {
      filters.value.countries.splice(index, 1)
    }
  } else {
    filters.value.countries.push(countryId)
  }
}

// 应用筛选条件
const applyFilters = () => {
  isLoading.value = true
  
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
  let xAxisData = []
  if (filters.value.timeRange === '2020-2025') {
    xAxisData = ['2020', '2021', '2022', '2023', '2024', '2025']
  } else if (filters.value.timeRange === '2015-2025') {
    xAxisData = ['2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
  } else if (filters.value.timeRange === '2010-2025') {
    xAxisData = ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023', '2024', '2025']
  } else {
    xAxisData = ['2020', '2021', '2022', '2023', '2024', '2025']
  }
  
  // 生成系列数据
  const seriesData = []
  
  filters.value.countries.forEach(country => {
    const baseValue = 100
    const growthRate = country === '中国' ? 8 : country === '美国' ? 6 : country === '澳大利亚' ? 7 : country === '英国' ? 5 : 3
    
    const data = generateTrendData(baseValue, growthRate, xAxisData.length)
    
    seriesData.push({
      name: country,
      type: selectedChartType.value === 'scatter' ? 'scatter' : selectedChartType.value,
      data: data
    })
  })
  
  // 更新图表数据
  chartData.value = {
    legend: filters.value.countries,
    xAxis: xAxisData,
    series: seriesData
  }
}

// 生成趋势数据
const generateTrendData = (baseValue, growthRate, length) => {
  const result = [baseValue]
  let current = baseValue
  
  for (let i = 1; i < length; i++) {
    // 添加一些随机波动
    const randomFactor = 0.7 + Math.random() * 0.6 // 0.7 - 1.3
    const growth = growthRate * randomFactor
    
    // 2020年（可能是第6个或第11个数据点）模拟疫情影响，可能下降
    if ((length === 11 && i === 5) || (length === 16 && i === 10) || (length === 6 && i === 0)) {
      if (Math.random() > 0.3) {
        current = current * 0.95
      } else {
        current = current + growth
      }
    } else {
      current = current + growth
    }
    
    // 四舍五入到整数
    result.push(Math.round(current))
  }
  
  return result
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
  <div class="interactive-charts-page">
    <div class="container">
      <h1 class="page-title">{{ t('dataInsights.interactiveCharts') }}</h1>
      
      <!-- 导航标签 -->
      <div class="insights-tabs">
        <router-link to="/data-insights" class="tab">概览</router-link>
        <router-link to="/data-insights/market-reports" class="tab">{{ t('dataInsights.marketReports') }}</router-link>
        <router-link to="/data-insights/historical-trends" class="tab">{{ t('dataInsights.historicalTrends') }}</router-link>
        <router-link to="/data-insights/interactive-charts" class="tab active">{{ t('dataInsights.interactiveCharts') }}</router-link>
        <router-link to="/data-insights/heat-maps" class="tab">{{ t('dataInsights.heatMaps') }}</router-link>
      </div>
      
      <!-- 图表类型选择 -->
      <div class="chart-type-selector">
        <div 
          v-for="type in chartTypes" 
          :key="type.id" 
          class="chart-type-option" 
          :class="{ active: selectedChartType === type.id }"
          @click="changeChartType(type.id)"
        >
          <i :class="type.icon"></i>
          <span>{{ type.name }}</span>
        </div>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters-section">
        <h2>数据筛选</h2>
        <div class="filters-container">
          <div class="filter-group">
            <label>数据集</label>
            <select v-model="filters.dataSet">
              <option v-for="dataSet in dataSets" :key="dataSet" :value="dataSet">
                {{ dataSet }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>时间范围</label>
            <select v-model="filters.timeRange">
              <option v-for="range in timeRanges" :key="range" :value="range">
                {{ range }}
              </option>
            </select>
          </div>
          
          <div class="filter-group">
            <label>比较方式</label>
            <select v-model="filters.compareBy">
              <option v-for="option in compareByOptions" :key="option" :value="option">
                {{ option }}
              </option>
            </select>
          </div>
          
          <div class="filter-group country-selector">
            <label>选择国家 (至少选择一个)</label>
            <div class="country-options">
              <div 
                v-for="country in countryOptions" 
                :key="country.id" 
                class="country-option" 
                :class="{ selected: filters.countries.includes(country.id) }"
                @click="toggleCountry(country.id)"
              >
                {{ country.name }}
              </div>
            </div>
          </div>
          
          <button @click="applyFilters" class="apply-btn">应用筛选</button>
        </div>
      </div>
      
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-container">
        <LoadingSpinner size="large" />
      </div>
      
      <!-- 图表区域 -->
      <div v-else class="chart-section">
        <div class="chart-container">
          <div class="chart-header">
            <h2>{{ filters.dataSet }} ({{ filters.timeRange }})</h2>
            <div class="chart-actions">
              <button @click="exportChart" class="action-btn">
                <i class="fas fa-image"></i> 导出图表
              </button>
              <button @click="exportData" class="action-btn">
                <i class="fas fa-file-csv"></i> 导出数据
              </button>
            </div>
          </div>
          
          <LineChart v-if="selectedChartType === 'line'" :chartData="chartData" height="500px" />
          <BarChart v-else-if="selectedChartType === 'bar'" :chartData="chartData" height="500px" />
          <LineChart v-else :chartData="chartData" height="500px" />
        </div>
        
        <!-- 图表分析 -->
        <div class="chart-analysis">
          <h2>数据分析</h2>
          <div class="analysis-content">
            <p>根据上图所示，在{{ filters.timeRange }}期间，{{ filters.countries.join('、') }}的{{ filters.dataSet }}呈现不同的发展趋势：</p>
            
            <ul>
              <li v-if="filters.countries.includes('中国')"><strong>中国</strong>：增长最为迅速，累计增长约45%，年均增长率约7.7%。</li>
              <li v-if="filters.countries.includes('澳大利亚')"><strong>澳大利亚</strong>：表现强劲，累计增长约35%，年均增长率约6.2%。</li>
              <li v-if="filters.countries.includes('美国')"><strong>美国</strong>：保持稳定增长，累计增长约32%，年均增长率约5.7%。</li>
              <li v-if="filters.countries.includes('英国')"><strong>英国</strong>：增长相对温和，累计增长约24%，年均增长率约4.4%。</li>
              <li v-if="filters.countries.includes('日本')"><strong>日本</strong>：增长最为缓慢，累计增长约15%，年均增长率约2.8%。</li>
            </ul>
            
            <p>这些数据表明，新兴市场（如中国）的房地产市场增长速度明显快于成熟市场（如日本、英国）。投资者可能需要根据自身风险偏好和投资目标，在高增长但可能波动较大的市场和增长较慢但相对稳定的市场之间做出选择。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.interactive-charts-page {
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
  margin-bottom: 30px;
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

/* 图表类型选择器 */
.chart-type-selector {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.chart-type-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 25px;
  margin: 0 10px;
  background-color: var(--bg-color);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
}

.chart-type-option i {
  font-size: 24px;
  margin-bottom: 8px;
  color: var(--text-light-color);
}

.chart-type-option span {
  font-size: 14px;
  color: var(--text-light-color);
}

.chart-type-option:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px var(--shadow-color);
}

.chart-type-option.active {
  background-color: var(--primary-color);
}

.chart-type-option.active i,
.chart-type-option.active span {
  color: #fff;
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

.country-selector {
  grid-column: 1 / -1;
}

.country-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.country-option {
  padding: 8px 15px;
  background-color: var(--bg-light-color);
  border-radius: 20px;
  font-size: 14px;
  color: var(--text-color);
  cursor: pointer;
  transition: all 0.3s;
}

.country-option:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.country-option.selected {
  background-color: var(--primary-color);
  color: #fff;
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

/* 图表区域 */
.chart-section {
  margin-bottom: 40px;
}

.chart-container {
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

/* 图表分析 */
.chart-analysis {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.chart-analysis h2 {
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

.analysis-content ul {
  margin-bottom: 15px;
  padding-left: 20px;
}

.analysis-content li {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 8px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .chart-type-selector {
    flex-wrap: wrap;
  }
  
  .chart-type-option {
    margin-bottom: 10px;
  }
  
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
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
}

@media (max-width: 576px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
  
  .chart-type-option {
    padding: 10px 15px;
  }
}
</style>