<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// FAQ分类
const faqCategories = ref([
  { id: 'general', name: '一般问题' },
  { id: 'platform', name: '平台使用' },
  { id: 'investment', name: '投资策略' },
  { id: 'market', name: '市场分析' },
  { id: 'legal', name: '法律法规' },
  { id: 'account', name: '账户管理' }
])

// 当前选中的分类
const selectedCategory = ref('general')

// 切换分类
const changeCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// FAQ列表
const faqList = ref([
  // 一般问题
  {
    id: 1,
    category: 'general',
    question: 'Global PropAI是什么？',
    answer: 'Global PropAI是一个基于人工智能的房地产数据分析平台，为投资者、购房者和房地产专业人士提供全球房地产市场的数据分析、趋势预测和投资建议。我们利用先进的AI技术和大数据分析，帮助用户做出更明智的房地产投资决策。'
  },
  {
    id: 2,
    category: 'general',
    question: 'Global PropAI提供哪些核心功能？',
    answer: 'Global PropAI提供多种核心功能，包括：1) AI驱动的市场分析，提供房价趋势、租金回报率和市场预测；2) 全球市场数据覆盖，包括主要城市和新兴市场；3) 个性化投资建议，基于用户偏好和风险承受能力；4) 互动式数据可视化，直观展示市场趋势和比较；5) 房产估值工具，评估特定房产的当前价值和未来潜力。'
  },
  {
    id: 3,
    category: 'general',
    question: 'Global PropAI的数据来源是什么？',
    answer: 'Global PropAI的数据来自多种可靠来源，包括：官方房地产交易记录、政府统计数据、合作伙伴提供的市场数据、公开的房地产上市信息、经济指标和人口统计数据等。我们的AI系统会不断收集、清洗和分析这些数据，确保为用户提供最准确、最及时的市场洞察。'
  },
  {
    id: 4,
    category: 'general',
    question: 'Global PropAI的数据更新频率是多少？',
    answer: '我们的数据更新频率因数据类型和地区而异。主要城市的房价指数和市场趋势通常每月更新一次，租金数据每季度更新，经济指标和政策变化则实时更新。我们的AI系统会持续监控市场变化，确保用户能够获取最新的市场信息。'
  },
  
  // 平台使用
  {
    id: 5,
    category: 'platform',
    question: '如何开始使用Global PropAI？',
    answer: '开始使用Global PropAI非常简单：1) 在首页注册一个账户；2) 完成简短的投资偏好问卷，帮助我们了解您的需求；3) 探索平台功能，包括市场分析、投资机会和AI问答；4) 根据您的兴趣设置市场监控和提醒。我们还提供新用户指南和视频教程，帮助您快速熟悉平台功能。'
  },
  {
    id: 6,
    category: 'platform',
    question: '如何使用AI问答功能？',
    answer: '使用AI问答功能很简单：1) 导航到"AI问答"页面；2) 在输入框中输入您的房地产相关问题，例如"2025年迈阿密房价预测"或"比较纽约和伦敦的租金回报率"；3) 点击提交按钮，AI将分析相关数据并生成回答；4) 您可以根据回答提出后续问题，进行深入对话。AI问答支持多语言，并可以生成图表和数据可视化。'
  },
  {
    id: 7,
    category: 'platform',
    question: '如何保存和导出分析报告？',
    answer: '保存和导出分析报告的步骤如下：1) 在查看任何分析报告或图表时，点击右上角的"保存"按钮将其添加到您的收藏夹；2) 要导出报告，点击"导出"按钮，选择您需要的格式（PDF、Excel或CSV）；3) 在用户仪表盘的"我的报告"部分，您可以查看和管理所有保存的报告；4) 高级用户可以创建定制报告，选择特定数据点和图表组合。'
  },
  {
    id: 8,
    category: 'platform',
    question: '平台支持哪些语言？',
    answer: '目前，Global PropAI支持以下语言：英语、中文（简体和繁体）、日语、西班牙语、法语和德语。我们的AI系统能够理解和回答这些语言的问题，并提供相应语言的分析报告和市场洞察。我们计划在未来增加更多语言支持，以服务全球更广泛的用户群体。'
  },
  
  // 投资策略
  {
    id: 9,
    category: 'investment',
    question: '如何评估房地产投资的风险？',
    answer: '评估房地产投资风险需要考虑多个因素：1) 市场风险：分析市场周期、供需平衡和价格波动历史；2) 流动性风险：考虑资产的变现能力和市场活跃度；3) 财务风险：评估融资成本、现金流和杠杆水平；4) 政策风险：了解税收政策、外国投资限制和租赁法规；5) 位置风险：考虑区域经济状况、就业增长和基础设施发展。Global PropAI提供风险评分工具，帮助投资者全面评估这些风险因素。'
  },
  {
    id: 10,
    category: 'investment',
    question: '如何确定最佳的房地产投资地点？',
    answer: '确定最佳投资地点应考虑以下因素：1) 经济基本面：就业增长、产业多样性和收入水平；2) 人口趋势：人口增长、迁入率和人口结构；3) 房地产市场指标：价格趋势、租金回报率和空置率；4) 基础设施发展：交通便利性、公共设施和城市规划；5) 政策环境：税收优惠、投资激励和法规限制。Global PropAI的"投资机会雷达"功能可以根据这些因素自动识别高潜力地区。'
  },
  {
    id: 11,
    category: 'investment',
    question: '什么是租金回报率，如何计算？',
    answer: '租金回报率（Rental Yield）是衡量房地产投资回报的重要指标，表示年租金收入占房产价值的百分比。计算方法如下：总租金回报率 = (年租金收入 ÷ 房产价值) × 100%。例如，如果一处价值50万美元的房产年租金收入为2.5万美元，则租金回报率为5%。需要注意的是，净租金回报率会扣除物业管理费、维护成本、税费等支出，更准确地反映实际投资回报。'
  },
  {
    id: 12,
    category: 'investment',
    question: '如何分散房地产投资组合？',
    answer: '分散房地产投资组合的策略包括：1) 地理分散：投资不同国家、城市或区域的房产，降低单一市场风险；2) 资产类型分散：组合住宅、商业、工业和零售等不同类型的房产；3) 风险级别分散：平衡核心资产（稳定收益）和机会型资产（高增长潜力）；4) 投资方式分散：直接购买房产、REITs、房地产基金或众筹平台；5) 时间分散：分阶段投资，避免在单一时点投入全部资金。Global PropAI的投资组合分析工具可以评估您当前的分散度并提供优化建议。'
  },
  
  // 市场分析
  {
    id: 13,
    category: 'market',
    question: '如何解读房价趋势图？',
    answer: '解读房价趋势图需要关注以下要点：1) 长期趋势：观察5-10年的价格走势，识别长期增长或下降趋势；2) 季节性波动：许多市场有季节性模式，如春季通常活跃，冬季较为平静；3) 价格加速度：关注价格变化的速度是加快还是减缓，可能预示市场转折点；4) 与基准的比较：将特定市场与更广泛的区域或国家趋势进行比较；5) 成交量：价格变动应与成交量一起分析，低成交量的价格变动可能不具可持续性。Global PropAI的趋势分析工具提供这些指标的综合视图。'
  },
  {
    id: 14,
    category: 'market',
    question: '什么因素会影响房地产价格？',
    answer: '影响房地产价格的主要因素包括：1) 经济因素：GDP增长、就业率、收入水平和通货膨胀；2) 人口因素：人口增长、迁移模式、家庭形成率和人口结构；3) 供需动态：新房供应、库存水平和购买需求；4) 融资环境：利率水平、贷款可得性和融资条件；5) 政策因素：税收政策、外国投资规定和住房补贴；6) 区位因素：基础设施发展、学校质量和生活便利性；7) 全球事件：疫情、金融危机和地缘政治变化。Global PropAI的价格影响因子分析可以量化这些因素的相对重要性。'
  },
  {
    id: 15,
    category: 'market',
    question: '如何预测未来的房价走势？',
    answer: '预测房价走势需要综合分析多种指标：1) 经济预测：GDP增长、就业和收入趋势；2) 供需平衡：建筑许可、开工率和库存水平；3) 人口趋势：人口增长预测和迁移模式；4) 负担能力指标：房价收入比和月供收入比；5) 市场情绪：成交周期和挂牌价格变动；6) 政策变化：预期的税收和监管变化。Global PropAI使用机器学习模型分析这些因素，提供短期（1年）、中期（3年）和长期（5-10年）的价格预测，并明确说明预测的置信区间和潜在风险因素。'
  },
  {
    id: 16,
    category: 'market',
    question: '如何比较不同城市的房地产市场？',
    answer: '比较不同城市的房地产市场应考虑以下指标：1) 价格指标：中位数房价、每平方米价格和价格增长率；2) 回报指标：租金回报率、资本增值和总回报率；3) 负担能力：房价收入比、租金负担比例；4) 市场活跃度：成交量、平均销售周期和库存水平；5) 经济基本面：就业增长、产业多样性和收入水平；6) 人口动态：人口增长率、净迁入率和人口结构。Global PropAI的城市比较工具允许用户选择这些指标进行并排比较，生成直观的对比图表和综合评分。'
  },
  
  // 法律法规
  {
    id: 17,
    category: 'legal',
    question: '外国人在不同国家购买房产有哪些限制？',
    answer: '外国人购房限制因国家而异：1) 美国：大部分地区无限制，但需报告投资并考虑特殊税务要求；2) 加拿大：部分省份对非居民征收额外购房税（如BC省20%，安大略省15%）；3) 澳大利亚：外国人只能购买新建房产，需获得外国投资审查委员会批准；4) 新加坡：外国人可购买公寓，但购买土地或独立屋需获批准，并缴纳额外15-30%购房税；5) 中国：外国人需证明在华工作或学习满一年，且仅限购买一套自住房产；6) 日本：无明显限制，但可能面临融资困难。Global PropAI的"全球购房指南"提供各国最新政策和程序的详细信息。'
  },
  {
    id: 18,
    category: 'legal',
    question: '什么是房产尽职调查，包括哪些内容？',
    answer: '房产尽职调查是购买前的全面调查，通常包括：1) 法律尽调：产权验证、产权负担查询、边界确认和规划许可检查；2) 财务尽调：价格合理性评估、税务影响分析和未来维护成本估算；3) 物理尽调：房屋状况检查、结构评估和潜在缺陷识别；4) 环境尽调：污染风险、洪水风险和其他环境危害评估；5) 区域尽调：周边发展规划、基础设施项目和社区状况评估。不同国家的尽职调查程序和要求各不相同，Global PropAI的"购房检查清单"工具可以根据特定国家和房产类型生成定制化的尽职调查清单。'
  },
  {
    id: 19,
    category: 'legal',
    question: '不同国家的房产税制有何差异？',
    answer: '各国房产税制差异显著：1) 美国：房产税由地方政府征收，通常为房产价值的0.5-2.5%，各州各县差异大；2) 英国：采用分级印花税，税率随房价上升（0-12%），非居民额外征收2%；3) 加拿大：年度房产税约为评估价值的0.5-2.5%，部分地区对空置房和外国买家征收额外税费；4) 澳大利亚：各州征收印花税（约4-7%），外国买家附加税（7-8%），部分州有土地税；5) 新加坡：公民首套房印花税低至0%，外国人最高可达30%，还有额外买家印花税和卖家印花税；6) 中国：多种税费包括契税、增值税、个人所得税等，正在试点房产税。Global PropAI的"税务计算器"可以模拟不同国家的税务成本。'
  },
  {
    id: 20,
    category: 'legal',
    question: '如何处理跨国房产投资的税务问题？',
    answer: '处理跨国房产税务需要考虑以下方面：1) 双重征税：了解投资国和居住国之间的税收协定，避免双重征税；2) 税务申报：在两国正确申报房产收入和资本利得；3) 税务规划：考虑设立合适的投资结构（个人持有、公司、信托等）；4) 汇款税务：了解跨境资金转移的税务影响；5) 遗产规划：考虑不同国家的遗产税和继承法规。建议咨询专业的国际税务顾问，Global PropAI的"税务专家网络"可以帮助您联系特定国家的税务专家。我们的平台也提供基本的跨国税务指南，但这不能替代专业税务建议。'
  },
  
  // 账户管理
  {
    id: 21,
    category: 'account',
    question: '如何升级到高级会员？',
    answer: '升级到高级会员的步骤：1) 登录您的Global PropAI账户；2) 点击右上角的用户头像，选择"会员升级"；3) 浏览不同的会员级别（基础、专业、企业）及其功能；4) 选择适合您需求的会员级别和付款周期（月付或年付）；5) 填写付款信息并确认订阅。高级会员可享受更深入的市场分析、更多的数据导出配额、专属报告和优先客户支持。我们提供14天的高级会员试用期，您可以在付费前体验所有功能。'
  },
  {
    id: 22,
    category: 'account',
    question: '如何管理我的订阅和付款方式？',
    answer: '管理订阅和付款方式的步骤：1) 登录账户后，点击用户头像，选择"账户设置"；2) 导航至"订阅与付款"部分；3) 在这里，您可以查看当前订阅状态、更改会员级别、更新付款信息或取消自动续费；4) 要更改付款方式，点击"编辑付款方式"，输入新的信用卡或PayPal信息；5) 所有付款历史和发票也可在此页面查看和下载。如需取消订阅，请至少在下一个计费周期前3天操作，以避免自动续费。'
  },
  {
    id: 23,
    category: 'account',
    question: '如何保护我的账户安全？',
    answer: '保护账户安全的最佳实践：1) 启用双因素认证（2FA）：在账户设置中开启此功能，每次登录时需要输入手机验证码；2) 使用强密码：创建包含字母、数字和特殊字符的复杂密码，定期更换；3) 监控账户活动：定期检查账户活动日志，发现可疑活动立即报告；4) 保持设备安全：确保您的设备有最新的安全更新和防病毒软件；5) 警惕钓鱼：Global PropAI不会通过电子邮件要求您提供密码，对可疑邮件保持警惕。如发现账户被未授权访问，请立即联系我们的安全团队。'
  },
  {
    id: 24,
    category: 'account',
    question: '如何删除我的账户和数据？',
    answer: '删除账户和数据的流程：1) 登录账户，进入"账户设置"；2) 滚动到页面底部，找到"账户删除"部分；3) 点击"请求删除账户"按钮；4) 选择您想要删除的数据范围（可选择保留某些分析报告或完全删除所有数据）；5) 确认您的身份，可能需要输入密码或验证码；6) 提交请求后，您将收到确认电子邮件，需要点击邮件中的链接最终确认删除。请注意，账户删除是不可逆的，所有数据将在30天内从我们的系统中永久删除。根据适用的数据保护法规，某些信息可能需要保留更长时间。'
  }
])

