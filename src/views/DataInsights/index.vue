<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import LineChart from '../../components/charts/LineChart.vue'
import BarChart from '../../components/charts/BarChart.vue'
import MapChart from '../../components/charts/MapChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()
const router = useRouter()

// 是否正在加载
const isLoading = ref(false)

// 筛选条件
const filters = ref({
  country: '全球',
  city: '所有城市',
  timeRange: '2020-2025',
  metric: '价格指数'
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

// 时间范围选项
const timeRanges = ref([
  '2020-2025',
  '2020-2021',
  '2021-2022',
  '2022-2023',
  '2023-2024',
  '2024-2025',
  '最近12个月',
  '最近6个月',
  '最近3个月'
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

// 当前可用城市
const availableCities = computed(() => {
  return cities.value[filters.value.country] || ['所有城市']
})

// 价格趋势数据
const priceTrendData = ref({
  legend: ['价格指数 (2020=100)'],
  xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
  series: [
    {
      name: '价格指数 (2020=100)',
      type: 'line',
      data: [100, 108, 118, 122, 127, 132]
    }
  ]
})

// 租金回报率数据
const rentalYieldData = ref({
  legend: ['租金回报率 (%)'],
  xAxis: ['美国', '英国', '中国', '日本', '澳大利亚', '加拿大', '德国', '法国'],
  series: [
    {
      name: '租金回报率 (%)',
      type: 'bar',
      data: [4.2, 3.8, 2.5, 3.5, 3.9, 4.0, 3.7, 3.2]
    }
  ]
})

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
    { name: 'Italy', value: 55 }
  ]
})

// 最新报告
const latestReports = ref([
  {
    id: 1,
    title: '2025年Q3全球房地产市场报告',
    date: '2025-10-15',
    description: '全面分析全球主要房地产市场的最新趋势、价格变动和投资机会。',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 2,
    title: '美国房地产市场季度分析',
    date: '2025-10-10',
    description: '深入分析美国各主要城市的房地产市场表现，包括价格趋势、租金回报率和投资前景。',
    image: 'https://via.placeholder.com/300x200'
  },
  {
    id: 3,
    title: '亚太地区房地产投资指南',
    date: '2025-09-28',
    description: '探索亚太地区房地产市场的投资机会，包括中国、日本、澳大利亚和新加坡等主要市场。',
    image: 'https://via.placeholder.com/300x200'
  }
])

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
  
  // 更新价格趋势数据
  if (filters.value.metric === '价格指数') {
    priceTrendData.value = {
      legend: [`${filters.value.country} - ${filters.value.metric}`],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: `${filters.value.country} - ${filters.value.metric}`,
          type: 'line',
          data: generateRandomData(100, 5, 10, 6)
        }
      ]
    }
  } else if (filters.value.metric === '租金回报率') {
    priceTrendData.value = {
      legend: [`${filters.value.country} - ${filters.value.metric}`],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: `${filters.value.country} - ${filters.value.metric}`,
          type: 'line',
          data: generateRandomData(4, 0.1, 0.5, 6, true)
        }
      ]
    }
  } else {
    priceTrendData.value = {
      legend: [`${filters.value.country} - ${filters.value.metric}`],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: `${filters.value.country} - ${filters.value.metric}`,
          type: 'line',
          data: generateRandomData(50, 5, 15, 6)
        }
      ]
    }
  }
}

// 生成随机数据
const generateRandomData = (start, minChange, maxChange, count, isDecimal = false) => {
  const result = [start]
  let current = start
  
  for (let i = 1; i < count; i++) {
    const change = minChange + Math.random() * (maxChange - minChange)
    const direction = Math.random() > 0.3 ? 1 : -1 // 70%概率上升，30%概率下降
    current += change * direction
    
    // 确保值不会变成负数
    if (current < 0) current = minChange
    
    result.push(isDecimal ? parseFloat(current.toFixed(1)) : Math.round(current))
  }
  
  return result
}

// 导出图表为图片
const exportChart = (chartType) => {
  // 这里应该实现导出图表的逻辑
  alert(`导出${chartType}图表`)
}

// 下载报告
const downloadReport = (reportId) => {
  // 这里应该实现下载报告的逻辑
  alert(`下载报告ID: ${reportId}`)
}

// 组件挂载时初始化
onMounted(() => {
  // 可以在这里加载初始数据
})
</script>

