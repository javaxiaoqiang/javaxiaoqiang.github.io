<script setup>
import { ref, onMounted, computed, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAIStore } from '../../stores/ai'
import { useUserStore } from '../../stores/user'
import { useMarketStore } from '../../stores/market'
import LineChart from '../../components/charts/LineChart.vue'
import BarChart from '../../components/charts/BarChart.vue'
import MapChart from '../../components/charts/MapChart.vue'
import LoadingSpinner from '../../components/common/LoadingSpinner.vue'

const { t } = useI18n()
const route = useRoute()
const aiStore = useAIStore()
const userStore = useUserStore()
const marketStore = useMarketStore()

// 用户输入的问题
const question = ref('')
// 是否正在加载
const isLoading = ref(false)
// 当前回答
const currentAnswer = ref(null)
// 图表数据
const chartData = ref(null)
// 图表类型
const chartType = ref('line')
// 文件上传相关
const fileList = ref([])
// 当前选中的工具
const activeToolIndex = ref(0)
// 是否显示工具详情
const showToolDetail = ref(false)
// 瀑布流数据
const marketReports = ref([])
const marketNews = ref([])

// 计算属性：是否已登录
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 房地产工具列表
const propertyTools = ref([
  { 
    id: 1, 
    name: '市场分析', 
    icon: 'chart-line',
    description: '分析特定地区的房地产市场趋势、价格变动和投资机会'
  },
  { 
    id: 2, 
    name: '投资计算器', 
    icon: 'calculator',
    description: '计算房产投资回报率、租金收益和贷款成本'
  },
  { 
    id: 3, 
    name: '文档解析', 
    icon: 'file-alt',
    description: '上传并分析房产合同、政策文件等文档，提取关键信息'
  },
  { 
    id: 4, 
    name: '房价热力图', 
    icon: 'fire',
    description: '查看全球房地产热点区域，了解价格和需求分布'
  },
  { 
    id: 5, 
    name: '政策解读', 
    icon: 'landmark',
    description: '解析各国房地产政策法规，评估政策影响'
  },
  { 
    id: 6, 
    name: '市场预测', 
    icon: 'fa-regular fa-compass',
    description: '基于AI模型预测未来房价走势和市场变化'
  }
])

// 在 script setup 部分添加
const mapChartData = ref({
  min: 0,
  max: 100,
  visualMapText: ['高', '低'],
  seriesName: '房价指数',
  data: [
    { name: 'China', value: 85 },
    { name: 'United States', value: 92 },
    { name: 'Japan', value: 78 },
    { name: 'Germany', value: 80 },
    { name: 'United Kingdom', value: 75 }
  ]
})

// 从URL获取问题并加载模拟数据
onMounted(() => {
  if (route.query.q) {
    question.value = route.query.q
    askQuestion()
  }
  
  // 加载模拟的市场报告和新闻数据
  loadMockData()
})

// 提问
const askQuestion = async () => {
  if (!question.value.trim()) return
  
  isLoading.value = true
  
  try {
    // 模拟API请求
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 模拟回答数据
    currentAnswer.value = {
      question: question.value,
      answer: generateMockAnswer(question.value),
      timestamp: new Date().toISOString(),
      sources: ['Global Property Index 2025', 'Miami Real Estate Report Q3 2025']
    }
    
    // 模拟图表数据
    chartData.value = generateMockChartData(question.value)
    
    // 如果用户已登录，添加到历史记录
    if (isLoggedIn.value) {
      userStore.addHistoryQuestion({
        id: Date.now(),
        question: question.value,
        answer: currentAnswer.value.answer,
        timestamp: currentAnswer.value.timestamp
      })
    }
    
    // 清空输入框
    question.value = ''
  } catch (error) {
    console.error('提问出错:', error)
  } finally {
    isLoading.value = false
  }
}

// 保存问题
const saveQuestion = () => {
  if (!currentAnswer.value) return
  
  userStore.saveQuestion({
    id: Date.now(),
    question: currentAnswer.value.question,
    answer: currentAnswer.value.answer,
    timestamp: currentAnswer.value.timestamp
  })
}

