<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

// 当前问题
const currentQuestion = ref('')

// 示例问题
const exampleQuestions = ref([
  '2025年Q3迈阿密三居室的平均每平方英尺价格是多少？',
  '比较纽约和东京的租金回报率',
  '过去5年迈阿密房地产价格趋势如何？',
  '欧洲哪些城市的租金回报率最高？',
  '2026年柏林房价预测是多少？',
  '新加坡对外国人购房有哪些限制政策？',
  '如何评估一个地区的房产投资潜力？',
  '伦敦和巴黎哪个城市的房产升值空间更大？'
])

// 跳转到ChatAI页面
const goToChatAI = (question = '') => {
  router.push({
    path: '/chat-ai',
    query: question ? { q: question } : {}
  })
}

// 滚动到功能区域
const scrollToFeatures = () => {
  document.getElementById('features').scrollIntoView({ 
    behavior: 'smooth' 
  })
}

onMounted(() => {
  // 可以在这里加载初始数据
})
</script>

<template>
  <div class="home-page">
    <!-- 英雄区域 -->
    <section class="hero-section">
      <div class="container">
        <div class="hero-content">
          <div class="hero-logo">
            <i class="fas fa-home logo-icon"></i>
            <span class="logo-text">Global PropAI</span>
          </div>
          <h1>房地产分析工具，助您做出更明智、更快速的决策</h1>
          <p>人工智能驱动的房地产数据分析，包含精准市场评估（CMA）、综合价值比较和定制化市场洞察报告——专为房地产投资者和专业人士打造。</p>
          <div class="hero-buttons">
            <button @click="goToChatAI('')" class="primary-button">开始免费体验</button>
            <button class="secondary-button" @click="scrollToFeatures">了解更多</button>
          </div>
          <div class="search-box">
            <input 
              type="text" 
              placeholder="输入您的房地产问题，获取AI分析结果..." 
              v-model="currentQuestion"
              @keyup.enter="goToChatAI(currentQuestion)"
            >
            <button @click="goToChatAI(currentQuestion)">立即查询</button>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 特色功能区域 -->
    <section class="features-section" id="features">
      <div class="container">
        <h2 class="section-title">核心功能</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-brain"></i>
            </div>
            <h3>人工智能驱动的市场分析</h3>
            <p>利用先进的人工智能技术对房地产市场进行深度分析，提供精准、全面的市场洞察和预测。</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-database"></i>
            </div>
            <h3>全面市场数据覆盖</h3>
            <p>整合全球房地产数据，包括价格趋势、租金回报率、交易量等多维度数据，支持精准决策。</p>
          </div>
          
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-chart-pie"></i>
            </div>
            <h3>深度投资洞察</h3>
            <p>提供专业的投资分析报告，帮助您识别最具潜力的投资机会和最佳入场时机。</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 应用展示区域 -->
    <section class="app-showcase-section">
      <div class="container">
        <h2 class="section-title">观看 Global PropAI 的实际应用</h2>
        <div class="showcase-container">
          <div class="showcase-main">
            <div class="dashboard-placeholder">
              <i class="fas fa-chart-bar dashboard-icon"></i>
              <h3>智能分析仪表盘</h3>
            </div>
            <div class="showcase-overlay">
              <div class="overlay-tag ai-tag">AI 投资洞察</div>
              <div class="overlay-tag market-tag">地区市场聚焦</div>
            </div>
          </div>
          <div class="showcase-thumbnails">
            <div class="thumbnail-item">
              <div class="thumbnail-placeholder">
                <i class="fas fa-robot"></i>
              </div>
              <h4>人工智能助手</h4>
              <p>提供即时的房地产分析，回答您的市场问题，并提供专业投资建议</p>
            </div>
            <div class="thumbnail-item">
              <div class="thumbnail-placeholder">
                <i class="fas fa-file-alt"></i>
              </div>
              <h4>分析报告</h4>
              <p>深入分析各地区房地产市场，提供详细的数据和趋势分析</p>
            </div>
            <div class="thumbnail-item">
              <div class="thumbnail-placeholder">
                <i class="fas fa-balance-scale"></i>
              </div>
              <h4>市场比较</h4>
              <p>对比不同地区的房地产市场指标，发现最佳投资机会</p>
            </div>
            <div class="thumbnail-item">
              <div class="thumbnail-placeholder">
                <i class="fas fa-fire"></i>
              </div>
              <h4>地区热力图</h4>
              <p>直观展示不同地区的房地产指标，帮助您快速识别热点市场</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- AI功能展示区域 -->
    <section class="ai-features-section">
      <div class="container">
        <h2 class="section-title">智能房产顾问</h2>
        <div class="ai-features-grid">
          <div class="ai-feature-card">
            <div class="ai-feature-icon">
              <i class="fas fa-brain"></i>
            </div>
            <h3>智能市场分析</h3>
            <p>基于海量数据分析各地区房产市场趋势，提供专业的市场洞察和投资建议</p>
          </div>
          
          <div class="ai-feature-card">
            <div class="ai-feature-icon">
              <i class="fas fa-calculator"></i>
            </div>
            <h3>投资回报计算</h3>
            <p>精确计算不同地区房产投资的预期回报率、租金收益和增值潜力，辅助投资决策</p>
          </div>
          
          <div class="ai-feature-card">
            <div class="ai-feature-icon">
              <i class="fas fa-file-contract"></i>
            </div>
            <h3>政策法规解读</h3>
            <p>解析各国房产政策、税收法规和购房流程，降低跨国投资风险</p>
          </div>
          
          <div class="ai-feature-card">
            <div class="ai-feature-icon">
              <i class="fas fa-chart-line"></i>
            </div>
            <h3>价格趋势预测</h3>
            <p>运用先进算法预测未来房价走势，帮助投资者把握最佳入市时机</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 用户场景展示区域 -->
    <section class="user-scenarios-section">
      <div class="container">
        <h2 class="section-title">适用场景</h2>
        <div class="scenarios-container">
          <div class="scenario-item">
            <div class="scenario-icon">
              <i class="fas fa-user-tie"></i>
            </div>
            <div class="scenario-content">
              <h3>投资者</h3>
              <p>寻找高回报率投资机会，分析不同市场表现，制定长期投资策略</p>
            </div>
          </div>
          
          <div class="scenario-item">
            <div class="scenario-icon">
              <i class="fas fa-home"></i>
            </div>
            <div class="scenario-content">
              <h3>购房者</h3>
              <p>了解房产价值评估，比较不同地区房价，预测未来升值空间</p>
            </div>
          </div>
          
          <div class="scenario-item">
            <div class="scenario-icon">
              <i class="fas fa-building"></i>
            </div>
            <div class="scenario-content">
              <h3>开发商</h3>
              <p>研究市场需求，评估项目可行性，把握开发时机和定价策略</p>
            </div>
          </div>
          
          <div class="scenario-item">
            <div class="scenario-icon">
              <i class="fas fa-briefcase"></i>
            </div>
            <div class="scenario-content">
              <h3>房产顾问</h3>
              <p>获取专业市场数据，为客户提供更精准的咨询服务和建议</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 客户证言区域 -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">深受投资者和代理商信赖</h2>
        <div class="testimonials-container">
          <div class="testimonial-item">
            <div class="testimonial-quote">
              <i class="fas fa-quote-left"></i>
              <p>"Global PropAI帮助我在全球范围内发现了PRS LLC的最佳投资机会，其数据分析和预测非常准确。"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>张三</h4>
                <p>房地产投资者</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-item">
            <div class="testimonial-quote">
              <i class="fas fa-quote-left"></i>
              <p>"Global PropAI的市场分析功能帮助我们公司在多个城市找到了最具潜力的投资机会。"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>李四</h4>
                <p>房地产开发商</p>
              </div>
            </div>
          </div>
          
          <div class="testimonial-item">
            <div class="testimonial-quote">
              <i class="fas fa-quote-left"></i>
              <p>"AI驱动的分析和预测功能让我对投资决策更有信心。"</p>
            </div>
            <div class="testimonial-author">
              <div class="author-avatar">
                <i class="fas fa-user"></i>
              </div>
              <div class="author-info">
                <h4>王五</h4>
                <p>房地产顾问</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    
    <!-- 常见问题区域 -->
    <section class="faq-section">
      <div class="container">
        <h2 class="section-title">房地产分析工具：常见问题解答</h2>
        <div class="faq-container">
          <div class="faq-item">
            <h3>什么是房地产市场分析工具？</h3>
            <p>房地产市场分析工具是一种使用人工智能和大数据技术对房地产市场进行分析的软件。它可以提供市场评估（CMA）、投资回报分析和市场趋势预测等功能。</p>
          </div>
          
          <div class="faq-item">
            <h3>如何使用房地产市场分析工具进行投资决策？</h3>
            <p>您可以通过输入目标地区、预算和投资偏好等参数，获取定制化的市场分析报告。这些报告包含市场趋势、投资回报率和风险评估等关键指标，帮助您做出更明智的投资决策。</p>
          </div>
          
          <div class="faq-item">
            <h3>Global PropAI提供哪些类型的房地产分析？</h3>
            <p>Global PropAI提供多种类型的房地产分析，包括市场比较分析、投资回报分析、历史趋势分析和未来预测分析等。我们的AI系统可以处理海量数据，并提供精准的分析结果。</p>
          </div>
          
          <div class="faq-item">
            <h3>Global PropAI的AI分析有多准确？</h3>
            <p>Global PropAI的AI分析基于大量的历史数据和先进的机器学习算法。我们的系统会不断学习和优化，以提供更准确的分析结果。然而，房地产市场受多种因素影响，所以我们建议将我们的分析作为决策参考，而非唯一依据。</p>
          </div>
        </div>
      </div>
    </section>
    
    <!-- AI问答示例区域 -->
    <section class="ai-examples-section">
      <div class="container">
        <h2 class="section-title">AI问答示例</h2>
        <div class="examples-list">
          <div 
            v-for="(question, index) in exampleQuestions" 
            :key="index" 
            class="example-item"
            @click="goToChatAI(question)"
          >
            <div class="example-icon">
              <i class="fas fa-question-circle"></i>
            </div>
            <div class="example-text">{{ question }}</div>
          </div>
        </div>
        <div class="try-ai-button">
          <router-link to="/chat-ai" class="btn">尝试AI问答</router-link>
        </div>
      </div>
    </section>
    <!-- 行动号召区域 -->
    <section class="cta-section">
      <div class="container">
        <h2>立即开始使用 Global PropAI 进行探索</h2>
        <p>免费注册并开始使用我们的房地产分析工具，发现最佳投资机会</p>
        <button class="cta-button" @click="goToChatAI('')">免费开始体验</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
