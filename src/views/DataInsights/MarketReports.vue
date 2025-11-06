<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()

// 是否正在加载
const isLoading = ref(false)

// 筛选条件
const filters = ref({
  region: '全球',
  category: '所有类别',
  year: '2025',
  quarter: '所有季度'
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

// 类别选项
const categories = ref([
  '所有类别',
  '市场概览',
  '投资分析',
  '趋势预测',
  '政策影响',
  '特别报告'
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

// 季度选项
const quarters = ref([
  '所有季度',
  'Q1',
  'Q2',
  'Q3',
  'Q4'
])

// 报告列表
const reports = ref([
  {
    id: 1,
    title: '2025年Q3全球房地产市场报告',
    region: '全球',
    category: '市场概览',
    date: '2025-10-15',
    year: '2025',
    quarter: 'Q3',
    description: '全面分析全球主要房地产市场的最新趋势、价格变动和投资机会。本报告涵盖了北美、欧洲、亚太、拉丁美洲以及中东和非洲的主要市场，提供了详细的数据分析和市场洞察。',
    image: 'https://via.placeholder.com/300x200',
    pages: 85,
    fileSize: '4.2 MB'
  },
  {
    id: 2,
    title: '美国房地产市场季度分析',
    region: '北美',
    category: '市场概览',
    date: '2025-10-10',
    year: '2025',
    quarter: 'Q3',
    description: '深入分析美国各主要城市的房地产市场表现，包括价格趋势、租金回报率和投资前景。本报告特别关注纽约、洛杉矶、迈阿密、旧金山和芝加哥等主要城市的市场动态。',
    image: 'https://via.placeholder.com/300x200',
    pages: 62,
    fileSize: '3.5 MB'
  },
  {
    id: 3,
    title: '亚太地区房地产投资指南',
    region: '亚太',
    category: '投资分析',
    date: '2025-09-28',
    year: '2025',
    quarter: 'Q3',
    description: '探索亚太地区房地产市场的投资机会，包括中国、日本、澳大利亚和新加坡等主要市场。本报告分析了各市场的投资风险和回报，并提供了详细的投资策略建议。',
    image: 'https://via.placeholder.com/300x200',
    pages: 74,
    fileSize: '3.8 MB'
  },
  {
    id: 4,
    title: '欧洲房地产市场趋势报告',
    region: '欧洲',
    category: '趋势预测',
    date: '2025-09-15',
    year: '2025',
    quarter: 'Q3',
    description: '分析欧洲主要国家和城市的房地产市场趋势，包括英国、德国、法国、西班牙和意大利。本报告重点关注后疫情时代的市场恢复情况和未来发展趋势。',
    image: 'https://via.placeholder.com/300x200',
    pages: 68,
    fileSize: '3.6 MB'
  },
  {
    id: 5,
    title: '全球房地产政策变化及影响',
    region: '全球',
    category: '政策影响',
    date: '2025-08-20',
    year: '2025',
    quarter: 'Q3',
    description: '分析全球主要国家和地区的房地产政策变化及其对市场的影响。本报告涵盖了税收政策、外资限制、住房补贴和城市规划等方面的政策变化。',
    image: 'https://via.placeholder.com/300x200',
    pages: 56,
    fileSize: '3.0 MB'
  },
  {
    id: 6,
    title: '2025年Q2全球房地产市场报告',
    region: '全球',
    category: '市场概览',
    date: '2025-07-15',
    year: '2025',
    quarter: 'Q2',
    description: '全面分析2025年第二季度全球房地产市场的表现和趋势。本报告提供了详细的数据分析和市场洞察，帮助投资者了解全球市场动态。',
    image: 'https://via.placeholder.com/300x200',
    pages: 82,
    fileSize: '4.0 MB'
  },
  {
    id: 7,
    title: '拉丁美洲新兴市场机会',
    region: '拉丁美洲',
    category: '投资分析',
    date: '2025-07-05',
    year: '2025',
    quarter: 'Q3',
    description: '探索拉丁美洲新兴房地产市场的投资机会，包括墨西哥、巴西、哥伦比亚和智利。本报告分析了这些市场的增长潜力、风险因素和投资策略。',
    image: 'https://via.placeholder.com/300x200',
    pages: 60,
    fileSize: '3.2 MB'
  },
  {
    id: 8,
    title: '中东和非洲房地产市场分析',
    region: '中东和非洲',
    category: '市场概览',
    date: '2025-06-28',
    year: '2025',
    quarter: 'Q2',
    description: '分析中东和非洲地区的房地产市场，包括阿联酋、沙特阿拉伯、埃及和南非等国家。本报告重点关注这些地区的市场发展和投资机会。',
    image: 'https://via.placeholder.com/300x200',
    pages: 58,
    fileSize: '3.1 MB'
  },
  {
    id: 9,
    title: '全球豪华房产市场特别报告',
    region: '全球',
    category: '特别报告',
    date: '2025-06-15',
    year: '2025',
    quarter: 'Q2',
    description: '深入分析全球豪华房产市场的最新趋势和发展。本报告涵盖了全球主要城市的高端住宅市场，包括价格趋势、买家特征和投资前景。',
    image: 'https://via.placeholder.com/300x200',
    pages: 50,
    fileSize: '2.8 MB'
  }
])

// 筛选后的报告
const filteredReports = computed(() => {
  return reports.value.filter(report => {
    // 按地区筛选
    if (filters.value.region !== '全球' && report.region !== filters.value.region) {
      return false
    }
    
    // 按类别筛选
    if (filters.value.category !== '所有类别' && report.category !== filters.value.category) {
      return false
    }
    
    // 按年份筛选
    if (report.year !== filters.value.year) {
      return false
    }
    
    // 按季度筛选
    if (filters.value.quarter !== '所有季度' && report.quarter !== filters.value.quarter) {
      return false
    }
    
    return true
  })
})

// 应用筛选条件
const applyFilters = () => {
  isLoading.value = true
  
  // 模拟API请求
  setTimeout(() => {
    isLoading.value = false
  }, 500)
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
  <div class="market-reports-page">
    <div class="container">
      <h1 class="page-title">{{ t('dataInsights.marketReports') }}</h1>
      
      <!-- 导航标签 -->
      <div class="insights-tabs">
        <router-link to="/data-insights" class="tab">概览</router-link>
        <router-link to="/data-insights/market-reports" class="tab active">{{ t('dataInsights.marketReports') }}</router-link>
        <router-link to="/data-insights/historical-trends" class="tab">{{ t('dataInsights.historicalTrends') }}</router-link>
        <router-link to="/data-insights/interactive-charts" class="tab">{{ t('dataInsights.interactiveCharts') }}</router-link>
        <router-link to="/data-insights/heat-maps" class="tab">{{ t('dataInsights.heatMaps') }}</router-link>
      </div>
      
      <!-- 筛选器 -->
      <div class="filters-section">
        <h2>筛选报告</h2>
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
            <label>类别</label>
            <select v-model="filters.category">
              <option v-for="category in categories" :key="category" :value="category">
                {{ category }}
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
          
          <div class="filter-group">
            <label>季度</label>
            <select v-model="filters.quarter">
              <option v-for="quarter in quarters" :key="quarter" :value="quarter">
                {{ quarter }}
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
      
      <!-- 报告列表 -->
      <div v-else class="reports-section">
        <div v-if="filteredReports.length === 0" class="no-reports">
          <p>没有找到符合条件的报告。请尝试其他筛选条件。</p>
        </div>
        
        <div v-else class="reports-list">
          <div v-for="report in filteredReports" :key="report.id" class="report-card">
            <div class="report-image">
              <img :src="report.image" :alt="report.title">
              <div class="report-badge">{{ report.region }}</div>
            </div>
            <div class="report-content">
              <div class="report-header">
                <h3>{{ report.title }}</h3>
                <div class="report-meta">
                  <span class="report-date">{{ report.date }}</span>
                  <span class="report-category">{{ report.category }}</span>
                </div>
              </div>
              <p class="report-description">{{ report.description }}</p>
              <div class="report-footer">
                <div class="report-info">
                  <span><i class="fas fa-file-alt"></i> {{ report.pages }} 页</span>
                  <span><i class="fas fa-file-download"></i> {{ report.fileSize }}</span>
                </div>
                <button @click="downloadReport(report.id)" class="download-btn">
                  <i class="fas fa-download"></i> {{ t('dataInsights.download') }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.market-reports-page {
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

/* 报告列表 */
.reports-section {
  margin-bottom: 40px;
}

.no-reports {
  text-align: center;
  padding: 50px 0;
  color: var(--text-light-color);
  font-size: 18px;
}

.reports-list {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

.report-card {
  display: flex;
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

.report-image {
  width: 300px;
  position: relative;
}

.report-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.report-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background-color: var(--primary-color);
  color: #fff;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 12px;
  font-weight: 500;
}

.report-content {
  flex: 1;
  padding: 20px;
  display: flex;
  flex-direction: column;
}

.report-header {
  margin-bottom: 15px;
}

.report-header h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.report-meta {
  display: flex;
  align-items: center;
  font-size: 14px;
  color: var(--text-light-color);
}

.report-date {
  margin-right: 15px;
}

.report-category {
  background-color: var(--bg-light-color);
  padding: 3px 8px;
  border-radius: 4px;
}

.report-description {
  flex: 1;
  font-size: 14px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 15px;
}

.report-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.report-info {
  display: flex;
  font-size: 14px;
  color: var(--text-light-color);
}

.report-info span {
  margin-right: 15px;
  display: flex;
  align-items: center;
}

.report-info i {
  margin-right: 5px;
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

/* 响应式设计 */
@media (max-width: 992px) {
  .filters-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .report-card {
    flex-direction: column;
  }
  
  .report-image {
    width: 100%;
    height: 200px;
  }
}

@media (max-width: 768px) {
  .insights-tabs {
    flex-wrap: wrap;
  }
  
  .tab {
    margin-bottom: 10px;
  }
}

@media (max-width: 576px) {
  .filters-container {
    grid-template-columns: 1fr;
  }
  
  .report-footer {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .report-info {
    margin-bottom: 10px;
  }
}
</style>