// 使用建议问题
const useSuggestedQuestion = (q) => {
  question.value = q
  askQuestion()
}

// 选择工具
const selectTool = (index) => {
  activeToolIndex.value = index
  showToolDetail.value = true
}

// 关闭工具详情
const closeToolDetail = () => {
  showToolDetail.value = false
}

// 处理文件上传
const handleFileUpload = (event) => {
  const files = event.target.files
  if (files.length) {
    for (let i = 0; i < files.length; i++) {
      fileList.value.push({
        id: Date.now() + i,
        name: files[i].name,
        size: (files[i].size / 1024).toFixed(2) + ' KB',
        status: '已上传'
      })
    }
  }
}

// 删除上传的文件
const removeFile = (fileId) => {
  fileList.value = fileList.value.filter(file => file.id !== fileId)
}

// 加载模拟数据
const loadMockData = () => {
  // 模拟市场报告数据
  marketReports.value = [
    {
      id: 1,
      title: '2025年Q3全球房地产市场季度报告',
      description: '本报告分析了全球主要城市的房地产市场表现，重点关注价格趋势、交易量和投资机会。',
      image: 'https://picsum.photos/id/1015/600/400',
      date: '2025-10-15',
      category: '市场报告',
      height: 320
    },
    {
      id: 2,
      title: '迈阿密房地产市场深度分析',
      description: '迈阿密房地产市场持续升温，本报告深入分析了驱动因素和未来预测。',
      image: 'https://picsum.photos/id/1016/600/400',
      date: '2025-10-10',
      category: '区域分析',
      height: 280
    },
    {
      id: 3,
      title: '亚洲房地产投资机会白皮书',
      description: '探索亚洲新兴市场的房地产投资机会，包括风险评估和回报预测。',
      image: 'https://picsum.photos/id/1018/600/400',
      date: '2025-09-28',
      category: '投资指南',
      height: 350
    },
    {
      id: 4,
      title: '欧洲租赁市场年度报告',
      description: '分析欧洲主要城市的租赁市场趋势、租金水平和投资回报率。',
      image: 'https://picsum.photos/id/1019/600/400',
      date: '2025-09-15',
      category: '租赁市场',
      height: 300
    }
  ]
  
  // 模拟市场新闻数据
  marketNews.value = [
    {
      id: 1,
      title: '伦敦推出新房产税政策，外国买家将面临额外3%税率',
      summary: '伦敦市政府宣布新的房产税政策，旨在冷却过热的房地产市场并增加本地买家的机会。',
      image: 'https://picsum.photos/id/1031/600/400',
      date: '2025-11-01',
      source: '全球房产时报',
      height: 260
    },
    {
      id: 2,
      title: '东京奥运会后房地产市场持续升温，投资者关注郊区机会',
      summary: '东京奥运会结束后，房地产市场并未降温，投资者开始将目光转向更具性价比的郊区。',
      image: 'https://picsum.photos/id/1032/600/400',
      date: '2025-10-25',
      source: '亚洲房产周刊',
      height: 290
    },
    {
      id: 3,
      title: '迪拜推出全球首个区块链房产交易平台，交易时间缩短80%',
      summary: '迪拜土地局推出基于区块链技术的房产交易平台，大幅提高交易效率并降低成本。',
      image: 'https://picsum.photos/id/1033/600/400',
      date: '2025-10-18',
      source: '中东商业日报',
      height: 310
    },
    {
      id: 4,
      title: '纽约曼哈顿公寓价格创历史新高，均价突破300万美元',
      summary: '最新数据显示，曼哈顿公寓均价首次突破300万美元大关，高端市场需求强劲。',
      image: 'https://picsum.photos/id/1035/600/400',
      date: '2025-10-12',
      source: '美国房地产观察',
      height: 270
    },
    {
      id: 5,
      title: '巴黎房价在2028年奥运会前景预期下上涨15%',
      summary: '受即将举办的2028年奥运会影响，巴黎房地产市场表现强劲，尤其是奥运场馆周边区域。',
      image: 'https://picsum.photos/id/1036/600/400',
      date: '2025-10-05',
      source: '欧洲房产论坛',
      height: 280
    }
  ]
}