.home-page {
  padding-top: 70px; /* 为固定的头部导航留出空间 */
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  text-align: center;
  margin-bottom: 40px;
  font-size: 32px;
  color: #333;
}

/* 英雄区域样式 */
.hero-section {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  padding: 100px 0;
  text-align: center;
}

.hero-logo {
  margin-bottom: 30px;
}

.hero-logo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-icon {
  font-size: 36px;
  color: #fff;
  margin-right: 10px;
}

.logo-text {
  font-size: 32px;
  font-weight: 700;
  color: #fff;
}

.hero-content h1 {
  font-size: 36px;
  margin-bottom: 20px;
  line-height: 1.3;
  max-width: 800px;
  margin-left: auto;
  margin-right: auto;
}

.hero-content p {
  font-size: 18px;
  max-width: 800px;
  margin: 0 auto 30px;
  line-height: 1.6;
}

.hero-buttons {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 40px;
}

.primary-button {
  padding: 15px 30px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.primary-button:hover {
  background-color: #e05e00;
  transform: translateY(-2px);
}

.secondary-button {
  padding: 15px 30px;
  background-color: transparent;
  color: #fff;
  border: 2px solid #fff;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.secondary-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: translateY(-2px);
}

.search-box {
  max-width: 700px;
  margin: 0 auto;
  display: flex;
}

.search-box input {
  flex: 1;
  padding: 15px 20px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.search-box button {
  padding: 15px 30px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-box button:hover {
  background-color: #e05e00;
}

/* 特色功能区域样式 */
.features-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.feature-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 70px;
  height: 70px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.feature-icon i {
  font-size: 30px;
  color: #1890ff;
}

.feature-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
}

/* 应用展示区域样式 */
.app-showcase-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.showcase-container {
  max-width: 1000px;
  margin: 0 auto;
}

.showcase-main {
  position: relative;
  margin-bottom: 40px;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.dashboard-placeholder {
  width: 100%;
  height: 400px;
  background-color: #f0f7ff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
}

.dashboard-icon {
  font-size: 60px;
  color: #1890ff;
  margin-bottom: 20px;
}

.thumbnail-placeholder {
  width: 100%;
  height: 120px;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px 8px 0 0;
}

.thumbnail-placeholder i {
  font-size: 36px;
  color: #1890ff;
}

.showcase-overlay {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
}

.overlay-tag {
  padding: 8px 15px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.ai-tag {
  background-color: #1890ff;
}

.market-tag {
  background-color: #ff6b00;
}

.showcase-thumbnails {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.thumbnail-item {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.thumbnail-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.thumbnail-img {
  width: 100%;
  height: 120px;
  object-fit: cover;
}

.thumbnail-item h4 {
  font-size: 16px;
  margin: 15px 15px 5px;
  color: #333;
}

.thumbnail-item p {
  font-size: 14px;
  margin: 0 15px 15px;
  color: #666;
  line-height: 1.4;
}

/* AI功能展示区域样式 */
.ai-features-section {
  padding: 80px 0;
}

.ai-features-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.ai-feature-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px 20px;
  text-align: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.ai-feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  background-color: #f0f7ff;
}

.ai-feature-icon {
  width: 70px;
  height: 70px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 20px;
}

.ai-feature-icon i {
  font-size: 30px;
  color: #1890ff;
}

.ai-feature-card h3 {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.ai-feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 14px;
}

/* 用户场景展示区域样式 */
.user-scenarios-section {
  padding: 80px 0;
  background-color: #f9f9f9;
}

.scenarios-container {
  max-width: 900px;
  margin: 0 auto;
}

.scenario-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.scenario-item:hover {
  transform: translateX(5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.scenario-icon {
  width: 60px;
  height: 60px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
  flex-shrink: 0;
}

.scenario-icon i {
  font-size: 24px;
  color: #1890ff;
}

.scenario-content h3 {
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
}

.scenario-content p {
  color: #666;
  line-height: 1.6;
  margin: 0;
}

/* 客户证言区域样式 */
.testimonials-section {
  padding: 80px 0;
  background-color: #f0f7ff;
}

.testimonials-container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  max-width: 1000px;
  margin: 0 auto;
}

.testimonial-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.testimonial-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}

.testimonial-quote {
  margin-bottom: 20px;
}

.testimonial-quote i {
  font-size: 24px;
  color: #1890ff;
  margin-bottom: 10px;
  display: block;
}

.testimonial-quote p {
  font-size: 16px;
  line-height: 1.6;
  color: #333;
  font-style: italic;
}

.testimonial-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
  background-color: #f0f7ff;
  display: flex;
  justify-content: center;
  align-items: center;
}

.author-avatar i {
  font-size: 24px;
  color: #1890ff;
}

.author-info h4 {
  font-size: 16px;
  margin: 0 0 5px;
  color: #333;
}

.author-info p {
  font-size: 14px;
  margin: 0;
  color: #666;
}

/* 常见问题区域样式 */
.faq-section {
  padding: 80px 0;
}

.faq-container {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: #fff;
  border-radius: 8px;
  padding: 25px;
  margin-bottom: 20px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
}

.faq-item:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.faq-item h3 {
  font-size: 18px;
  margin: 0 0 15px;
  color: #333;
}

.faq-item p {
  font-size: 16px;
  line-height: 1.6;
  color: #666;
  margin: 0;
}

.view-all-button {
  text-align: center;
  margin-top: 40px;
}

.btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: #1890ff;
  color: #fff;
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: #40a9ff;
}

/* AI问答示例区域样式 */
.ai-examples-section {
  padding: 80px 0;
}

.examples-list {
  max-width: 800px;
  margin: 0 auto;
}

.example-item {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.example-item:hover {
  transform: translateX(5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.example-icon {
  margin-right: 15px;
  color: #1890ff;
  font-size: 24px;
}

.example-text {
  font-size: 16px;
  color: #333;
}

.try-ai-button {
  text-align: center;
  margin-top: 40px;
}

/* 行动号召区域样式 */
.cta-section {
  padding: 80px 0;
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  color: #fff;
  text-align: center;
}

.cta-section h2 {
  font-size: 32px;
  margin-bottom: 20px;
}

.cta-section p {
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 30px;
}

.cta-button {
  padding: 15px 40px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.cta-button:hover {
  background-color: #e05e00;
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

/* 响应式设计 */
@media (max-width: 992px) {
  .features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .ai-features-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .showcase-thumbnails {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .testimonials-container {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
    gap: 15px;
  }
}

@media (max-width: 768px) {
  .hero-content h1 {
    font-size: 28px;
  }
  
  .hero-content p {
    font-size: 16px;
  }
  
  .search-box {
    flex-direction: column;
  }
  
  .search-box input {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .search-box button {
    border-radius: 4px;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .scenario-item {
    flex-direction: column;
    text-align: center;
  }
  
  .scenario-icon {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .testimonials-container {
    grid-template-columns: 1fr;
  }
  
  .cta-section h2 {
    font-size: 26px;
  }
  
  .cta-section p {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .ai-features-grid {
    grid-template-columns: 1fr;
  }
  
  .example-item {
    padding: 15px;
  }
  
  .example-text {
    font-size: 14px;
  }
  
  .showcase-thumbnails {
    grid-template-columns: 1fr;
  }
  
  .hero-content h1 {
    font-size: 24px;
  }
  
  .logo-image {
    height: 40px;
  }
  
  .primary-button, .secondary-button, .cta-button {
    width: 100%;
    padding: 12px 20px;
    font-size: 16px;
  }
}
</style>