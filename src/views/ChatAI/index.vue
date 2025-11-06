<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAIStore } from '../../stores/ai'
import { useUserStore } from '../../stores/user'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const aiStore = useAIStore()
const userStore = useUserStore()

// 用户输入的问题
const question = ref('')
// 是否正在加载
const isLoading = ref(false)
// 聊天历史
const chatHistory = ref([])
// 当前选中的工具
const activeTab = ref('assistant')
// 文件上传相关
const fileList = ref([])
// 侧边栏是否展开
const sidebarExpanded = ref(true)
// 输入框引用
const inputRef = ref(null)
// 聊天容器引用
const chatContainerRef = ref(null)

// 计算属性：是否已登录
const isLoggedIn = computed(() => userStore.isLoggedIn)

// 工具选项
const toolTabs = [
  // { id: 'assistant', name: '助手', icon: 'user-tie' },
  // { id: 'images', name: 'Images', icon: 'images' },
  // { id: 'video', name: '视频', icon: 'video' }
]

// 回答标签页 - 不再需要Tab切换功能，但保留数据结构供后续使用
const answerTabs = [
  { id: 'conclusion', name: '结论汇总' },
  { id: 'structured', name: '数据/资料' }
]

// 当前选中的回答标签页
const activeAnswerTab = ref('conclusion')

// 从URL获取问题并加载模拟数据
onMounted(() => {
  if (route.query.q) {
    question.value = route.query.q
    sendMessage()
  }
  
  // 加载历史聊天记录
  loadChatHistory()
  
  // 聚焦输入框
  nextTick(() => {
    if (inputRef.value) {
      inputRef.value.focus()
    }
  })
})

// 加载聊天历史
const loadChatHistory = () => {
  // 这里可以从API获取历史记录，现在使用模拟数据
  chatHistory.value = [
    {
      id: 1,
      type: 'user',
      content: '2025年Q3迈阿密三居室的平均每平方英尺价格是多少？',
      timestamp: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 2,
      type: 'assistant',
      content: generateMockAnswer('2025年Q3迈阿密三居室的平均每平方英尺价格是多少？'),
      timestamp: new Date(Date.now() - 3500000).toISOString()
    },
    {
      id: 3,
      type: 'user',
      content: '比较纽约和东京的租金回报率',
      timestamp: new Date(Date.now() - 2600000).toISOString()
    },
    {
      id: 4,
      type: 'assistant',
      content: generateMockAnswer('比较纽约和东京的租金回报率'),
      timestamp: new Date(Date.now() - 2500000).toISOString()
    }
  ]
}

// 发送消息
const sendMessage = async () => {
  if (!question.value.trim()) return
  
  // 添加用户消息到聊天历史
  const userMessage = {
    id: Date.now(),
    type: 'user',
    content: question.value,
    timestamp: new Date().toISOString()
  }
  
  chatHistory.value.push(userMessage)
  isLoading.value = true
  
  // 滚动到底部
  scrollToBottom()
  
  // 清空输入框
  const userQuestion = question.value
  question.value = ''
  
  try {
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 重置当前选中的回答标签页
    activeAnswerTab.value = 'conclusion'
    
    // 模拟AI回答
    const mockAnswer = generateMockAnswer(userQuestion)
    const aiResponse = {
      id: Date.now() + 1,
      type: 'assistant',
      content: mockAnswer,
      timestamp: new Date().toISOString()
    }
    
    chatHistory.value.push(aiResponse)
    
    // 如果用户已登录，保存到历史记录
    if (isLoggedIn.value) {
      // 这里可以调用API保存聊天记录
    }
  } catch (error) {
    console.error('发送消息出错:', error)
    
    // 添加错误消息
    chatHistory.value.push({
      id: Date.now() + 1,
      type: 'error',
      content: '抱歉，处理您的请求时出现了问题，请稍后再试。',
      timestamp: new Date().toISOString()
    })
  } finally {
    isLoading.value = false
    
    // 滚动到底部
    scrollToBottom()
    
    // 聚焦输入框
    nextTick(() => {
      if (inputRef.value) {
        inputRef.value.focus()
      }
    })
  }
}

// 不再需要切换回答标签页的函数，因为已经改为左右两栏布局
// 但保留activeAnswerTab变量以避免其他地方可能的引用错误
// const switchAnswerTab = (tabId, messageId) => {
//   activeAnswerTab.value = tabId
// }

// 格式化结构化数据为多个表格形式
const formatStructuredData = (jsonString) => {
  try {
    const data = JSON.parse(jsonString);
    const tables = [];
    
    // 处理顶层对象，每个顶层键作为一个独立表格
    for (const topKey in data) {
      const tableData = {
        title: topKey,
        rows: []
      };
      
      const value = data[topKey];
      
      // 如果是数组类型，特殊处理为表格
      if (Array.isArray(value)) {
        if (value.length > 0 && typeof value[0] === 'object') {
          // 数组中包含对象，创建带列头的表格
          const columns = new Set();
          value.forEach(item => {
            Object.keys(item).forEach(key => columns.add(key));
          });
          
          tableData.type = 'array-objects';
          tableData.columns = Array.from(columns);
          tableData.items = value;
        } else {
          // 简单数组，创建简单列表
          tableData.type = 'array-simple';
          tableData.items = value;
        }
      } 
      // 如果是对象类型
      else if (typeof value === 'object') {
        tableData.type = 'key-value';
        
        // 处理嵌套对象
        const processObject = (obj, prefix = '') => {
          for (const key in obj) {
            if (typeof obj[key] === 'object' && !Array.isArray(obj[key])) {
              // 添加子标题行
              tableData.rows.push({ type: 'subheader', key: prefix ? `${prefix} - ${key}` : key });
              // 递归处理嵌套对象
              processObject(obj[key], '');
            } else {
              // 添加数据行
              let rowValue = obj[key];
              if (Array.isArray(rowValue)) {
                rowValue = rowValue.join(', ');
              }
              tableData.rows.push({ type: 'data', key, value: rowValue });
            }
          }
        };
        
        processObject(value);
      } 
      // 如果是简单类型
      else {
        tableData.type = 'simple';
        tableData.rows.push({ type: 'data', key: topKey, value: value });
      }
      
      tables.push(tableData);
    }
    
    return tables;
  } catch (e) {
    console.error('解析JSON失败:', e);
    return [{
      title: '错误',
      type: 'key-value',
      rows: [{ type: 'data', key: '错误', value: '数据格式错误' }]
    }];
  }
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    if (chatContainerRef.value) {
      chatContainerRef.value.scrollTop = chatContainerRef.value.scrollHeight
    }
  })
}

// 切换工具
const switchTab = (tabId) => {
  activeTab.value = tabId
}