// 模拟生成回答
const generateMockAnswer = (q) => {
  if (q.toLowerCase().includes('miami') && q.toLowerCase().includes('price')) {
    return '2025年Q3迈阿密三居室的平均每平方英尺价格为$580。这比去年同期上涨了8.5%，高于佛罗里达州的平均涨幅（6.2%）。迈阿密市中心区域价格更高，达到每平方英尺$720，而郊区平均为$450。预计到2026年，价格将继续上涨约5-7%。'
  } else if (q.toLowerCase().includes('rental') || q.toLowerCase().includes('yield')) {
    return '纽约的平均租金回报率为3.8%，而东京为4.2%。东京的租金回报率在过去5年保持相对稳定，而纽约则有所下降（从2020年的4.5%）。东京的租金市场受到更严格的租赁法规保护，波动性较小，而纽约的租金则受到更多市场因素影响。'
  } else if (q.toLowerCase().includes('trend') || q.toLowerCase().includes('5 year')) {
    return '过去5年（2020-2025）迈阿密房地产价格呈现强劲上涨趋势，累计涨幅达到32%。2020年疫情初期短暂下跌后，从2021年开始加速上涨，特别是高端住宅和水景房产。2023年出现短暂调整，但2024-2025年又恢复增长。远程工作趋势和税收优惠政策是推动这一增长的主要因素。'
  } else if (q.toLowerCase().includes('europe') || q.toLowerCase().includes('highest')) {
    return '欧洲租金回报率最高的城市是：1. 布达佩斯（匈牙利）：6.8%，2. 华沙（波兰）：6.2%，3. 布拉格（捷克）：5.7%，4. 里斯本（葡萄牙）：5.5%，5. 柏林（德国）：4.9%。东欧城市普遍提供更高的租金回报率，但也伴随着较高的市场波动性和政策风险。'
  } else if (q.toLowerCase().includes('forecast') || q.toLowerCase().includes('2026')) {
    return '2026年柏林房价预测显示将上涨4.3-5.8%。这一增长率低于2021-2023年的高峰期，但仍高于德国平均水平。柏林市中心和热门区域如Mitte和Prenzlauer Berg预计涨幅更高（6-7%），而外围区域如Spandau预计涨幅较低（3-4%）。影响因素包括持续的住房短缺、低利率环境和国际投资者兴趣。'
  } else {
    return '根据全球房产数据分析，您询问的问题涉及到的市场目前呈现稳定增长态势。具体数据显示，主要城市的房产价格在过去12个月平均上涨了5.2%，租金回报率保持在4.1%左右。投资者应关注城市发展规划、基础设施投资和人口流动趋势，这些因素将显著影响未来2-3年的市场表现。'
  }
}

