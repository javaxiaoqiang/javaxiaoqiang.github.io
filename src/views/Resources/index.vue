<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

// 其他资源类型
const otherResourceTypes = ref([
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

// 博客文章列表
const blogPosts = ref([
  {
    id: 1,
    title: '2025年全球房地产市场趋势分析',
    excerpt: '本文深入分析了2025年全球房地产市场的主要趋势，包括价格走势、投资热点区域和新兴市场机会。我们的专家团队基于大量数据和市场调研，为投资者提供了详细的市场洞察和投资建议。',
    image: 'https://picsum.photos/id/1015/800/450',
    author: '张明',
    authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    date: '2025-10-25',
    category: '市场分析',
    tags: ['全球市场', '投资趋势', '市场预测'],
    readTime: '8分钟'
  },
  {
    id: 2,
    title: '如何评估海外房产投资风险',
    excerpt: '海外房产投资充满机遇，但同时也伴随着各种风险。本文详细介绍了评估海外房产投资风险的方法和工具，包括政治风险、货币风险、法律风险和市场风险等方面的分析框架，帮助投资者做出更明智的决策。',
    image: 'https://picsum.photos/id/1016/800/450',
    author: '李华',
    authorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    date: '2025-10-18',
    category: '投资策略',
    tags: ['风险管理', '海外投资', '尽职调查'],
    readTime: '10分钟'
  },
  {
    id: 3,
    title: '数字化转型如何重塑房地产行业',
    excerpt: '数字技术正在深刻改变房地产行业的运营模式和客户体验。从虚拟看房到区块链交易，从AI驱动的市场分析到智能建筑管理，本文探讨了数字化转型对房地产行业各环节的影响，以及行业参与者应如何应对这一变革。',
    image: 'https://picsum.photos/id/1018/800/450',
    author: '王强',
    authorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    date: '2025-10-12',
    category: '行业趋势',
    tags: ['数字化', '科技创新', '行业变革'],
    readTime: '7分钟'
  },
  {
    id: 4,
    title: '亚洲新兴市场房地产投资机会',
    excerpt: '亚洲新兴市场正成为全球房地产投资者关注的焦点。本文分析了越南、印度尼西亚、菲律宾等亚洲新兴市场的房地产投资环境、政策变化和市场前景，并提供了针对不同市场的投资策略建议。',
    image: 'https://picsum.photos/id/1019/800/450',
    author: '陈静',
    authorAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    date: '2025-10-05',
    category: '市场分析',
    tags: ['亚洲市场', '新兴市场', '投资机会'],
    readTime: '9分钟'
  }
])

// 博客分类
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'market-analysis', name: '市场分析' },
  { id: 'investment-strategy', name: '投资策略' },
  { id: 'industry-trends', name: '行业趋势' }
])

// 当前选中的分类
const selectedCategory = ref('all')

// 根据分类筛选博客文章
const filteredPosts = computed(() => {
  if (selectedCategory.value === 'all') {
    return blogPosts.value
  } else {
    const categoryMap = {
      'market-analysis': '市场分析',
      'investment-strategy': '投资策略',
      'industry-trends': '行业趋势'
    }
    return blogPosts.value.filter(post => post.category === categoryMap[selectedCategory.value])
  }
})

// 切换分类
const changeCategory = (categoryId) => {
  selectedCategory.value = categoryId
}

// 查看博客详情
const viewBlogDetail = (blogId) => {
  router.push(`/resources/blog/${blogId}`)
}

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
      
      <section class="blog-section">
        <div class="section-header">
          <h2 class="section-title">房产市场博客</h2>
          <div class="category-tabs">
            <div 
              v-for="category in categories" 
              :key="category.id"
              :class="['category-tab', { active: selectedCategory === category.id }]"
              @click="changeCategory(category.id)"
            >
              {{ category.name }}
            </div>
          </div>
        </div>
        
        <div class="blog-posts-grid">
          <div 
            v-for="post in filteredPosts" 
            :key="post.id"
            class="blog-post-card"
            @click="viewBlogDetail(post.id)"
          >
            <div class="post-image">
              <img :src="post.image" :alt="post.title">
              <div class="post-category">{{ post.category }}</div>
            </div>
            <div class="post-content">
              <h3 class="post-title">{{ post.title }}</h3>
              <p class="post-excerpt">{{ post.excerpt }}</p>
              <div class="post-meta">
                <div class="post-author">
                  <img :src="post.authorAvatar" :alt="post.author" class="author-avatar">
                  <span class="author-name">{{ post.author }}</span>
                </div>
                <div class="post-info">
                  <span class="post-date">{{ post.date }}</span>
                  <span class="post-read-time">{{ post.readTime }}</span>
                </div>
              </div>
              <div class="post-tags">
                <span 
                  v-for="(tag, index) in post.tags" 
                  :key="index"
                  class="post-tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="view-all-blogs">
          <button class="view-all-btn" @click="goToResource('/resources/blog')">
            查看全部博客 <i class="fas fa-arrow-right"></i>
          </button>
        </div>
      </section>
      
      <section class="other-resources-section">
        <h2 class="section-title">其他资源</h2>
        <div class="resource-types-grid">
          <div 
            v-for="type in otherResourceTypes" 
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

/* 博客区域 */
.blog-section {
  margin-bottom: 60px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.section-title {
  font-size: 28px;
  color: #333;
  margin-bottom: 20px;
}

.category-tabs {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.category-tab {
  padding: 8px 16px;
  border-radius: 20px;
  background-color: #f5f5f5;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s;
}

.category-tab:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.category-tab.active {
  background-color: #1890ff;
  color: #fff;
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  margin-bottom: 30px;
}

.blog-post-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.blog-post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
}

.post-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.blog-post-card:hover .post-image img {
  transform: scale(1.05);
}

.post-category {
  position: absolute;
  top: 10px;
  left: 10px;
  padding: 5px 10px;
  background-color: #1890ff;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
}

.post-content {
  padding: 20px;
}

.post-title {
  font-size: 18px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.post-excerpt {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  height: 67px;
  overflow: hidden;
}

.post-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.post-author {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 10px;
}

.author-name {
  font-size: 14px;
  color: #333;
}

.post-info {
  font-size: 12px;
  color: #999;
}

.post-date {
  margin-right: 10px;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.post-tag {
  display: inline-block;
  padding: 3px 8px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 4px;
  font-size: 12px;
}

.view-all-blogs {
  text-align: center;
  margin-top: 20px;
}

.view-all-btn {
  padding: 10px 20px;
  background-color: transparent;
  border: 1px solid #1890ff;
  color: #1890ff;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.view-all-btn:hover {
  background-color: #1890ff;
  color: #fff;
}

.view-all-btn i {
  margin-left: 10px;
  transition: transform 0.3s;
}

.view-all-btn:hover i {
  transform: translateX(5px);
}

/* 其他资源区域 */
.other-resources-section {
  margin-bottom: 60px;
}

.resource-types-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  .featured-resources-grid,
  .blog-posts-grid {
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
  
  .section-header {
    flex-direction: column;
    align-items: flex-start;
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
  
  .blog-posts-grid {
    grid-template-columns: 1fr;
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
  
  .category-tabs {
    flex-wrap: wrap;
  }
  
  .category-tab {
    font-size: 12px;
    padding: 6px 12px;
  }
}
</style>
