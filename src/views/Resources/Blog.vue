<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const router = useRouter()

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
  },
  {
    id: 5,
    title: '可持续发展与绿色建筑投资指南',
    excerpt: '随着环保意识的提高和政策支持的加强，绿色建筑和可持续房地产项目正成为投资热点。本文介绍了全球绿色建筑标准、可持续房地产投资的财务回报分析，以及如何识别和评估绿色房地产投资机会。',
    image: 'https://picsum.photos/id/1031/800/450',
    author: '林森',
    authorAvatar: 'https://randomuser.me/api/portraits/men/5.jpg',
    date: '2025-09-28',
    category: '可持续发展',
    tags: ['绿色建筑', 'ESG投资', '可持续发展'],
    readTime: '6分钟'
  },
  {
    id: 6,
    title: '全球主要城市租金回报率比较',
    excerpt: '本文对纽约、伦敦、东京、新加坡、悉尼等全球主要城市的租金回报率进行了详细比较和分析。通过大量数据和案例研究，我们揭示了不同城市租赁市场的特点、投资回报差异及背后的驱动因素。',
    image: 'https://picsum.photos/id/1032/800/450',
    author: '赵明',
    authorAvatar: 'https://randomuser.me/api/portraits/men/6.jpg',
    date: '2025-09-20',
    category: '投资分析',
    tags: ['租金回报', '全球城市', '比较分析'],
    readTime: '11分钟'
  },
  {
    id: 7,
    title: '房地产众筹平台：机遇与风险',
    excerpt: '房地产众筹正成为小额投资者参与大型房地产项目的新途径。本文分析了全球主要房地产众筹平台的运营模式、监管环境、投资回报表现，并探讨了这一新兴投资方式的机遇与风险。',
    image: 'https://picsum.photos/id/1033/800/450',
    author: '黄婷',
    authorAvatar: 'https://randomuser.me/api/portraits/women/7.jpg',
    date: '2025-09-15',
    category: '投资创新',
    tags: ['众筹', '另类投资', '金融创新'],
    readTime: '8分钟'
  },
  {
    id: 8,
    title: '后疫情时代的办公地产市场转型',
    excerpt: '疫情改变了人们的工作方式，也深刻影响了办公地产市场。本文探讨了混合办公模式兴起、灵活办公空间需求增长等趋势对办公地产市场的影响，以及开发商和投资者应如何应对这一市场转型。',
    image: 'https://picsum.photos/id/1035/800/450',
    author: '刘伟',
    authorAvatar: 'https://randomuser.me/api/portraits/men/8.jpg',
    date: '2025-09-08',
    category: '行业趋势',
    tags: ['办公地产', '市场转型', '后疫情时代'],
    readTime: '7分钟'
  }
])