// 根据当前分类筛选FAQ
const filteredFAQs = computed(() => {
  return faqList.value.filter(faq => faq.category === selectedCategory.value)
})

// 搜索功能
const searchQuery = ref('')
const searchResults = computed(() => {
  if (!searchQuery.value.trim()) return []
  
  const query = searchQuery.value.toLowerCase()
  return faqList.value.filter(faq => 
    faq.question.toLowerCase().includes(query) || 
    faq.answer.toLowerCase().includes(query)
  )
})

// 展开/折叠状态
const expandedFAQs = ref({})

// 切换展开/折叠状态
const toggleFAQ = (faqId) => {
  expandedFAQs.value[faqId] = !expandedFAQs.value[faqId]
}

// 检查是否展开
const isExpanded = (faqId) => {
  return !!expandedFAQs.value[faqId]
}

// 常见搜索词
const popularSearchTerms = ref([
  '投资回报', '外国人购房', '税务', '市场预测', '账户安全', '数据来源', '风险评估'
])

// 使用搜索词
const useSearchTerm = (term) => {
  searchQuery.value = term
}
</script>

<template>
  <div class="faq-page">
    <div class="container">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="page-title">常见问题解答</h1>
          <p class="hero-description">
            查找关于Global PropAI平台、房地产投资和市场分析的常见问题解答。
            如果您没有找到所需信息，请随时联系我们的客户支持团队。
          </p>
          
          <div class="search-container">
            <div class="search-box">
              <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="搜索问题或关键词..."
                class="search-input"
              >
              <button class="search-btn">
                <i class="fas fa-search"></i>
              </button>
            </div>
            
            <div class="popular-searches">
              <span class="popular-label">热门搜索：</span>
              <div class="search-terms">
                <span 
                  v-for="(term, index) in popularSearchTerms" 
                  :key="index"
                  class="search-term"
                  @click="useSearchTerm(term)"
                >
                  {{ term }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 搜索结果 -->
      <section v-if="searchQuery.trim() && searchResults.length > 0" class="search-results-section">
        <div class="section-header">
          <h2 class="section-title">搜索结果</h2>
          <button class="clear-search" @click="searchQuery = ''">
            <i class="fas fa-times"></i> 清除搜索
          </button>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="faq in searchResults" 
            :key="faq.id"
            class="faq-item"
            :class="{ 'expanded': isExpanded(faq.id) }"
          >
            <div class="faq-question" @click="toggleFAQ(faq.id)">
              <h3>{{ faq.question }}</h3>
              <div class="faq-icon">
                <i :class="isExpanded(faq.id) ? 'fas fa-minus' : 'fas fa-plus'"></i>
              </div>
            </div>
            <div v-if="isExpanded(faq.id)" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 无搜索结果提示 -->
      <section v-else-if="searchQuery.trim() && searchResults.length === 0" class="no-results-section">
        <div class="no-results-container">
          <div class="no-results-icon">
            <i class="fas fa-search"></i>
          </div>
          <h2>未找到匹配的结果</h2>
          <p>抱歉，我们没有找到与"{{ searchQuery }}"相关的问题。请尝试其他关键词或浏览下方的常见问题分类。</p>
          <button class="clear-search" @click="searchQuery = ''">
            清除搜索
          </button>
        </div>
      </section>
      
      <!-- FAQ分类和列表 -->
      <section v-else class="faq-content-section">
        <div class="faq-categories">
          <button 
            v-for="category in faqCategories" 
            :key="category.id"
            class="category-btn"
            :class="{ 'active': selectedCategory === category.id }"
            @click="changeCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>
        
        <div class="faq-list">
          <div 
            v-for="faq in filteredFAQs" 
            :key="faq.id"
            class="faq-item"
            :class="{ 'expanded': isExpanded(faq.id) }"
          >
            <div class="faq-question" @click="toggleFAQ(faq.id)">
              <h3>{{ faq.question }}</h3>
              <div class="faq-icon">
                <i :class="isExpanded(faq.id) ? 'fas fa-minus' : 'fas fa-plus'"></i>
              </div>
            </div>
            <div v-if="isExpanded(faq.id)" class="faq-answer">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- 联系支持 -->
      <section class="contact-support-section">
        <div class="contact-container">
          <div class="contact-content">
            <h2>没有找到您的问题？</h2>
            <p>我们的客户支持团队随时准备帮助您解决任何问题或疑虑。</p>
          </div>
          <div class="contact-actions">
            <button class="contact-btn primary-btn">
              <i class="fas fa-headset"></i> 联系客服
            </button>
            <button class="contact-btn secondary-btn">
              <i class="fas fa-envelope"></i> 发送邮件
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.faq-page {
  padding-top: 70px;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 英雄区域 */
.hero-section {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  padding: 60px 0;
  border-radius: 12px;
  margin-bottom: 40px;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.page-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.hero-description {
  font-size: 18px;
  line-height: 1.6;
  margin-bottom: 30px;
}

/* 搜索区域 */
.search-container {
  max-width: 600px;
  margin: 0 auto;
}

.search-box {
  display: flex;
  margin-bottom: 15px;
}

.search-input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 8px 0 0 8px;
  font-size: 16px;
}

.search-input:focus {
  outline: none;
}

.search-btn {
  padding: 0 20px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 0 8px 8px 0;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-btn:hover {
  background-color: #e05e00;
}

.popular-searches {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
}

.popular-label {
  color: rgba(255, 255, 255, 0.8);
}

.search-terms {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.search-term {
  padding: 5px 10px;
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-term:hover {
  background-color: rgba(255, 255, 255, 0.3);
}

/* 搜索结果区域 */
.search-results-section {
  margin-bottom: 40px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.section-title {
  font-size: 24px;
  color: #333;
}

.clear-search {
  background: none;
  border: none;
  color: #1890ff;
  font-size: 16px;
  cursor: pointer;
  transition: color 0.3s;
}

.clear-search:hover {
  color: #40a9ff;
}

.clear-search i {
  margin-right: 5px;
}

/* 无搜索结果 */
.no-results-section {
  margin-bottom: 40px;
}

.no-results-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.no-results-icon {
  font-size: 60px;
  color: #ccc;
  margin-bottom: 20px;
}

.no-results-container h2 {
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
}

.no-results-container p {
  font-size: 16px;
  color: #666;
  margin-bottom: 20px;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.no-results-container .clear-search {
  padding: 10px 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.no-results-container .clear-search:hover {
  background-color: #40a9ff;
}

/* FAQ内容区域 */
.faq-content-section {
  margin-bottom: 60px;
}

.faq-categories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 30px;
}

.category-btn {
  padding: 10px 20px;
  background-color: #f5f5f5;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.category-btn:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.category-btn.active {
  background-color: #1890ff;
  color: #fff;
}

.faq-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.faq-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s;
}

.faq-item.expanded {
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.faq-question {
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
}

.faq-question h3 {
  font-size: 18px;
  color: #333;
  margin: 0;
}

.faq-icon {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #1890ff;
  transition: transform 0.3s;
}

.faq-item.expanded .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  padding: 0 20px 20px;
  border-top: 1px solid #f5f5f5;
}

.faq-answer p {
  font-size: 16px;
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 联系支持区域 */
.contact-support-section {
  margin-bottom: 40px;
}

.contact-container {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 12px;
  padding: 40px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.contact-content h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

.contact-content p {
  font-size: 16px;
  max-width: 500px;
}

.contact-actions {
  display: flex;
  gap: 15px;
}

.contact-btn {
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
}

.contact-btn i {
  margin-right: 10px;
}

.primary-btn {
  background-color: #ff6b00;
  color: #fff;
  border: none;
}

.primary-btn:hover {
  background-color: #e05e00;
}

.secondary-btn {
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
}

.secondary-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .contact-container {
    flex-direction: column;
    text-align: center;
  }
  
  .contact-content {
    margin-bottom: 20px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .hero-description {
    font-size: 16px;
  }
  
  .faq-question {
    padding: 15px;
  }
  
  .faq-question h3 {
    font-size: 16px;
  }
  
  .contact-actions {
    flex-direction: column;
    width: 100%;
  }
}

@media (max-width: 576px) {
  .search-box {
    flex-direction: column;
  }
  
  .search-input {
    border-radius: 8px;
    margin-bottom: 10px;
  }
  
  .search-btn {
    border-radius: 8px;
    width: 100%;
    padding: 10px;
  }
  
  .popular-searches {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .section-title {
    margin-bottom: 10px;
  }
}
</style>