// 模拟生成图表数据
const generateMockChartData = (q) => {
  if (q.toLowerCase().includes('miami') && q.toLowerCase().includes('price')) {
    chartType.value = 'line'
    return {
      legend: ['平均价格 ($/sqft)'],
      xAxis: ['2024 Q1', '2024 Q2', '2024 Q3', '2024 Q4', '2025 Q1', '2025 Q2', '2025 Q3'],
      series: [
        {
          name: '平均价格 ($/sqft)',
          type: 'line',
          data: [510, 525, 540, 550, 560, 570, 580]
        }
      ]
    }
  } else if (q.toLowerCase().includes('rental') || q.toLowerCase().includes('yield')) {
    chartType.value = 'bar'
    return {
      legend: ['纽约', '东京'],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: '纽约',
          type: 'bar',
          data: [4.5, 4.3, 4.1, 4.0, 3.9, 3.8]
        },
        {
          name: '东京',
          type: 'bar',
          data: [4.3, 4.3, 4.2, 4.2, 4.1, 4.2]
        }
      ]
    }
  } else if (q.toLowerCase().includes('trend') || q.toLowerCase().includes('5 year')) {
    chartType.value = 'line'
    return {
      legend: ['价格指数 (2020=100)'],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: '价格指数 (2020=100)',
          type: 'line',
          data: [100, 108, 118, 122, 127, 132]
        }
      ]
    }
  } else if (q.toLowerCase().includes('europe') || q.toLowerCase().includes('highest')) {
    chartType.value = 'bar'
    return {
      legend: ['租金回报率 (%)'],
      xAxis: ['布达佩斯', '华沙', '布拉格', '里斯本', '柏林'],
      series: [
        {
          name: '租金回报率 (%)',
          type: 'bar',
          data: [6.8, 6.2, 5.7, 5.5, 4.9]
        }
      ]
    }
  } else if (q.toLowerCase().includes('forecast') || q.toLowerCase().includes('2026')) {
    chartType.value = 'line'
    return {
      legend: ['预测价格指数 (2025=100)'],
      xAxis: ['2025 Q1', '2025 Q2', '2025 Q3', '2025 Q4', '2026 Q1', '2026 Q2', '2026 Q3', '2026 Q4'],
      series: [
        {
          name: '预测价格指数 (2025=100)',
          type: 'line',
          data: [97, 99, 100, 101, 103, 104, 105, 106]
        }
      ]
    }
  } else {
    chartType.value = 'line'
    return {
      legend: ['全球房产价格指数'],
      xAxis: ['2020', '2021', '2022', '2023', '2024', '2025'],
      series: [
        {
          name: '全球房产价格指数',
          type: 'line',
          data: [100, 104, 110, 115, 120, 126]
        }
      ]
    }
  }
}
</script>