// 切换侧边栏
const toggleSidebar = () => {
  sidebarExpanded.value = !sidebarExpanded.value
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

// 使用建议问题
const useSuggestedQuestion = (q) => {
  question.value = q
  sendMessage()
}

// 格式化时间
const formatTime = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

// 格式化日期
const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  return date.toLocaleDateString('zh-CN', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// 从结构化数据中提取关键指标
const getKeyMetrics = (structuredData) => {
  try {
    if (!structuredData) return []
    
    const data = typeof structuredData === 'string' 
      ? JSON.parse(structuredData) 
      : structuredData
    
    const metrics = []
    
    // 尝试提取价格/回报率相关指标
    if (data['平均价格']) {
      metrics.push({ label: '平均价格', value: data['平均价格'] })
    } else if (data['整体预测涨幅']) {
      metrics.push({ label: '预测涨幅', value: data['整体预测涨幅'] })
    } else if (data['累计涨幅']) {
      metrics.push({ label: '累计涨幅', value: data['累计涨幅'] })
    }
    
    // 尝试提取城市/地区相关指标
    if (data['热点城市'] && Array.isArray(data['热点城市'])) {
      metrics.push({ label: '热点城市', value: data['热点城市'][0] })
    }
    
    // 添加默认指标，确保至少有3个指标显示
    if (metrics.length < 3) {
      const defaultMetrics = [
        { label: '年度增长率', value: '+5.8%' },
        { label: '投资回报率', value: '4.2%' },
        { label: '市场稳定性', value: '中高' }
      ]
      
      for (let i = metrics.length; i < 3; i++) {
        metrics.push(defaultMetrics[i])
      }
    }
    
    return metrics
  } catch (e) {
    console.error('解析关键指标失败:', e)
    return [
      { label: '年度增长率', value: '+5.8%' },
      { label: '投资回报率', value: '4.2%' },
      { label: '市场稳定性', value: '中高' }
    ]
  }
}

// 从结构化数据中提取趋势要点
const getTrendPoints = (structuredData) => {
  try {
    if (!structuredData) return getDefaultTrendPoints()
    
    const data = typeof structuredData === 'string' 
      ? JSON.parse(structuredData) 
      : structuredData
    
    const points = []
    
    // 尝试提取年度表现数据
    if (data['年度表现']) {
      Object.entries(data['年度表现']).forEach(([year, performance]) => {
        points.push(`${year}年: ${performance}`)
      })
    }
    
    // 尝试提取主要驱动因素
    if (data['主要驱动因素'] && Array.isArray(data['主要驱动因素'])) {
      data['主要驱动因素'].forEach(factor => {
        points.push(`驱动因素: ${factor}`)
      })
    }
    
    // 如果没有足够的点，使用默认点
    return points.length > 0 ? points : getDefaultTrendPoints()
  } catch (e) {
    console.error('解析趋势要点失败:', e)
    return getDefaultTrendPoints()
  }
}

// 默认趋势要点
const getDefaultTrendPoints = () => {
  return [
    '2023年: 市场经历短暂调整，价格增长放缓',
    '2024年: 在低利率环境下恢复增长',
    '2025年: 稳定增长，但区域差异明显',
    '驱动因素: 远程工作趋势持续推动郊区房产需求',
    '驱动因素: 国际投资者重返市场，特别是高端房产领域'
  ]
}

// 从结构化数据中提取区域比较数据
const getRegionComparison = (structuredData) => {
  try {
    if (!structuredData) return getDefaultRegionComparison()
    
    const data = typeof structuredData === 'string' 
      ? JSON.parse(structuredData) 
      : structuredData
    
    const regions = []
    
    // 尝试提取区域价格数据
    if (data['区域价格']) {
      Object.entries(data['区域价格']).forEach(([region, price]) => {
        regions.push({
          name: region,
          index: price,
          change: '+8.5%',
          forecast: '上升'
        })
      })
    } 
    // 尝试提取城市比较数据
    else if (data['城市比较']) {
      Object.entries(data['城市比较']).forEach(([city, cityData]) => {
        regions.push({
          name: city,
          index: cityData['当前租金回报率'] || '4.0%',
          change: cityData['5年变化趋势'] === '下降' ? '-0.7%' : '+0.2%',
          forecast: cityData['5年变化趋势'] || '稳定'
        })
      })
    }
    
    // 如果没有足够的区域，使用默认区域
    return regions.length > 0 ? regions : getDefaultRegionComparison()
  } catch (e) {
    console.error('解析区域比较失败:', e)
    return getDefaultRegionComparison()
  }
}

// 默认区域比较数据
const getDefaultRegionComparison = () => {
  return [
    { name: '市中心', index: '120', change: '+6.5%', forecast: '上升' },
    { name: '近郊区', index: '105', change: '+4.2%', forecast: '稳定' },
    { name: '远郊区', index: '95', change: '+2.8%', forecast: '稳定' },
    { name: '水景区', index: '135', change: '+7.3%', forecast: '强劲上升' }
  ]
}

// 从结构化数据中提取投资建议
const getInvestmentAdvice = (structuredData) => {
  try {
    if (!structuredData) return getDefaultInvestmentAdvice()
    
    const data = typeof structuredData === 'string' 
      ? JSON.parse(structuredData) 
      : structuredData
    
    const advice = []
    
    // 尝试提取投资建议
    if (data['投资建议'] && Array.isArray(data['投资建议'])) {
      const icons = ['fa-chart-line', 'fa-building', 'fa-users', 'fa-balance-scale']
      
      data['投资建议'].forEach((item, index) => {
        if (index < 4) {
          advice.push({
            title: item.split(':')[0] || '投资策略',
            description: item.split(':')[1] || item,
            icon: 'fas ' + (icons[index] || 'fa-chart-line')
          })
        }
      })
    }
    
    // 如果没有足够的建议，使用默认建议
    return advice.length > 0 ? advice : getDefaultInvestmentAdvice()
  } catch (e) {
    console.error('解析投资建议失败:', e)
    return getDefaultInvestmentAdvice()
  }
}

// 默认投资建议
const getDefaultInvestmentAdvice = () => {
  return [
    {
      title: '多元化投资',
      description: '在不同区域和房产类型间分散投资，降低风险',
      icon: 'fas fa-chart-pie'
    },
    {
      title: '关注基础设施',
      description: '优先考虑有新基础设施项目的区域，这通常带来价值增长',
      icon: 'fas fa-road'
    },
    {
      title: '长期持有策略',
      description: '采用5年以上的持有策略，以度过市场短期波动',
      icon: 'fas fa-clock'
    },
    {
      title: '关注人口趋势',
      description: '投资人口持续流入的区域，确保长期租赁需求',
      icon: 'fas fa-users'
    }
  ]
}

// 模拟生成回答
const generateMockAnswer = (q) => {
  // 结论内容
  let conclusion = '';
  // 结构化数据内容
  let structured = '';
  // 可视化报告内容
  let visualization = '';
  // 报告标题
  let title = '';
  
  if (q.toLowerCase().includes('迈阿密') && q.toLowerCase().includes('价格')) {
    title = '2025年Q3迈阿密三居室房产市场分析报告';
    conclusion = `2025年Q3迈阿密三居室的平均每平方英尺价格为$580。这比去年同期上涨了8.5%，高于佛罗里达州的平均涨幅（6.2%）。迈阿密市中心区域价格更高，达到每平方英尺$720，而郊区平均为$450。预计到2026年，价格将继续上涨约5-7%。`;
    
    structured = `{
  "基本信息": {
    "地区": "迈阿密",
    "房型": "三居室",
    "时间": "2025年Q3",
    "平均价格": "$580/平方英尺",
    "同比增长": "8.5%",
    "数据来源": "Global Property Index 2025, Miami Real Estate Report Q3 2025"
  },
  "区域价格详情": {
    "市中心": "$720/平方英尺",
    "市中心北部": "$650/平方英尺",
    "市中心南部": "$680/平方英尺",
    "布里克尔": "$750/平方英尺",
    "珊瑚礁": "$620/平方英尺",
    "迈阿密海滩": "$830/平方英尺",
    "近郊区": "$520/平方英尺",
    "远郊区": "$450/平方英尺"
  },
  "历史价格趋势": [
    {"季度": "2024 Q1", "价格": "$510/平方英尺", "同比增长": "5.2%"},
    {"季度": "2024 Q2", "价格": "$525/平方英尺", "同比增长": "5.8%"},
    {"季度": "2024 Q3", "价格": "$540/平方英尺", "同比增长": "6.3%"},
    {"季度": "2024 Q4", "价格": "$550/平方英尺", "同比增长": "6.8%"},
    {"季度": "2025 Q1", "价格": "$560/平方英尺", "同比增长": "7.5%"},
    {"季度": "2025 Q2", "价格": "$570/平方英尺", "同比增长": "8.0%"},
    {"季度": "2025 Q3", "价格": "$580/平方英尺", "同比增长": "8.5%"}
  ],
  "房型价格对比": [
    {"房型": "一居室", "平均价格": "$650/平方英尺", "同比增长": "9.2%", "需求指数": "高"},
    {"房型": "二居室", "平均价格": "$610/平方英尺", "同比增长": "8.8%", "需求指数": "高"},
    {"房型": "三居室", "平均价格": "$580/平方英尺", "同比增长": "8.5%", "需求指数": "中高"},
    {"房型": "四居室及以上", "平均价格": "$540/平方英尺", "同比增长": "7.2%", "需求指数": "中"}
  ],
  "未来预测": {
    "2025 Q4预测": "$590-$600/平方英尺",
    "2026 Q1预测": "$600-$615/平方英尺",
    "2026 Q2预测": "$610-$625/平方英尺",
    "2026 Q3预测": "$620-$640/平方英尺",
    "2026年整体增长率": "5-7%",
    "影响因素": [
      "利率环境",
      "远程工作趋势持续",
      "国际买家回归",
      "新建住宅供应量",
      "佛罗里达州税收政策"
    ]
  }
}`;
    
    visualization = `<line-chart-data>
{
  "title": "迈阿密三居室房价趋势 (2024-2025)",
  "xAxis": ["2024 Q1", "2024 Q2", "2024 Q3", "2024 Q4", "2025 Q1", "2025 Q2", "2025 Q3"],
  "series": [
    {
      "name": "平均价格 ($/平方英尺)",
      "data": [510, 525, 540, 550, 560, 570, 580]
    }
  ]
}
</line-chart-data>`;
  } 
  else if (q.toLowerCase().includes('纽约') && q.toLowerCase().includes('东京') && (q.toLowerCase().includes('租金') || q.toLowerCase().includes('回报'))) {
    title = '纽约与东京租金回报率对比分析报告';
    conclusion = `纽约的平均租金回报率为3.8%，而东京为4.2%。东京的租金回报率在过去5年保持相对稳定，而纽约则有所下降（从2020年的4.5%）。东京的租金市场受到更严格的租赁法规保护，波动性较小，而纽约的租金则受到更多市场因素影响。`;
    
    structured = `{
  "租金回报率概览": {
    "纽约当前租金回报率": "3.8%",
    "东京当前租金回报率": "4.2%",
    "全球平均租金回报率": "3.9%",
    "北美平均租金回报率": "4.0%",
    "亚太平均租金回报率": "4.1%",
    "数据来源": "Global Rental Yield Index 2025, Urban Property Investment Report"
  },
  "城市详细对比": [
    {
      "指标": "当前租金回报率",
      "纽约": "3.8%",
      "东京": "4.2%",
      "差异": "+0.4%（东京更高）"
    },
    {
      "指标": "2020年租金回报率",
      "纽约": "4.5%",
      "东京": "4.3%",
      "差异": "-0.2%（纽约更高）"
    },
    {
      "指标": "5年变化趋势",
      "纽约": "下降 (-0.7%)",
      "东京": "稳定 (-0.1%)",
      "差异": "纽约下降更明显"
    },
    {
      "指标": "平均月租金（2居室）",
      "纽约": "$3,850",
      "东京": "$2,100",
      "差异": "-$1,750（东京更低）"
    },
    {
      "指标": "平均房产价格（2居室）",
      "纽约": "$1,215,000",
      "东京": "$600,000",
      "差异": "-$615,000（东京更低）"
    },
    {
      "指标": "租赁市场稳定性",
      "纽约": "中",
      "东京": "高",
      "差异": "东京更稳定"
    }
  ],
  "纽约区域租金回报率": [
    {"区域": "曼哈顿", "回报率": "3.2%", "趋势": "下降", "风险评级": "中低"},
    {"区域": "布鲁克林", "回报率": "3.9%", "趋势": "稳定", "风险评级": "中"},
    {"区域": "皇后区", "回报率": "4.3%", "趋势": "上升", "风险评级": "中"},
    {"区域": "布朗克斯", "回报率": "4.8%", "趋势": "上升", "风险评级": "中高"},
    {"区域": "斯塔滕岛", "回报率": "4.5%", "趋势": "稳定", "风险评级": "中"}
  ],
  "东京区域租金回报率": [
    {"区域": "中央区", "回报率": "3.8%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "港区", "回报率": "3.6%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "新宿区", "回报率": "4.3%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "涩谷区", "回报率": "4.1%", "趋势": "稳定", "风险评级": "低"},
    {"区域": "周边区域", "回报率": "4.7%", "趋势": "上升", "风险评级": "中低"}
  ],
  "影响因素分析": {
    "纽约": [
      "市场波动性较高",
      "租赁法规变化频繁",
      "供需关系受经济周期影响明显",
      "国际投资者情绪波动",
      "新建住宅供应不足"
    ],
    "东京": [
      "严格且稳定的租赁法规",
      "人口结构变化缓慢",
      "经济政策连续性强",
      "租户保护政策完善",
      "长期租约文化"
    ]
  },
  "投资者建议": [
    "纽约：关注新兴区域如布鲁克林和皇后区，回报率更高",
    "东京：优先考虑周边区域，价格较低但回报率更高",
    "纽约：短期投资者需警惕市场波动",
    "东京：适合长期稳定收益的投资者",
    "两市均应关注交通便利性，是租金溢价的关键因素"
  ]
}`;
    
    visualization = `<bar-chart-data>
{
  "title": "纽约与东京租金回报率比较 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "纽约",
      "data": [4.5, 4.3, 4.1, 4.0, 3.9, 3.8]
    },
    {
      "name": "东京",
      "data": [4.3, 4.3, 4.2, 4.2, 4.1, 4.2]
    }
  ]
}
</bar-chart-data>`;
  }
  else if (q.toLowerCase().includes('趋势') && q.toLowerCase().includes('5年')) {
    title = '2020-2025年迈阿密房地产市场趋势分析报告';
    conclusion = `过去5年（2020-2025）迈阿密房地产价格呈现强劲上涨趋势，累计涨幅达到32%。2020年疫情初期短暂下跌后，从2021年开始加速上涨，特别是高端住宅和水景房产。2023年出现短暂调整，但2024-2025年又恢复增长。远程工作趋势和税收优惠政策是推动这一增长的主要因素。`;
    
    structured = `{
  "市场概览": {
    "市场": "迈阿密房地产",
    "时间范围": "2020-2025",
    "累计涨幅": "32%",
    "年均增长率": "5.7%",
    "波动性指数": "中高",
    "市场周期阶段": "成熟增长期",
    "数据来源": "Miami Real Estate Association, Global Property Trends 2025"
  },
  "年度价格指数": [
    {"年份": "2020", "价格指数": 100, "同比变化": "-2.5%", "市场状态": "疫情影响，短暂下跌"},
    {"年份": "2021", "价格指数": 108, "同比变化": "+8.0%", "市场状态": "开始加速上涨"},
    {"年份": "2022", "价格指数": 118, "同比变化": "+9.3%", "市场状态": "持续上涨"},
    {"年份": "2023", "价格指数": 122, "同比变化": "+3.4%", "市场状态": "短暂调整"},
    {"年份": "2024", "价格指数": 127, "同比变化": "+4.1%", "市场状态": "恢复增长"},
    {"年份": "2025", "价格指数": 132, "同比变化": "+3.9%", "市场状态": "稳定增长"}
  ],
  "季度详细数据": [
    {"季度": "2023 Q1", "价格指数": 119, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2023 Q2", "价格指数": 120, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2023 Q3", "价格指数": 121, "环比变化": "+0.8%", "成交量": "中低"},
    {"季度": "2023 Q4", "价格指数": 122, "环比变化": "+0.8%", "成交量": "中低"},
    {"季度": "2024 Q1", "价格指数": 123, "环比变化": "+0.8%", "成交量": "中"},
    {"季度": "2024 Q2", "价格指数": 125, "环比变化": "+1.6%", "成交量": "中高"},
    {"季度": "2024 Q3", "价格指数": 126, "环比变化": "+0.8%", "成交量": "高"},
    {"季度": "2024 Q4", "价格指数": 127, "环比变化": "+0.8%", "成交量": "高"},
    {"季度": "2025 Q1", "价格指数": 129, "环比变化": "+1.6%", "成交量": "高"},
    {"季度": "2025 Q2", "价格指数": 130, "环比变化": "+0.8%", "成交量": "中高"},
    {"季度": "2025 Q3", "价格指数": 131, "环比变化": "+0.8%", "成交量": "中高"},
    {"季度": "2025 Q4", "价格指数": 132, "环比变化": "+0.8%", "成交量": "中"}
  ],
  "房产类型表现": [
    {"类型": "高端住宅", "5年累计涨幅": "38%", "年均增长": "6.6%", "需求趋势": "强劲", "投资评级": "A"},
    {"类型": "水景房产", "5年累计涨幅": "42%", "年均增长": "7.3%", "需求趋势": "强劲", "投资评级": "A+"},
    {"类型": "中档公寓", "5年累计涨幅": "30%", "年均增长": "5.4%", "需求趋势": "稳定", "投资评级": "B+"},
    {"类型": "普通住宅", "5年累计涨幅": "25%", "年均增长": "4.6%", "需求趋势": "稳定", "投资评级": "B"},
    {"类型": "商业地产", "5年累计涨幅": "18%", "年均增长": "3.4%", "需求趋势": "波动", "投资评级": "C+"}
  ],
  "区域表现对比": [
    {"区域": "迈阿密海滩", "5年累计涨幅": "45%", "年均增长": "7.7%", "需求趋势": "强劲", "投资评级": "A+"},
    {"区域": "布里克尔", "5年累计涨幅": "40%", "年均增长": "7.0%", "需求趋势": "强劲", "投资评级": "A"},
    {"区域": "珊瑚礁", "5年累计涨幅": "35%", "年均增长": "6.2%", "需求趋势": "稳定上升", "投资评级": "A-"},
    {"区域": "市中心", "5年累计涨幅": "33%", "年均增长": "5.9%", "需求趋势": "稳定", "投资评级": "B+"},
    {"区域": "温伍德", "5年累计涨幅": "38%", "年均增长": "6.6%", "需求趋势": "快速上升", "投资评级": "A-"},
    {"区域": "小哈瓦那", "5年累计涨幅": "28%", "年均增长": "5.1%", "需求趋势": "稳定", "投资评级": "B"},
    {"区域": "北迈阿密", "5年累计涨幅": "22%", "年均增长": "4.1%", "需求趋势": "缓慢上升", "投资评级": "B-"}
  ],
  "主要驱动因素": [
    "远程工作趋势持续化",
    "税收优惠政策吸引高净值人群",
    "生活质量与气候优势",
    "国际买家回归市场",
    "科技和金融行业扩张",
    "基础设施改善项目",
    "供应限制与土地稀缺"
  ],
  "风险因素": [
    "气候变化与海平面上升",
    "保险成本上升",
    "利率环境变化",
    "房产税潜在调整",
    "供应过剩风险（特定细分市场）",
    "国际政治经济不确定性"
  ]
}`;
    
    visualization = `<line-chart-data>
{
  "title": "迈阿密房地产价格指数 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "价格指数 (2020=100)",
      "data": [100, 108, 118, 122, 127, 132]
    }
  ]
}
</line-chart-data>`;
  }
  else if (q.toLowerCase().includes('欧洲') && q.toLowerCase().includes('最高')) {
    title = '2025年欧洲城市租金回报率排名分析报告';
    conclusion = `欧洲租金回报率最高的城市是：1. 布达佩斯（匈牙利）：6.8%，2. 华沙（波兰）：6.2%，3. 布拉格（捷克）：5.7%，4. 里斯本（葡萄牙）：5.5%，5. 柏林（德国）：4.9%。东欧城市普遍提供更高的租金回报率，但也伴随着较高的市场波动性和政策风险。`;
    
    structured = `{
  "欧洲租金回报率概览": {
    "欧洲平均租金回报率": "4.3%",
    "西欧平均租金回报率": "3.8%",
    "东欧平均租金回报率": "5.9%",
    "南欧平均租金回报率": "5.1%",
    "北欧平均租金回报率": "4.0%",
    "数据来源": "European Rental Yield Report 2025, Global Property Investment Index"
  },
  "欧洲租金回报率排名": [
    {
      "城市": "布达佩斯",
      "国家": "匈牙利",
      "回报率": "6.8%",
      "风险评级": "中高",
      "市场特点": ["价格相对较低", "投资门槛低", "政策不确定性"]
    },
    {
      "城市": "华沙",
      "国家": "波兰",
      "回报率": "6.2%",
      "风险评级": "中",
      "市场特点": ["经济增长强劲", "外国投资增加", "市场规模扩大"]
    },
    {
      "城市": "布拉格",
      "国家": "捷克",
      "回报率": "5.7%",
      "风险评级": "中",
      "市场特点": ["旅游业带动", "历史文化吸引力", "供应有限"]
    },
    {
      "城市": "里斯本",
      "国家": "葡萄牙",
      "回报率": "5.5%",
      "风险评级": "中低",
      "市场特点": ["黄金签证计划", "宜居城市", "国际买家兴趣"]
    },
    {
      "城市": "柏林",
      "国家": "德国",
      "回报率": "4.9%",
      "风险评级": "低",
      "市场特点": ["稳定性高", "租赁法规严格", "长期增长潜力"]
    }
  ],
  "完整城市排名": [
    {"排名": 1, "城市": "布达佩斯", "国家": "匈牙利", "回报率": "6.8%", "风险评级": "中高"},
    {"排名": 2, "城市": "华沙", "国家": "波兰", "回报率": "6.2%", "风险评级": "中"},
    {"排名": 3, "城市": "布拉格", "国家": "捷克", "回报率": "5.7%", "风险评级": "中"},
    {"排名": 4, "城市": "里斯本", "国家": "葡萄牙", "回报率": "5.5%", "风险评级": "中低"},
    {"排名": 5, "城市": "柏林", "国家": "德国", "回报率": "4.9%", "风险评级": "低"},
    {"排名": 6, "城市": "布加勒斯特", "国家": "罗马尼亚", "回报率": "6.5%", "风险评级": "高"},
    {"排名": 7, "城市": "索菲亚", "国家": "保加利亚", "回报率": "6.0%", "风险评级": "高"},
    {"排名": 8, "城市": "雅典", "国家": "希腊", "回报率": "5.3%", "风险评级": "中高"},
    {"排名": 9, "城市": "马德里", "国家": "西班牙", "回报率": "5.0%", "风险评级": "中低"},
    {"排名": 10, "城市": "曼彻斯特", "国家": "英国", "回报率": "4.8%", "风险评级": "中"},
    {"排名": 11, "城市": "汉堡", "国家": "德国", "回报率": "4.7%", "风险评级": "低"},
    {"排名": 12, "城市": "米兰", "国家": "意大利", "回报率": "4.6%", "风险评级": "中"},
    {"排名": 13, "城市": "阿姆斯特丹", "国家": "荷兰", "回报率": "4.2%", "风险评级": "低"},
    {"排名": 14, "城市": "维也纳", "国家": "奥地利", "回报率": "4.0%", "风险评级": "低"},
    {"排名": 15, "城市": "巴黎", "国家": "法国", "回报率": "3.8%", "风险评级": "低"},
    {"排名": 16, "城市": "伦敦", "国家": "英国", "回报率": "3.5%", "风险评级": "低"},
    {"排名": 17, "城市": "日内瓦", "国家": "瑞士", "回报率": "3.2%", "风险评级": "极低"},
    {"排名": 18, "城市": "摩纳哥", "国家": "摩纳哥", "回报率": "2.8%", "风险评级": "极低"}
  ],
  "区域风险分析": {
    "东欧": {
      "平均回报率": "5.9%",
      "风险等级": "中高",
      "风险因素": [
        "政治不稳定性",
        "法规变化频繁",
        "货币波动风险",
        "经济发展不均衡",
        "法律体系不完善"
      ],
      "机会因素": [
        "高回报率",
        "价格增长潜力大",
        "经济快速发展",
        "欧盟资金支持",
        "基础设施改善"
      ]
    },
    "西欧": {
      "平均回报率": "3.8%",
      "风险等级": "低",
      "风险因素": [
        "回报率较低",
        "价格已处高位",
        "税收负担重",
        "租赁法规严格",
        "增长空间有限"
      ],
      "机会因素": [
        "市场稳定性高",
        "法律体系完善",
        "政治环境稳定",
        "流动性好",
        "长期保值能力强"
      ]
    },
    "南欧": {
      "平均回报率": "5.1%",
      "风险等级": "中",
      "风险因素": [
        "经济波动性",
        "部分国家债务问题",
        "季节性需求波动",
        "政策变化风险",
        "某些地区过度依赖旅游"
      ],
      "机会因素": [
        "较高回报率",
        "生活质量吸引力",
        "投资者签证计划",
        "旅游业带动",
        "价格仍有上升空间"
      ]
    }
  },
  "投资建议": {
    "风险偏好型投资者": [
      "布达佩斯、华沙等东欧城市提供最高回报",
      "关注大学城和新兴商业区",
      "考虑短期租赁策略以最大化收益",
      "分散投资于多个城市以降低风险"
    ],
    "平衡型投资者": [
      "布拉格、里斯本等城市提供良好的风险回报比",
      "结合长期和短期租赁策略",
      "关注交通便利的中等价位区域",
      "考虑新兴但已有稳定基础的区域"
    ],
    "保守型投资者": [
      "柏林、维也纳等西欧城市提供稳定回报",
      "专注于长期租赁市场",
      "优先考虑市中心和成熟社区",
      "关注有严格租户保护法的市场"
    ]
  }
}`;
    
    visualization = `<bar-chart-data>
{
  "title": "欧洲城市租金回报率排名 (2025)",
  "xAxis": ["布达佩斯", "华沙", "布拉格", "里斯本", "柏林"],
  "series": [
    {
      "name": "租金回报率 (%)",
      "data": [6.8, 6.2, 5.7, 5.5, 4.9]
    }
  ]
}
</bar-chart-data>`;
  }
  else if (q.toLowerCase().includes('预测') || q.toLowerCase().includes('2026')) {
    title = '2026年柏林房地产市场预测分析报告';
    conclusion = `2026年柏林房价预测显示将上涨4.3-5.8%。这一增长率低于2021-2023年的高峰期，但仍高于德国平均水平。柏林市中心和热门区域如Mitte和Prenzlauer Berg预计涨幅更高（6-7%），而外围区域如Spandau预计涨幅较低（3-4%）。影响因素包括持续的住房短缺、低利率环境和国际投资者兴趣。`;
    
    structured = `{
  "城市": "柏林",
  "年份": "2026",
  "整体预测涨幅": "4.3-5.8%",
  "区域预测": {
    "市中心": "6-7%",
    "Mitte": "6.5%",
    "Prenzlauer Berg": "6.2%",
    "Kreuzberg": "5.8%",
    "Friedrichshain": "5.5%",
    "Neukölln": "4.8%",
    "Spandau": "3-4%"
  },
  "主要影响因素": [
    "住房供应短缺",
    "低利率环境",
    "国际投资者兴趣",
    "城市发展规划",
    "人口增长"
  ],
  "历史对比": {
    "2021-2023": "年均7.5%",
    "2024-2025": "年均5.2%",
    "2026预测": "4.3-5.8%"
  },
  "数据来源": "Berlin Property Forecast 2026, European Housing Market Analysis"
}`;
    
    visualization = `<line-chart-data>
{
  "title": "柏林房价预测 (2025-2026)",
  "xAxis": ["2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4", "2026 Q1", "2026 Q2", "2026 Q3", "2026 Q4"],
  "series": [
    {
      "name": "预测价格指数 (2025=100)",
      "data": [97, 99, 100, 101, 103, 104, 105, 106]
    }
  ]
}
</line-chart-data>`;
  }
  else {
    title = '2025年全球房地产市场概览分析报告';
    conclusion = `根据全球房产数据分析，2025年全球主要房地产市场呈现差异化发展趋势。北美市场整体稳健，欧洲市场温和增长，亚太市场表现不一。投资者应关注城市发展规划、基础设施投资和人口流动趋势，这些因素将显著影响未来2-3年的市场表现。`;
    
    structured = `{
  "全球房地产市场概览 (2025)": {
    "北美市场": {
      "整体表现": "稳健增长",
      "平均价格涨幅": "4.8%",
      "热点城市": ["迈阿密", "奥斯汀", "纳什维尔"],
      "主要驱动因素": ["远程工作趋势", "科技行业扩张", "生活质量考量"]
    },
    "欧洲市场": {
      "整体表现": "温和增长",
      "平均价格涨幅": "3.2%",
      "热点城市": ["里斯本", "柏林", "华沙"],
      "主要驱动因素": ["低利率环境", "城市更新项目", "国际投资"]
    },
    "亚太市场": {
      "整体表现": "表现不一",
      "平均价格涨幅": "2.9%",
      "热点城市": ["新加坡", "悉尼", "东京"],
      "主要驱动因素": ["经济复苏", "政策调整", "跨境投资回暖"]
    }
  },
  "投资建议": [
    "关注城市发展规划和基础设施投资",
    "评估人口流动趋势和就业市场变化",
    "考虑长期持有策略，规避短期波动",
    "分散投资组合，平衡风险与回报"
  ],
  "数据来源": "Global Property Market Outlook 2025, International Real Estate Investment Report"
}`;
    
    visualization = `<line-chart-data>
{
  "title": "全球主要地区房产价格指数 (2020-2025)",
  "xAxis": ["2020", "2021", "2022", "2023", "2024", "2025"],
  "series": [
    {
      "name": "北美",
      "data": [100, 105, 112, 118, 124, 130]
    },
    {
      "name": "欧洲",
      "data": [100, 103, 108, 112, 116, 120]
    },
    {
      "name": "亚太",
      "data": [100, 102, 106, 110, 114, 117]
    }
  ]
}
</line-chart-data>`;
  }
  
  return {
    title: title,
    conclusion: conclusion,
    structured: structured,
    visualization: visualization,
    analysis: '基于历史数据分析，我们观察到该市场呈现出明显的周期性波动，主要受到经济政策、人口迁移和基础设施投资等因素的影响。近期数据显示，投资者情绪正逐步恢复，特别是在高端住宅和商业地产领域。'
  };
}
</script>

<template>
  <div class="chat-ai-page">
    <div class="chat-container">
      <!-- 侧边栏 -->
      <div class="sidebar" :class="{ 'collapsed': !sidebarExpanded }">
        <div class="sidebar-header">
          <h2>首页</h2>
          <button class="toggle-sidebar-btn" @click="toggleSidebar">
            <i class="fas" :class="sidebarExpanded ? 'fa-chevron-left' : 'fa-chevron-right'"></i>
          </button>
        </div>
        
        <div v-if="sidebarExpanded" class="sidebar-content">
          <!-- 历史记录 -->
          <div class="history-section">
            <h3>历史对话</h3>
            <div class="history-list">
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>2025年Q3迈阿密三居室的平均每平方英尺价格是多少？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>比较纽约和东京的租金回报率</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>过去5年迈阿密房地产价格趋势如何？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>欧洲哪些城市的租金回报率最高？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>2026年柏林房价预测是多少？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>新加坡对外国人购房有哪些限制政策？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>如何评估一个地区的房产投资潜力？</span>
              </div>
              <div class="history-item">
                <i class="fas fa-comment-alt"></i>
                <span>伦敦和巴黎哪个城市的房产升值空间更大？</span>
              </div>
            </div>
          </div>
          
          <!-- 新对话按钮 -->
          <div class="new-chat-section">
            <button class="new-chat-btn">
              <i class="fas fa-plus"></i> 新对话
            </button>
          </div>
        </div>
      </div>
      
      <!-- 主内容区 -->
      <div class="main-content">
        <!-- 聊天头部 -->
        <!-- <div class="chat-header">
          <div class="chat-tabs">
            <div 
              v-for="tab in toolTabs" 
              :key="tab.id"
              class="tab-item"
              :class="{ 'active': activeTab === tab.id }"
              @click="switchTab(tab.id)"
            >
              <i :class="'fas fa-' + tab.icon"></i>
              <span>{{ tab.name }}</span>
            </div>
          </div>
          
          <div class="header-actions">
            <button class="action-btn">
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div> -->
        
        <!-- 聊天内容区 -->
        <div class="chat-messages" ref="chatContainerRef">
          <div class="chat-welcome" v-if="chatHistory.length === 0">
            <h2>欢迎使用 Global PropAI 智能助手</h2>
            <p>您可以询问任何关于房地产市场、投资策略、价格趋势的问题</p>
            
            <div class="suggested-questions">
              <h3>您可以尝试这些问题：</h3>
              <div class="question-chips">
                <div class="question-chip" @click="useSuggestedQuestion('2025年Q3迈阿密三居室的平均每平方英尺价格是多少？')">
                  2025年Q3迈阿密三居室的平均每平方英尺价格是多少？
                </div>
                <div class="question-chip" @click="useSuggestedQuestion('比较纽约和东京的租金回报率')">
                  比较纽约和东京的租金回报率
                </div>
                <div class="question-chip" @click="useSuggestedQuestion('过去5年迈阿密房地产价格趋势如何？')">
                  过去5年迈阿密房地产价格趋势如何？
                </div>
                <div class="question-chip" @click="useSuggestedQuestion('欧洲哪些城市的租金回报率最高？')">
                  欧洲哪些城市的租金回报率最高？
                </div>
                <div class="question-chip" @click="useSuggestedQuestion('2026年柏林房价预测是多少？')">
                  2026年柏林房价预测是多少？
                </div>
                <div class="question-chip" @click="useSuggestedQuestion('新加坡对外国人购房有哪些限制政策？')">
                  新加坡对外国人购房有哪些限制政策？
                </div>
              </div>
            </div>
          </div>
          
          <template v-else>
            <div v-for="message in chatHistory" :key="message.id" class="qa-container">
              <!-- 用户问题 -->
              <div v-if="message.type === 'user'" class="user-question">
                <h2>{{ message.content }}</h2>
                <div class="question-meta">
                  <span class="question-time">{{ formatTime(message.timestamp) }}</span>
                </div>
              </div>
              
              <!-- AI回答 -->
              <div v-else-if="message.type === 'assistant'" class="ai-answer">
                <!-- 回答内容 - 左右两栏布局 -->
                <div class="answer-content two-column-layout">
                  <!-- 左侧：结论汇总 -->
                  <div class="answer-column conclusion-column">
                    <h3 class="column-title">结论汇总</h3>
                    <div class="answer-conclusion">
                      <p>{{ message.content.conclusion }}</p>
                    </div>
                  </div>
                  
                  <!-- 右侧：结构化数据 -->
                  <div class="answer-column structured-column">
                    <h3 class="column-title">数据/资料</h3>
                    <div class="answer-structured">
                      <div v-if="message.content.structured.includes('{')" class="structured-tables-container">
                        <!-- 多表格展示 -->
                        <div v-for="(table, tableIndex) in formatStructuredData(message.content.structured)" :key="tableIndex" class="structured-table-section">
                          <h3 class="table-title">{{ table.title }}</h3>
                          
                          <!-- 键值对表格 -->
                          <div v-if="table.type === 'key-value'" class="structured-table-container">
                            <table class="structured-table">
                              <template v-for="(row, rowIndex) in table.rows" :key="rowIndex">
                                <tr>
                                  <template v-if="row.type === 'subheader'">
                                    <th colspan="2" class="subheader">{{ row.key }}</th>
                                  </template>
                                  <template v-else-if="row.type === 'data'">
                                    <td class="key-cell">{{ row.key }}</td>
                                    <td class="value-cell">{{ row.value }}</td>
                                  </template>
                                </tr>
                              </template>
                            </table>
                          </div>
                          
                          <!-- 对象数组表格 -->
                          <div v-else-if="table.type === 'array-objects'" class="structured-table-container">
                            <table class="structured-table array-table">
                              <thead>
                                <tr>
                                  <th v-for="(column, colIndex) in table.columns" :key="colIndex">{{ column }}</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr v-for="(item, itemIndex) in table.items" :key="itemIndex">
                                  <td v-for="(column, colIndex) in table.columns" :key="colIndex">
                                    {{ Array.isArray(item[column]) ? item[column].join(', ') : item[column] }}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                          
                          <!-- 简单数组列表 -->
                          <div v-else-if="table.type === 'array-simple'" class="structured-list-container">
                            <ul class="structured-list">
                              <li v-for="(item, itemIndex) in table.items" :key="itemIndex">
                                {{ item }}
                              </li>
                            </ul>
                          </div>
                          
                          <!-- 简单值 -->
                          <div v-else-if="table.type === 'simple'" class="structured-simple-container">
                            <div class="structured-simple-value">
                              {{ table.rows[0].value }}
                            </div>
                          </div>
                        </div>
                      </div>
                      <pre v-else>{{ message.content.structured }}</pre>
                    </div>
                  </div>
                </div>
                
                <!-- 回答操作 -->
                <div class="answer-actions">
                  <div class="answer-meta">
                    <span class="answer-time">{{ formatTime(message.timestamp) }}</span>
                  </div>
                  <div class="answer-buttons">
                    <button class="action-btn">
                      <i class="far fa-copy"></i>
                    </button>
                    <button class="action-btn">
                      <i class="far fa-thumbs-up"></i>
                    </button>
                    <button class="action-btn">
                      <i class="far fa-thumbs-down"></i>
                    </button>
                  </div>
                </div>
              </div>
              
              <!-- 错误消息 -->
              <div v-else-if="message.type === 'error'" class="error-message">
                <p>{{ message.content }}</p>
              </div>
            </div>
            
            <!-- 加载中状态 -->
            <div v-if="isLoading" class="loading-container">
              <div class="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <p>AI正在思考中...</p>
            </div>
          </template>
        </div>
        
        <!-- 输入区域 -->
        <div class="chat-input-area">
          <div class="input-container">
            <textarea 
              ref="inputRef"
              v-model="question" 
              placeholder="输入您的问题..."
              @keydown.enter.prevent="sendMessage"
              rows="1"
            ></textarea>
            
            <div class="input-actions">
              <button class="action-btn">
                <i class="fas fa-paperclip"></i>
              </button>
              <button class="action-btn">
                <i class="fas fa-microphone"></i>
              </button>
              <button class="send-btn" @click="sendMessage" :disabled="!question.trim() || isLoading">
                <i class="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
          
          <!-- <div class="input-footer">
            <p>对话内容可能存在错误，如：结论汇总，结构化数据，可视化报告</p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.chat-ai-page {
  margin-top: 100px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #fafafa;
}

.chat-container {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* 侧边栏样式 */
.sidebar {
  width: 280px;
  background-color: #fff;
  border-right: 1px solid #eaeaea;
  display: flex;
  flex-direction: column;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar-header {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
}

.sidebar-header h2 {
  margin: 0;
  font-size: 16px;
  color: #333;
  font-weight: 500;
}

.toggle-sidebar-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
}

.sidebar-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.history-section {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
}

.history-section h3 {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
  font-weight: normal;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.history-item {
  padding: 8px 12px;
  background-color: transparent;
  border-left: 2px solid transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.2s ease;
}

.history-item:hover {
  background-color: #f5f5f5;
  border-left-color: #1890ff;
}

.history-item i {
  color: #1890ff;
  font-size: 14px;
}

.history-item span {
  font-size: 13px;
  color: #333;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.new-chat-section {
  padding: 12px;
  border-top: 1px solid #eaeaea;
}

.new-chat-btn {
  width: 100%;
  padding: 8px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition: background-color 0.3s;
  font-size: 14px;
}

.new-chat-btn:hover {
  background-color: #40a9ff;
}

/* 主内容区样式 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.chat-header {
  padding: 12px 16px;
  background-color: #fff;
  border-bottom: 1px solid #eaeaea;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-tabs {
  display: flex;
  gap: 16px;
}

.tab-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
  font-size: 14px;
}

.tab-item.active {
  background-color: #e6f7ff;
  color: #1890ff;
}

.tab-item i {
  font-size: 14px;
}

.header-actions {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  background-color: #f5f5f5;
  color: #1890ff;
}

/* 聊天内容区样式 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background-color: #fafafa;
}

.chat-welcome {
  text-align: center;
  max-width: 600px;
  margin: 40px auto;
}

.chat-welcome h2 {
  font-size: 22px;
  margin-bottom: 12px;
  color: #333;
  font-weight: 500;
}

.chat-welcome p {
  font-size: 15px;
  color: #666;
  margin-bottom: 24px;
  line-height: 1.5;
}

.suggested-questions {
  margin-top: 24px;
}

.suggested-questions h3 {
  font-size: 15px;
  margin-bottom: 12px;
  color: #333;
  font-weight: 500;
}

.question-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.question-chip {
  padding: 8px 12px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.2s;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.question-chip:hover {
  background-color: #f0f7ff;
  border-color: #91d5ff;
  color: #1890ff;
}

/* 问答容器样式 */
.qa-container {
  width: 100%;
  margin-bottom: 32px;
  border-bottom: 1px solid #eaeaea;
  padding-bottom: 24px;
}

.qa-container:last-child {
  border-bottom: none;
}

/* 用户问题样式 */
.user-question {
  /* margin-bottom: 16px; */
}

.user-question h2 {
  font-size: 20px;
  font-weight: 500;
  color: #333;
  /* margin-bottom: 8px; */
  line-height: 1.4;
}

.question-meta {
  display: flex;
  justify-content: flex-end;
}

.question-time {
  font-size: 12px;
  color: #999;
}

/* AI回答样式 */
.ai-answer {
  background-color: #fff;
  border-left: 3px solid #1890ff;
}

/* 回答标签页样式 */
.answer-tabs {
  display: flex;
  border-bottom: 1px solid #eaeaea;
  background-color: #fff;
}

.answer-tab {
  padding: 10px 16px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
  border-bottom: 2px solid transparent;
}

.answer-tab:hover {
  color: #1890ff;
}

.answer-tab.active {
  color: #1890ff;
  border-bottom-color: #1890ff;
}

/* 回答内容样式 */
.answer-content {
  padding: 16px;
  min-height: 120px;
  background-color: #fff;
}

/* 两栏布局 */
.two-column-layout {
  display: flex;
  gap: 20px;
}

.answer-column {
  flex: 1;
  min-width: 0; /* 防止内容溢出 */
}

.conclusion-column {
  border-right: 1px solid #eaeaea;
  padding-right: 20px;
}

.structured-column {
  padding-left: 0;
}

.column-title {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
}

.answer-conclusion p {
  font-size: 15px;
  line-height: 1.6;
  color: #333;
  margin: 0;
}

.answer-structured pre {
  font-family: 'Courier New', Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  background-color: #f5f5f5;
  padding: 12px;
  border-radius: 4px;
  overflow-x: auto;
  white-space: pre-wrap;
  color: #333;
}

.structured-tables-container {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.structured-table-section {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.table-title {
  font-size: 16px;
  font-weight: 500;
  color: #1890ff;
  margin: 0;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-bottom: 1px solid #eaeaea;
}

.structured-table-container {
  overflow-x: auto;
  padding: 0 0 10px 0;
}

.structured-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
}

.structured-table th {
  background-color: #f5f7fa;
  padding: 12px 15px;
  text-align: left;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #eaeaea;
}

.structured-table th.subheader {
  background-color: #f0f5ff;
  color: #1890ff;
  font-size: 13px;
}

.structured-table td {
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
}

.structured-table .key-cell {
  width: 30%;
  color: #666;
  font-weight: 500;
}

.structured-table .value-cell {
  color: #333;
}

.structured-table.array-table th {
  background-color: #f0f5ff;
  color: #1890ff;
  font-weight: 500;
  text-align: center;
}

.structured-table.array-table td {
  text-align: center;
}

.structured-list-container {
  padding: 10px 20px;
}

.structured-list {
  margin: 0;
  padding: 0 0 0 20px;
  list-style-type: disc;
}

.structured-list li {
  padding: 6px 0;
  color: #333;
}

.structured-simple-container {
  padding: 15px 20px;
}

.structured-simple-value {
  font-size: 15px;
  color: #333;
  line-height: 1.5;
}

.answer-visualization {
  display: flex;
  justify-content: center;
}

/* 可视化报告样式 - 模拟PDF文档 */
.visualization-report {
  width: 100%;
  background-color: white;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  font-family: 'Segoe UI', Arial, sans-serif;
}

/* 报告标题部分 */
.report-header {
  padding: 24px 30px;
  border-bottom: 1px solid #eaeaea;
  background-color: #f8f9fa;
}

.report-header h2 {
  font-size: 22px;
  color: #333;
  margin: 0 0 12px 0;
  font-weight: 600;
}

.report-meta {
  display: flex;
  justify-content: space-between;
  color: #666;
  font-size: 13px;
}

/* 报告内容部分 */
.report-content {
  padding: 20px 30px;
}

/* 报告章节 */
.report-section {
  margin-bottom: 30px;
}

.report-section h3 {
  font-size: 18px;
  color: #1890ff;
  margin: 0 0 15px 0;
  padding-bottom: 8px;
  border-bottom: 1px solid #eaeaea;
  font-weight: 500;
}

.section-content {
  color: #333;
  font-size: 14px;
  line-height: 1.6;
}

/* 数据分析部分 */
.data-analysis {
  display: flex;
  gap: 20px;
}

.text-column {
  flex: 1;
}

.chart-column {
  flex: 1;
}

/* 关键指标卡片 */
.key-metrics {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.metric-item {
  flex: 1;
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  text-align: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.metric-value {
  font-size: 20px;
  font-weight: 600;
  color: #1890ff;
  margin-bottom: 5px;
}

.metric-label {
  font-size: 13px;
  color: #666;
}

/* 市场趋势部分 */
.trends {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.trend-chart {
  width: 100%;
}

.trend-analysis {
  width: 100%;
}

.trend-points {
  padding-left: 20px;
  margin: 0;
}

.trend-points li {
  margin-bottom: 8px;
  color: #333;
}

/* 区域对比表格 */
.comparison-table {
  width: 100%;
  overflow-x: auto;
}

.comparison-table table {
  width: 100%;
  border-collapse: collapse;
}

.comparison-table th {
  background-color: #f5f7fa;
  padding: 12px 15px;
  text-align: left;
  font-weight: 500;
  color: #333;
  border-bottom: 1px solid #eaeaea;
}

.comparison-table td {
  padding: 10px 15px;
  border-bottom: 1px solid #eaeaea;
}

.comparison-table .positive {
  color: #52c41a;
}

.comparison-table .negative {
  color: #f5222d;
}

/* 投资建议卡片 */
.advice-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 15px;
  margin-top: 10px;
}

.advice-card {
  background-color: #f8f9fa;
  border-radius: 6px;
  padding: 15px;
  display: flex;
  gap: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card-icon {
  width: 40px;
  height: 40px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #1890ff;
  font-size: 18px;
}

.card-content h4 {
  margin: 0 0 5px 0;
  font-size: 15px;
  color: #333;
  font-weight: 500;
}

.card-content p {
  margin: 0;
  font-size: 13px;
  color: #666;
}

/* 报告页脚 */
.report-footer {
  padding: 15px 30px;
  background-color: #f8f9fa;
  border-top: 1px solid #eaeaea;
  text-align: center;
  font-size: 12px;
  color: #999;
}

/* 图表容器 */
.chart-container {
  background-color: #f5f5f5;
  padding: 16px;
  text-align: center;
  height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
}

.chart-container i {
  font-size: 32px;
  color: #1890ff;
  margin-bottom: 16px;
}

.chart-container p {
  font-size: 13px;
  color: #666;
}

/* 回答操作样式 */
.answer-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 16px;
  background-color: #fff;
  border-top: 1px solid #eaeaea;
}

.answer-meta {
  font-size: 12px;
  color: #999;
}

.answer-buttons {
  display: flex;
  gap: 8px;
}

.action-btn {
  background: none;
  border: none;
  color: #666;
  cursor: pointer;
  font-size: 14px;
  padding: 4px;
  border-radius: 4px;
  transition: all 0.2s;
}

.action-btn:hover {
  color: #1890ff;
  background-color: #f0f7ff;
}

/* 错误消息样式 */
.error-message {
  background-color: #fff2f0;
  border: 1px solid #ffccc7;
  border-radius: 8px;
  padding: 15px;
  color: #f5222d;
}

/* 加载中动画 */
.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
}

.loading-container p {
  margin-top: 15px;
  color: #666;
}

.typing-indicator {
  display: flex;
  gap: 5px;
}

.typing-indicator span {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #ccc;
  animation: typing 1.4s infinite ease-in-out;
}

.typing-indicator span:nth-child(1) {
  animation-delay: 0s;
}

.typing-indicator span:nth-child(2) {
  animation-delay: 0.2s;
}

.typing-indicator span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes typing {
  0%, 60%, 100% {
    transform: translateY(0);
    background-color: #ccc;
  }
  30% {
    transform: translateY(-5px);
    background-color: #1890ff;
  }
}

/* 输入区域样式 */
.chat-input-area {
  padding: 15px 20px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
}

.input-container {
  display: flex;
  align-items: flex-end;
  background-color: #f5f7fa;
  border-radius: 12px;
  padding: 10px 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.input-container textarea {
  flex: 1;
  border: none;
  background: transparent;
  resize: none;
  padding: 8px 0;
  font-size: 15px;
  max-height: 150px;
  outline: none;
}

.input-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.send-btn {
  background-color: #1890ff;
  color: #fff;
  border: none;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.3s;
}

.send-btn:hover {
  background-color: #40a9ff;
}

.send-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.input-footer {
  margin-top: 10px;
  text-align: center;
}

.input-footer p {
  font-size: 12px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .sidebar {
    position: absolute;
    height: 100%;
    z-index: 100;
    transform: translateX(0);
    transition: transform 0.3s ease;
  }
  
  .sidebar.collapsed {
    transform: translateX(-100%);
  }
  
  .message-container {
    max-width: 90%;
  }
  
  /* 小屏幕上改为上下布局 */
  .two-column-layout {
    flex-direction: column;
  }
  
  .conclusion-column {
    border-right: none;
    border-bottom: 1px solid #eaeaea;
    padding-right: 0;
    padding-bottom: 20px;
    margin-bottom: 20px;
  }
  
  .structured-column {
    padding-left: 0;
  }
}
</style>