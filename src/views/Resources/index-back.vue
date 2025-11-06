<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

// 资源类型
const resourceTypes = ref([
  {
    id: 'blog',
    name: '房产博客',
    icon: 'blog',
    description: '最新房地产市场趋势、投资策略和专家观点',
    path: '/resources/blog'
  },
  {
    id: 'faq',
    name: '常见问题',
    icon: 'question',
    description: '关于房地产投资、市场分析和平台使用的常见问题解答',
    path: '/resources/faq'
  },
  {
    id: 'glossary',
    name: '术语表',
    icon: 'book',
    description: '房地产行业专业术语解释和定义',
    path: '/resources/glossary'
  }
])

// 跳转到对应资源页面
const goToResource = (path) => {
  router.push(path)
}
</script>

<template>
  <div class="resources-page">
    <div class="container">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="page-title">房地产资源中心</h1>
          <p class="hero-description">
            探索我们丰富的房地产资源，包括市场分析博客、常见问题解答和专业术语表，
            帮助您更好地了解全球房地产市场并做出明智的投资决策。
          </p>
        </div>
      </section>
      
      <section class="resource-types-section">
        <div class="resource-types-grid">
          <div 
            v-for="type in resourceTypes" 
            :key="type.id" 
            class="resource-type-card"
            @click="goToResource(type.path)"
          >
            <div class="resource-icon">
              <i :class="'fas fa-' + type.icon"></i>
            </div>
            <h2 class="resource-title">{{ type.name }}</h2>
            <p class="resource-description">{{ type.description }}</p>
            <div class="resource-action">
              <span>浏览</span>
              <i class="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>
      </section>
      
      <section class="featured-resources-section">
        <h2 class="section-title">精选资源</h2>
        <div class="featured-resources-grid">
          <div class="featured-resource-card">
            <div class="resource-image">
              <img src="https://picsum.photos/id/1015/600/400" alt="全球房地产市场2025年展望">
            </div>
            <div class="resource-content">
              <span class="resource-tag">市场报告</span>
              <h3 class="resource-title">全球房地产市场2025年展望</h3>
              <p class="resource-excerpt">
                本报告深入分析了全球主要城市的房地产市场趋势，预测未来一年的发展方向和投资机会。
              </p>
              <div class="resource-meta">
                <span class="resource-date">2025-10-15</span>
                <button class="resource-btn">阅读报告</button>
              </div>
            </div>
          </div>
          
          <div class="featured-resource-card">
            <div class="resource-image">
              <img src="https://picsum.photos/id/1016/600/400" alt="房地产投资入门指南">
            </div>
            <div class="resource-content">
              <span class="resource-tag">投资指南</span>
              <h3 class="resource-title">房地产投资入门指南</h3>
              <p class="resource-excerpt">
                为初次接触房地产投资的投资者提供全面的入门知识，包括市场分析、风险评估和投资策略。
              </p>
              <div class="resource-meta">
                <span class="resource-date">2025-09-28</span>
                <button class="resource-btn">阅读指南</button>
              </div>
            </div>
          </div>
          
          <div class="featured-resource-card">
            <div class="resource-image">
              <img src="https://picsum.photos/id/1018/600/400" alt="房地产税务规划策略">
            </div>
            <div class="resource-content">
              <span class="resource-tag">税务指南</span>
              <h3 class="resource-title">房地产税务规划策略</h3>
              <p class="resource-excerpt">
                探讨全球主要国家和地区的房地产税收政策，以及如何进行有效的税务规划以优化投资回报。
              </p>
              <div class="resource-meta">
                <span class="resource-date">2025-08-15</span>
                <button class="resource-btn">阅读指南</button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section class="newsletter-section">
        <div class="newsletter-container">
          <div class="newsletter-content">
            <h2>订阅我们的房地产市场洞察</h2>
            <p>
              定期获取最新的市场分析、投资机会和专家观点，
              帮助您在全球房地产市场中做出明智决策。
            </p>
          </div>
          <div class="newsletter-form">
            <input type="email" placeholder="输入您的电子邮箱" class="newsletter-input">
            <button class="newsletter-btn">订阅</button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.resources-page {
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
  padding: 80px 0;
  border-radius: 12px;
  margin-bottom: 60px;
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
}