<template>
  <div class="data-insights-page">
    <div class="container">
      <h1 class="page-title">{{ t('dataInsights.title') }}</h1>
      
      <!-- 导航标签 -->
      <div class="insights-tabs">
        <router-link to="/data-insights" class="tab active">概览</router-link>
        <router-link to="/data-insights/market-reports" class="tab">{{ t('dataInsights.marketReports') }}</router-link>
        <router-link to="/data-insights/historical-trends" class="tab">{{ t('dataInsights.historicalTrends') }}</router-link>
        <router-link to="/data-insights/interactive-charts" class="tab">{{ t('dataInsights.interactiveCharts') }}</router-link>
        <router-link to="/data-insights/heat-maps" class="tab">{{ t('dataInsights.heatMaps') }}</router-link>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters-section">
        <h2>数据筛选</h2>
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
            <label>{{ t('dataInsights.filters.timeRange') }}</label>
            <select v-model="filters.timeRange">
              <option v-for="range in timeRanges" :key="range" :value="range">
                {{ range }}
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
          
          <button @click="applyFilters" class="apply-btn">应用筛选</button>
        </div>
      </div>
      
      <!-- 加载中 -->
      <div v-if="isLoading" class="loading-container">
        <LoadingSpinner size="large" />
      </div>
      
      <!-- 图表区域 -->
      <div v-else class="charts-section">
        <!-- 价格趋势图表 -->
        <div class="chart-container">
          <div class="chart-header">
            <h2>{{ filters.country }} - {{ filters.metric }} 趋势 ({{ filters.timeRange }})</h2>
            <div class="chart-actions">
              <button @click="exportChart('趋势')" class="action-btn">
                <i class="fas fa-download"></i> {{ t('dataInsights.export') }}
              </button>
            </div>
          </div>
          <LineChart :chartData="priceTrendData" height="350px" />
        </div>
        
        <!-- 租金回报率图表 -->
        <div class="chart-container">
          <div class="chart-header">
            <h2>全球主要国家租金回报率对比</h2>
            <div class="chart-actions">
              <button @click="exportChart('回报率')" class="action-btn">
                <i class="fas fa-download"></i> {{ t('dataInsights.export') }}
              </button>
            </div>
          </div>
          <BarChart :chartData="rentalYieldData" height="350px" />
        </div>
        
        <!-- 世界地图 -->
        <div class="chart-container">
          <div class="chart-header">
            <h2>全球房产价格指数热力图</h2>
            <div class="chart-actions">
              <button @click="exportChart('热力图')" class="action-btn">
                <i class="fas fa-download"></i> {{ t('dataInsights.export') }}
              </button>
            </div>
          </div>
          <MapChart :chartData="worldMapData" height="400px" />
        </div>
      </div>
      
      <!-- 最新报告 -->
      <div class="reports-section">
        <h2>最新市场报告</h2>
        <div class="reports-grid">
          <div v-for="report in latestReports" :key="report.id" class="report-card">
            <div class="report-image">
              <img :src="report.image" :alt="report.title">
            </div>
            <div class="report-content">
              <h3>{{ report.title }}</h3>
              <p class="report-date">{{ report.date }}</p>
              <p class="report-description">{{ report.description }}</p>
              <button @click="downloadReport(report.id)" class="download-btn">
                <i class="fas fa-file-pdf"></i> {{ t('dataInsights.download') }}
              </button>
            </div>
          </div>
        </div>
        
        <div class="view-all-button">
          <router-link to="/data-insights/market-reports" class="btn">查看所有报告</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.data-insights-page {
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
  grid-template-columns: repeat(5, 1fr);
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

/* 图表区域 */
.charts-section {
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
}

.action-btn:hover {
  background-color: var(--primary-color);
  color: #fff;
  border-color: var(--primary-color);
}

/* 报告区域 */
.reports-section {
  margin-bottom: 40px;
}

.reports-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
}

.reports-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.report-card {
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
  transition: transform 0.3s, box-shadow 0.3s;
}

.report-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px var(--shadow-color);
}

.report-image img {
  width: 100%;
  height: 180px;
  object-fit: cover;
}

.report-content {
  padding: 20px;
}

.report-content h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.report-date {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 10px;
}

.report-description {
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 15px;
  line-height: 1.5;
}

.download-btn {
  display: inline-flex;
  align-items: center;
  padding: 8px 15px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.download-btn i {
  margin-right: 5px;
}

.download-btn:hover {
  background-color: var(--primary-hover-color);
}

.view-all-button {
  text-align: center;
}

.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border-radius: 4px;
  font-weight: 500;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: var(--primary-hover-color);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .reports-grid {
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
  
  .reports-grid {
    grid-template-columns: 1fr;
  }
}
</style>