// 博客分类
const categories = ref([
  { id: 'all', name: '全部' },
  { id: 'market-analysis', name: '市场分析' },
  { id: 'investment-strategy', name: '投资策略' },
  { id: 'industry-trends', name: '行业趋势' },
  { id: 'sustainable-development', name: '可持续发展' },
  { id: 'investment-innovation', name: '投资创新' }
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
      'industry-trends': '行业趋势',
      'sustainable-development': '可持续发展',
      'investment-innovation': '投资创新'
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

// 热门标签
const popularTags = ref([
  '全球市场', '投资趋势', '市场预测', '风险管理', '海外投资', 
  '数字化', '科技创新', '亚洲市场', '绿色建筑', 'ESG投资', 
  '租金回报', '众筹', '办公地产'
])
</script>

<template>
  <div class="blog-page">
    <div class="container">
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="page-title">房地产市场博客</h1>
          <p class="hero-description">
            探索我们的专业博客，获取最新的房地产市场分析、投资策略和行业趋势洞察，
            帮助您在全球房地产市场中做出明智决策。
          </p>
        </div>
      </section>
      
      <section class="blog-content-section">
        <div class="blog-sidebar">
          <div class="categories-container">
            <h3 class="sidebar-title">文章分类</h3>
            <ul class="categories-list">
              <li 
                v-for="category in categories" 
                :key="category.id"
                :class="{ active: selectedCategory === category.id }"
                @click="changeCategory(category.id)"
              >
                {{ category.name }}
              </li>
            </ul>
          </div>
          
          <div class="popular-tags-container">
            <h3 class="sidebar-title">热门标签</h3>
            <div class="tags-cloud">
              <span 
                v-for="(tag, index) in popularTags" 
                :key="index"
                class="tag-item"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <div class="featured-post-container">
            <h3 class="sidebar-title">精选文章</h3>
            <div class="featured-post">
              <div class="featured-post-image">
                <img src="https://picsum.photos/id/1039/400/250" alt="精选文章">
              </div>
              <h4 class="featured-post-title">2025年房地产投资者必读：十大市场机会</h4>
              <p class="featured-post-meta">2025-10-30 · 12分钟阅读</p>
            </div>
          </div>
          
          <div class="newsletter-container">
            <h3 class="sidebar-title">订阅更新</h3>
            <p class="newsletter-description">
              订阅我们的博客更新，获取最新的房地产市场洞察和投资策略。
            </p>
            <div class="newsletter-form">
              <input type="email" placeholder="您的电子邮箱" class="newsletter-input">
              <button class="newsletter-btn">订阅</button>
            </div>
          </div>
        </div>
        
        <div class="blog-main-content">
          <div class="blog-filter-bar">
            <div class="filter-label">当前分类：</div>
            <div class="current-filter">
              {{ categories.find(c => c.id === selectedCategory).name }}
            </div>
            <div class="filter-count">{{ filteredPosts.length }} 篇文章</div>
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
                <h2 class="post-title">{{ post.title }}</h2>
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
          
          <div class="blog-pagination">
            <button class="pagination-btn prev-btn" disabled>
              <i class="fas fa-chevron-left"></i> 上一页
            </button>
            <div class="pagination-numbers">
              <span class="page-number active">1</span>
              <span class="page-number">2</span>
              <span class="page-number">3</span>
              <span class="page-dots">...</span>
              <span class="page-number">8</span>
            </div>
            <button class="pagination-btn next-btn">
              下一页 <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped>
.blog-page {
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
}

/* 博客内容区域 */
.blog-content-section {
  display: flex;
  gap: 30px;
  margin-bottom: 60px;
}

/* 侧边栏 */
.blog-sidebar {
  width: 300px;
  flex-shrink: 0;
}

.sidebar-title {
  font-size: 18px;
  margin-bottom: 15px;
  color: #333;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;
}

.categories-container,
.popular-tags-container,
.featured-post-container,
.newsletter-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.categories-list {
  list-style: none;
  padding: 0;
}

.categories-list li {
  padding: 10px 0;
  border-bottom: 1px solid #f5f5f5;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.categories-list li:last-child {
  border-bottom: none;
}

.categories-list li:hover {
  color: #1890ff;
}

.categories-list li.active {
  color: #1890ff;
  font-weight: 600;
}

.tags-cloud {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  display: inline-block;
  padding: 5px 10px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

.featured-post {
  cursor: pointer;
}

.featured-post-image {
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 10px;
}

.featured-post-image img {
  width: 100%;
  height: auto;
  transition: transform 0.5s;
}

.featured-post:hover .featured-post-image img {
  transform: scale(1.05);
}

.featured-post-title {
  font-size: 16px;
  margin-bottom: 10px;
  color: #333;
  line-height: 1.4;
}

.featured-post-meta {
  font-size: 12px;
  color: #999;
}

.newsletter-description {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.newsletter-form {
  display: flex;
  flex-direction: column;
}

.newsletter-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}

.newsletter-input:focus {
  outline: none;
  border-color: #1890ff;
}

.newsletter-btn {
  padding: 10px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.newsletter-btn:hover {
  background-color: #40a9ff;
}

/* 主内容区域 */
.blog-main-content {
  flex: 1;
}

.blog-filter-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.filter-label {
  font-size: 14px;
  color: #999;
  margin-right: 10px;
}

.current-filter {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 20px;
}

.filter-count {
  font-size: 14px;
  color: #666;
  margin-left: auto;
}

.blog-posts-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.blog-post-card {
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}

.blog-post-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
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

.blog-pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.pagination-btn {
  padding: 8px 15px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f5f5f5;
  color: #333;
}

.pagination-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.prev-btn {
  margin-right: 10px;
}

.next-btn {
  margin-left: 10px;
}

.pagination-numbers {
  display: flex;
  align-items: center;
}

.page-number {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  margin: 0 5px;
  border-radius: 4px;
  font-size: 14px;
  color: #666;
  cursor: pointer;
  transition: all 0.3s;
}

.page-number:hover:not(.active) {
  background-color: #f5f5f5;
}

.page-number.active {
  background-color: #1890ff;
  color: #fff;
}

.page-dots {
  margin: 0 5px;
  color: #999;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .blog-content-section {
    flex-direction: column;
  }
  
  .blog-sidebar {
    width: 100%;
    margin-bottom: 30px;
  }
  
  .blog-posts-grid {
    grid-template-columns: repeat(2, 1fr);
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
  
  .blog-posts-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .blog-filter-bar {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .filter-label,
  .current-filter {
    margin-bottom: 5px;
  }
  
  .filter-count {
    margin-left: 0;
    margin-top: 5px;
  }
  
  .pagination-numbers {
    display: none;
  }
  
  .pagination-btn {
    flex: 1;
    text-align: center;
  }
}
</style>