/* 资源类型区域 */
.resource-types-section {
  margin-bottom: 60px;
}

.resource-types-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.resource-type-card {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.resource-type-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.resource-icon {
  width: 70px;
  height: 70px;
  background-color: #e6f7ff;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 20px;
}

.resource-icon i {
  font-size: 30px;
  color: #1890ff;
}

.resource-title {
  font-size: 20px;
  margin-bottom: 15px;
  color: #333;
}

.resource-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 20px;
}

.resource-action {
  display: flex;
  align-items: center;
  color: #1890ff;
  font-weight: 600;
}

.resource-action i {
  margin-left: 10px;
  transition: transform 0.3s;
}

.resource-type-card:hover .resource-action i {
  transform: translateX(5px);
}

/* 精选资源区域 */
.featured-resources-section {
  margin-bottom: 60px;
}

.section-title {
  font-size: 28px;
  margin-bottom: 30px;
  text-align: center;
  color: #333;
}

.featured-resources-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.featured-resource-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.featured-resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.resource-image {
  height: 200px;
  overflow: hidden;
}

.resource-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.featured-resource-card:hover .resource-image img {
  transform: scale(1.05);
}

.resource-content {
  padding: 20px;
}

.resource-tag {
  display: inline-block;
  padding: 5px 10px;
  background-color: #e6f7ff;
  color: #1890ff;
  font-size: 12px;
  border-radius: 4px;
  margin-bottom: 15px;
}

.resource-content .resource-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.resource-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  height: 67px;
  overflow: hidden;
}

.resource-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.resource-date {
  font-size: 12px;
  color: #999;
}

.resource-btn {
  background-color: transparent;
  border: 1px solid #1890ff;
  color: #1890ff;
  padding: 6px 12px;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.resource-btn:hover {
  background-color: #1890ff;
  color: #fff;
}

/* 订阅区域 */
.newsletter-section {
  margin-bottom: 60px;
}

.newsletter-container {
  background: linear-gradient(135deg, #1890ff 0%, #096dd9 100%);
  border-radius: 12px;
  padding: 50px;
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.newsletter-content {
  max-width: 500px;
}

.newsletter-content h2 {
  font-size: 24px;
  margin-bottom: 15px;
}

.newsletter-content p {
  font-size: 16px;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  min-width: 400px;
}

.newsletter-input {
  flex: 1;
  padding: 12px 15px;
  border: none;
  border-radius: 4px 0 0 4px;
  font-size: 16px;
}

.newsletter-input:focus {
  outline: none;
}

.newsletter-btn {
  padding: 12px 20px;
  background-color: #ff6b00;
  color: #fff;
  border: none;
  border-radius: 0 4px 4px 0;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-btn:hover {
  background-color: #e05e00;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .resource-types-grid,
  .featured-resources-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .newsletter-container {
    flex-direction: column;
    text-align: center;
  }
  
  .newsletter-content {
    margin-bottom: 20px;
  }
  
  .newsletter-form {
    width: 100%;
    min-width: auto;
  }
}

@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }
  
  .page-title {
    font-size: 28px;
  }
  
  .hero-description {
    font-size: 16px;
  }
}

@media (max-width: 576px) {
  .resource-types-grid,
  .featured-resources-grid {
    grid-template-columns: 1fr;
  }
  
  .newsletter-form {
    flex-direction: column;
  }
  
  .newsletter-input {
    border-radius: 4px;
    margin-bottom: 10px;
  }
  
  .newsletter-btn {
    border-radius: 4px;
    width: 100%;
  }
}
</style>