<template>
  <div class="ask-ai-page">
    <div class="container">
      <!-- <h1 class="page-title">{{ t('askAI.title') }}</h1> -->
      <h1></h1>
      <div class="ask-ai-container">
        <!-- 英雄区域 -->
        <section class="ai-hero-section">
          <div class="hero-content">
            <h2>AI驱动的房地产数据分析</h2>
            <!-- <p>利用人工智能和大数据技术，获取精准的房地产市场洞察和投资建议</p> -->
          </div>
        </section>
        
        <!-- 问题输入区域 -->
        <div class="question-input-area">
          <div class="question-input-box">
            <input 
              type="text" 
              v-model="question" 
              placeholder="输入您的房地产问题，获取AI分析结果..."
              @keyup.enter="askQuestion"
            >
            <button @click="askQuestion" :disabled="isLoading">
              <i class="fas fa-paper-plane"></i>
            </button>
          </div>
          
          <!-- 房地产工具栏 -->
          <div class="property-tools">
            <div 
              v-for="(tool, index) in propertyTools" 
              :key="tool.id"
              class="tool-item"
              :class="{ 'active': activeToolIndex === index }"
              @click="selectTool(index)"
            >
              <div class="tool-icon">
                <i :class="'fas fa-' + tool.icon"></i>
              </div>
              <div class="tool-name">{{ tool.name }}</div>
            </div>
          </div>
          
          <!-- 工具详情 -->
          <div v-if="showToolDetail" class="tool-detail-container">
            <div class="tool-detail-header">
              <h3>{{ propertyTools[activeToolIndex].name }}</h3>
              <button class="close-btn" @click="closeToolDetail">
                <i class="fas fa-times"></i>
              </button>
            </div>
            <div class="tool-detail-content">
              <p>{{ propertyTools[activeToolIndex].description }}</p>
              
              <!-- 文件上传区域 (针对文档解析工具) -->
              <div v-if="propertyTools[activeToolIndex].id === 3" class="file-upload-area">
                <div class="upload-box">
                  <input 
                    type="file" 
                    id="file-upload" 
                    multiple 
                    @change="handleFileUpload"
                    class="file-input"
                  >
                  <label for="file-upload" class="upload-label">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <span>点击上传文件或拖拽文件到此处</span>
                    <small>支持PDF、Word、Excel等格式，最大20MB</small>
                  </label>
                </div>
                
                <!-- 已上传文件列表 -->
                <div v-if="fileList.length > 0" class="uploaded-files">
                  <h4>已上传文件</h4>
                  <div class="file-list">
                    <div v-for="file in fileList" :key="file.id" class="file-item">
                      <div class="file-info">
                        <i class="fas fa-file-alt"></i>
                        <span class="file-name">{{ file.name }}</span>
                        <span class="file-size">{{ file.size }}</span>
                      </div>
                      <button class="remove-file" @click="removeFile(file.id)">
                        <i class="fas fa-trash-alt"></i>
                      </button>
                    </div>
                  </div>
                  <button class="analyze-btn">
                    <i class="fas fa-search"></i> 开始分析文件
                  </button>
                </div>
              </div>
              
              <!-- 投资计算器工具 -->
              <div v-else-if="propertyTools[activeToolIndex].id === 2" class="calculator-tool">
                <div class="calculator-form">
                  <div class="form-group">
                    <label>房产价格 (USD)</label>
                    <input type="number" placeholder="例如: 500000" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>首付比例 (%)</label>
                    <input type="number" placeholder="例如: 20" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>贷款利率 (%)</label>
                    <input type="number" placeholder="例如: 4.5" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>贷款期限 (年)</label>
                    <input type="number" placeholder="例如: 30" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>月租金收入 (USD)</label>
                    <input type="number" placeholder="例如: 2500" class="form-input">
                  </div>
                  <div class="form-group">
                    <label>年度房产增值率 (%)</label>
                    <input type="number" placeholder="例如: 3" class="form-input">
                  </div>
                  <button class="calculate-btn">计算投资回报</button>
                </div>
              </div>
              
              <!-- 热力图分析工具 -->
              <div v-else-if="propertyTools[activeToolIndex].id === 4" class="heatmap-tool">
                <div class="map-container">
                  <MapChart :chartData="mapChartData" height="350px" />
                </div>
                <div class="map-filters">
                  <div class="filter-group">
                    <label>数据类型</label>
                    <select class="filter-select">
                      <option>房价中位数</option>
                      <option>租金回报率</option>
                      <option>价格增长率</option>
                      <option>交易量</option>
                    </select>
                  </div>
                  <div class="filter-group">
                    <label>地区范围</label>
                    <select class="filter-select">
                      <option>全球</option>
                      <option>北美</option>
                      <option>欧洲</option>
                      <option>亚太</option>
                      <option>拉丁美洲</option>
                    </select>
                  </div>
                  <div class="filter-group">
                    <label>时间段</label>
                    <select class="filter-select">
                      <option>2025 Q3</option>
                      <option>2025 Q2</option>
                      <option>2025 Q1</option>
                      <option>2024 Q4</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <!-- 其他工具的占位内容 -->
              <div v-else class="tool-placeholder">
                <div class="placeholder-icon">
                  <i :class="'fas fa-' + propertyTools[activeToolIndex].icon"></i>
                </div>
                <p>{{ propertyTools[activeToolIndex].name }}工具正在加载中，敬请期待...</p>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 加载中 -->
        <div v-if="isLoading" class="loading-container">
          <LoadingSpinner size="large" />
          <p>正在思考中...</p>
        </div>
        
        <!-- 回答区域 -->
        <div v-else-if="currentAnswer" class="answer-container">
          <div class="answer-header">
            <h2>{{ currentAnswer.question }}</h2>
            <div class="answer-actions">
              <button v-if="isLoggedIn" @click="saveQuestion" class="action-btn">
                <i class="fas fa-bookmark"></i> 收藏
              </button>
              <button class="action-btn">
                <i class="fas fa-share-alt"></i> 分享
              </button>
              <button class="action-btn">
                <i class="fas fa-download"></i> 导出
              </button>
            </div>
          </div>
          
          <div class="answer-content">
            <p>{{ currentAnswer.answer }}</p>
          </div>
          
          <!-- 图表区域 -->
          <div v-if="chartData" class="chart-container">
            <h3>相关数据分析</h3>
            <LineChart v-if="chartType === 'line'" :chartData="chartData" height="350px" />
            <BarChart v-else-if="chartType === 'bar'" :chartData="chartData" height="350px" />
            
            <div class="chart-actions">
              <button class="btn btn-outline">
                <i class="fas fa-download"></i> 导出数据
              </button>
              <router-link to="/data-insights/historical-trends" class="btn">
                查看完整趋势
              </router-link>
            </div>
          </div>
          
          <div class="answer-footer">
            <div class="sources">
              <h4>数据来源:</h4>
              <ul>
                <li v-for="(source, index) in currentAnswer.sources" :key="index">
                  {{ source }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <!-- 初始状态：推荐问题 -->
        <div v-else class="suggested-questions-container">
          <h2>热门问题推荐</h2>
          <div class="suggested-questions-list">
            <div 
              v-for="(q, index) in aiStore.suggestedQuestions" 
              :key="index" 
              class="suggested-question-item"
              @click="useSuggestedQuestion(q)"
            >
              <div class="question-icon">
                <i class="fas fa-question-circle"></i>
              </div>
              <div class="question-text">{{ q }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 瀑布流布局：市场报告和行业新闻 -->
      <div class="market-content-container">
        <h2 class="section-title">市场报告与行业动态</h2>
        
        <div class="content-filter">
          <button class="filter-btn active">全部</button>
          <button class="filter-btn">市场报告</button>
          <button class="filter-btn">行业新闻</button>
          <button class="filter-btn">投资指南</button>
          <button class="filter-btn">政策解读</button>
        </div>
        
        <div class="waterfall-container">
          <!-- 市场报告卡片 -->
          <div 
            v-for="report in marketReports" 
            :key="'report-' + report.id" 
            class="waterfall-item report-card"
            :style="{ height: report.height + 'px' }"
          >
            <div class="card-image">
              <img :src="report.image" :alt="report.title">
              <div class="card-tag">{{ report.category }}</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ report.title }}</h3>
              <p class="card-description">{{ report.description }}</p>
              <div class="card-footer">
                <span class="card-date">{{ report.date }}</span>
                <button class="card-action">查看详情</button>
              </div>
            </div>
          </div>
          
          <!-- 行业新闻卡片 -->
          <div 
            v-for="news in marketNews" 
            :key="'news-' + news.id" 
            class="waterfall-item news-card"
            :style="{ height: news.height + 'px' }"
          >
            <div class="card-image">
              <img :src="news.image" :alt="news.title">
              <div class="card-tag news-tag">行业新闻</div>
            </div>
            <div class="card-content">
              <h3 class="card-title">{{ news.title }}</h3>
              <p class="card-description">{{ news.summary }}</p>
              <div class="card-footer">
                <span class="card-source">{{ news.source }}</span>
                <span class="card-date">{{ news.date }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="load-more">
          <button class="load-more-btn">
            <i class="fas fa-sync-alt"></i> 加载更多
          </button>
        </div>
      </div>
      
      <!-- 历史问题区域 -->
      <div v-if="isLoggedIn && userStore.historyQuestions.length > 0" class="history-questions-container">
        <h2>历史问题</h2>
        <div class="history-questions-list">
          <div 
            v-for="item in userStore.historyQuestions" 
            :key="item.id" 
            class="history-question-item"
            @click="useSuggestedQuestion(item.question)"
          >
            <div class="history-question-text">{{ item.question }}</div>
            <div class="history-question-time">
              {{ new Date(item.timestamp).toLocaleString() }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.ask-ai-page {
  padding-top: 70px;
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
  margin-bottom: 40px;
  color: #333;
}

.ask-ai-container {
  max-width: 800px;
  margin: 0 auto 60px;
}

/* 英雄区域样式 */
.ai-hero-section {
  /* background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%); */
  color: #363434;
  padding: 50px 30px;
  border-radius: 12px;
  margin-bottom: 30px;
  text-align: center;
}

.hero-content h2 {
  font-size: 32px;
  margin-bottom: 15px;
}

.hero-content p {
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
}

/* 问题输入区域 */
.question-input-area {
  margin-bottom: 40px;
}

.question-input-box {
  display: flex;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
}

.question-input-box input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  font-size: 16px;
  background-color: #fff;
  color: #333;
}

.question-input-box input:focus {
  outline: none;
}

.question-input-box button {
  padding: 0 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.question-input-box button:hover {
  background-color: #40a9ff;
}

.question-input-box button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 房地产工具栏 */
.property-tools {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
}

.tool-item {
  flex: 1;
  min-width: 100px;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 10px;
  text-align: center;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.3s;
}

.tool-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.tool-item.active {
  background-color: #e6f7ff;
  border: 1px solid #1890ff;
}

.tool-icon {
  font-size: 24px;
  color: #1890ff;
  margin-bottom: 10px;
}

.tool-name {
  font-size: 14px;
  color: #333;
}

/* 工具详情 */
.tool-detail-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.tool-detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #eee;
}

.tool-detail-header h3 {
  font-size: 20px;
  color: #333;
  margin: 0;
}

.close-btn {
  background: none;
  border: none;
  color: #999;
  font-size: 18px;
  cursor: pointer;
  transition: color 0.3s;
}

.close-btn:hover {
  color: #333;
}

.tool-detail-content p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* 文件上传区域 */
.file-upload-area {
  margin-top: 20px;
}

.upload-box {
  border: 2px dashed #ddd;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.upload-box:hover {
  border-color: #1890ff;
}

.file-input {
  display: none;
}

.upload-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
}

.upload-label i {
  font-size: 40px;
  color: #1890ff;
  margin-bottom: 15px;
}

.upload-label span {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.upload-label small {
  font-size: 12px;
  color: #999;
}

.uploaded-files {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.uploaded-files h4 {
  font-size: 16px;
  margin-bottom: 15px;
  color: #333;
}

.file-list {
  margin-bottom: 20px;
}

.file-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #fff;
  border-radius: 4px;
  padding: 10px 15px;
  margin-bottom: 10px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
}

.file-info {
  display: flex;
  align-items: center;
}

.file-info i {
  color: #1890ff;
  margin-right: 10px;
}

.file-name {
  font-size: 14px;
  color: #333;
  margin-right: 10px;
}

.file-size {
  font-size: 12px;
  color: #999;
}

.remove-file {
  background: none;
  border: none;
  color: #ff4d4f;
  cursor: pointer;
  transition: color 0.3s;
}

.remove-file:hover {
  color: #ff7875;
}

.analyze-btn {
  width: 100%;
  padding: 12px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.analyze-btn:hover {
  background-color: #40a9ff;
}

/* 投资计算器工具 */
.calculator-tool {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.calculator-form {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.calculate-btn {
  grid-column: span 2;
  padding: 12px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.calculate-btn:hover {
  background-color: #40a9ff;
}

/* 热力图工具 */
.heatmap-tool {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
}

.map-container {
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
}

.map-filters {
  display: flex;
  justify-content: space-between;
  gap: 15px;
}

.filter-group {
  flex: 1;
}

.filter-group label {
  display: block;
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
}

.filter-select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

/* 工具占位内容 */
.tool-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
}

.placeholder-icon {
  font-size: 60px;
  color: #1890ff;
  margin-bottom: 20px;
}

.tool-placeholder p {
  font-size: 16px;
  color: #666;
}

/* 加载中 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 50px 0;
}

.loading-container p {
  margin-top: 20px;
  color: #666;
  font-size: 18px;
}

/* 回答区域 */
.answer-container {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 40px;
}

.answer-header {
  padding: 20px;
  background-color: #f9f9f9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
}

.answer-header h2 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
}

.answer-actions {
  display: flex;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  padding: 5px 10px;
  margin-left: 10px;
  cursor: pointer;
  transition: color 0.3s;
}

.action-btn:hover {
  color: #1890ff;
}

.answer-content {
  padding: 20px;
  line-height: 1.6;
  color: #333;
}

.chart-container {
  padding: 20px;
  border-top: 1px solid #eee;
}

.chart-container h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #333;
}

.chart-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.chart-actions button,
.chart-actions a {
  margin-left: 10px;
  padding: 8px 16px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn {
  display: inline-block;
  background-color: #1890ff;
  color: #fff;
  text-decoration: none;
}

.btn:hover {
  background-color: #40a9ff;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid #1890ff;
  color: #1890ff;
}

.btn-outline:hover {
  background-color: #e6f7ff;
}

.answer-footer {
  padding: 20px;
  border-top: 1px solid #eee;
  background-color: #f9f9f9;
}

.sources h4 {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 10px;
  color: #333;
}

.sources ul {
  list-style: none;
  padding: 0;
}

.sources li {
  font-size: 14px;
  color: #666;
  margin-bottom: 5px;
}

/* 推荐问题 */
.suggested-questions-container {
  margin-bottom: 40px;
}

.suggested-questions-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.suggested-questions-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
}

.suggested-question-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.suggested-question-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.question-icon {
  margin-right: 15px;
  color: #1890ff;
  font-size: 24px;
}

.question-text {
  font-size: 16px;
  color: #333;
}

/* 瀑布流布局：市场报告和行业新闻 */
.market-content-container {
  margin-bottom: 60px;
}

.section-title {
  text-align: center;
  font-size: 32px;
  margin-bottom: 30px;
  color: #333;
}

.content-filter {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.filter-btn {
  background: none;
  border: none;
  padding: 8px 16px;
  margin: 0 5px 10px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
  border-radius: 20px;
}

.filter-btn:hover {
  color: #1890ff;
}

.filter-btn.active {
  background-color: #1890ff;
  color: #fff;
}

.waterfall-container {
  column-count: 3;
  column-gap: 20px;
  margin-bottom: 30px;
}

.waterfall-item {
  break-inside: avoid;
  margin-bottom: 20px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.waterfall-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.waterfall-item:hover .card-image img {
  transform: scale(1.05);
}

.card-tag {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  background-color: #1890ff;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
}

.news-tag {
  background-color: #ff6b00;
}

.card-content {
  padding: 20px;
  background-color: #fff;
}

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.card-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 12px;
  color: #999;
}

.card-date, .card-source {
  color: #999;
}

.card-action {
  background: none;
  border: none;
  color: #1890ff;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 14px;
}

.card-action:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.load-more {
  text-align: center;
  margin-top: 20px;
}

.load-more-btn {
  padding: 12px 30px;
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.load-more-btn:hover {
  background-color: #1890ff;
  color: #fff;
}

/* 历史问题 */
.history-questions-container {
  max-width: 800px;
  margin: 0 auto 60px;
}

.history-questions-container h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
  text-align: center;
}

.history-questions-list {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 15px;
}

.history-question-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.history-question-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.history-question-text {
  font-size: 16px;
  color: #333;
  margin-bottom: 10px;
}

.history-question-time {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .waterfall-container {
    column-count: 2;
  }
  
  .suggested-questions-list {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .answer-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .answer-actions {
    margin-top: 10px;
  }
  
  .chart-actions {
    flex-direction: column;
  }
  
  .chart-actions button,
  .chart-actions a {
    margin: 5px 0;
    width: 100%;
    text-align: center;
  }
  
  .calculator-form {
    grid-template-columns: 1fr;
  }
  
  .calculate-btn {
    grid-column: span 1;
  }
  
  .property-tools {
    flex-wrap: wrap;
  }
  
  .tool-item {
    flex-basis: calc(33.33% - 10px);
  }
}

@media (max-width: 576px) {
  .waterfall-container {
    column-count: 1;
  }
  
  .tool-item {
    flex-basis: calc(50% - 10px);
  }
  
  .map-filters {
    flex-direction: column;
  }
}
</style>