<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

// 博客文章详情
const blogPost = ref({
  id: 1,
  title: '2025年全球房地产市场趋势分析',
  content: `
    <p>随着2025年的到来，全球房地产市场正经历着深刻的变革。本文将深入分析2025年全球房地产市场的主要趋势，为投资者提供有价值的市场洞察和投资建议。</p>
    
    <h2>全球宏观经济环境</h2>
    
    <p>2025年，全球经济继续保持温和增长，但区域差异明显。发达经济体增长放缓，而部分新兴市场国家表现强劲。全球通胀压力有所缓解，主要央行已开始降息周期，这为房地产市场提供了相对宽松的融资环境。</p>
    
    <p>然而，地缘政治风险和贸易摩擦仍是影响全球经济的不确定因素，投资者需密切关注这些风险对房地产市场的潜在影响。</p>
    
    <h2>区域市场表现</h2>
    
    <h3>北美市场</h3>
    
    <p>美国房地产市场在经历了2023-2024年的调整后，2025年开始呈现稳定复苏态势。住宅市场供需关系趋于平衡，价格增长温和。值得注意的是，美国二线城市和郊区市场表现优于传统大都市区，这一趋势受远程工作持续普及的推动。</p>
    
    <p>加拿大市场则面临供应短缺和高移民率双重压力，主要城市房价继续上涨，但增速较前几年有所放缓。多伦多和温哥华的负担能力问题仍然突出。</p>
    
    <h3>欧洲市场</h3>
    
    <p>欧洲房地产市场呈现分化态势。西欧和北欧市场价格趋于稳定，而东欧和南欧部分市场则保持较高增长。英国脱欧后的调整基本完成，伦敦市场重新焕发活力。</p>
    
    <p>值得关注的是，欧洲绿色建筑和可持续发展项目获得越来越多的投资关注，符合ESG标准的房地产资产溢价明显。</p>
    
    <h3>亚太市场</h3>
    
    <p>亚太地区继续是全球房地产投资的热点。中国市场在经历了深度调整后，一线和强二线城市市场开始企稳，政策环境趋于宽松。日本在奥运会后继续吸引外国投资者，东京和大阪的租金回报率相对其他发达市场更具吸引力。</p>
    
    <p>东南亚市场中，越南、印尼和菲律宾的城市化进程加速，为房地产市场提供了强劲的基本面支撑。新加坡作为区域金融中心，高端住宅和商业地产持续受到国际投资者青睐。</p>
    
    <h2>资产类别趋势</h2>
    
    <h3>住宅市场</h3>
    
    <p>全球住宅市场的主要趋势包括：</p>
    
    <ul>
      <li>可负担住房需求激增，政府和开发商增加相关供应</li>
      <li>智能家居和节能设计成为标准配置</li>
      <li>多代同堂和灵活空间设计的住宅受到欢迎</li>
      <li>郊区和卫星城市的优质住宅需求增长</li>
    </ul>
    
    <h3>商业地产</h3>
    
    <p>办公市场继续适应混合工作模式，高品质、灵活性强、设施完善的办公空间需求旺盛，而传统办公楼面临改造或转换用途的压力。</p>
    
    <p>零售地产分化明显，体验式零售和社区型商业中心表现良好，而传统购物中心需要通过增加娱乐和餐饮元素来提升吸引力。</p>
    
    <h3>物流和数据中心</h3>
    
    <p>物流地产和数据中心继续是投资热点。电子商务的持续增长和供应链重构推动了对现代化物流设施的需求。同时，人工智能和云计算的发展使数据中心需求激增，特别是在能源成本较低且政策支持的地区。</p>
    
    <h2>投资策略建议</h2>
    
    <p>基于上述趋势分析，我们为不同类型的投资者提供以下策略建议：</p>
    
    <h3>机构投资者</h3>
    
    <ul>
      <li>增加对物流资产和数据中心的配置</li>
      <li>关注亚洲新兴市场的城市化机会</li>
      <li>投资符合ESG标准的绿色建筑项目</li>
      <li>考虑将部分传统办公资产转换为混合用途或生活服务设施</li>
    </ul>
    
    <h3>个人投资者</h3>
    
    <ul>
      <li>关注二线城市和卫星城市的住宅投资机会</li>
      <li>考虑投资学生公寓和养老地产等专业细分市场</li>
      <li>通过REITs或众筹平台参与大型商业地产投资</li>
      <li>密切关注利率变化对融资成本和资产估值的影响</li>
    </ul>
    
    <h2>风险因素</h2>
    
    <p>尽管市场前景整体向好，投资者仍需警惕以下风险因素：</p>
    
    <ul>
      <li>地缘政治冲突可能导致能源价格波动和供应链中断</li>
      <li>部分市场估值过高，存在价格回调风险</li>
      <li>气候变化相关风险对沿海和低洼地区房产价值的影响</li>
      <li>监管环境变化，特别是对外国投资者的限制政策</li>
    </ul>
    
    <h2>结论</h2>
    
    <p>2025年全球房地产市场呈现出复杂多变的格局，机遇与挑战并存。成功的投资者需要深入了解区域差异和资产类别特点，灵活调整投资策略，并做好风险管理。在这个充满变革的时代，专业的市场分析和及时的信息获取将成为投资成功的关键因素。</p>
  `,
  image: 'https://picsum.photos/id/1015/1200/600',
  author: '张明',
  authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
  authorTitle: '资深房地产分析师',
  authorBio: '张明拥有15年房地产市场研究经验，曾在多家国际房地产咨询公司担任高级分析师职位。专注于全球房地产市场趋势研究和投资策略分析。',
  date: '2025-10-25',
  category: '市场分析',
  tags: ['全球市场', '投资趋势', '市场预测'],
  readTime: '8分钟',
  views: 3542,
  likes: 286,
  comments: 47
})

// 相关文章
const relatedPosts = ref([
  {
    id: 2,
    title: '如何评估海外房产投资风险',
    excerpt: '海外房产投资充满机遇，但同时也伴随着各种风险。本文详细介绍了评估海外房产投资风险的方法和工具。',
    image: 'https://picsum.photos/id/1016/400/250',
    date: '2025-10-18',
    readTime: '10分钟'
  },
  {
    id: 4,
    title: '亚洲新兴市场房地产投资机会',
    excerpt: '亚洲新兴市场正成为全球房地产投资者关注的焦点。本文分析了越南、印度尼西亚、菲律宾等亚洲新兴市场的房地产投资环境。',
    image: 'https://picsum.photos/id/1019/400/250',
    date: '2025-10-05',
    readTime: '9分钟'
  },
  {
    id: 6,
    title: '全球主要城市租金回报率比较',
    excerpt: '本文对纽约、伦敦、东京、新加坡、悉尼等全球主要城市的租金回报率进行了详细比较和分析。',
    image: 'https://picsum.photos/id/1032/400/250',
    date: '2025-09-20',
    readTime: '11分钟'
  }
])

// 评论列表
const comments = ref([
  {
    id: 1,
    author: '李华',
    authorAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    content: '非常全面的分析！特别是关于亚太市场的部分，对我的投资决策很有帮助。想请教一下作者，您认为越南市场中哪些城市最具投资潜力？',
    date: '2025-10-26',
    likes: 15,
    replies: [
      {
        id: 101,
        author: '张明',
        authorAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
        content: '谢谢您的问题！在越南市场，我认为胡志明市、河内和岘港最具投资潜力。胡志明市作为经济中心，高端住宅和办公市场表现强劲；河内的基础设施快速发展，政府支持力度大；岘港则是旅游和度假地产的热点。',
        date: '2025-10-26',
        likes: 8
      }
    ]
  },
  {
    id: 2,
    author: '王强',
    authorAvatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    content: '文章提到欧洲绿色建筑项目获得越来越多的投资关注，能否分享一些具体的成功案例或投资渠道？',
    date: '2025-10-25',
    likes: 9,
    replies: []
  },
  {
    id: 3,
    author: '陈静',
    authorAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    content: '对于个人投资者来说，REITs确实是参与大型商业地产的好渠道。不知道作者是否可以推荐一些表现良好的全球房地产REITs？',
    date: '2025-10-25',
    likes: 12,
    replies: []
  }
])

// 新评论
const newComment = ref('')

// 提交评论
const submitComment = () => {
  if (!newComment.value.trim()) return
  
  comments.value.unshift({
    id: Date.now(),
    author: '访客用户',
    authorAvatar: 'https://randomuser.me/api/portraits/lego/1.jpg',
    content: newComment.value,
    date: new Date().toISOString().split('T')[0],
    likes: 0,
    replies: []
  })
  
  newComment.value = ''
}

// 点赞文章
const likePost = () => {
  blogPost.value.likes++
}

// 分享文章
const sharePost = () => {
  alert('分享功能即将上线！')
}

// 查看相关文章
const viewRelatedPost = (postId) => {
  router.push(`/resources/blog/${postId}`)
}

onMounted(() => {
  // 在实际应用中，这里会根据路由参数获取博客详情
  // const blogId = route.params.id
  // fetchBlogDetail(blogId)
  
  // 滚动到页面顶部
  window.scrollTo(0, 0)
})
</script>

<template>
  <div class="blog-detail-page">
    <div class="container">
      <!-- 文章头部 -->
      <div class="blog-header">
        <div class="blog-category">{{ blogPost.category }}</div>
        <h1 class="blog-title">{{ blogPost.title }}</h1>
        <div class="blog-meta">
          <div class="author-info">
            <img :src="blogPost.authorAvatar" :alt="blogPost.author" class="author-avatar">
            <div class="author-details">
              <div class="author-name">{{ blogPost.author }}</div>
              <div class="author-title">{{ blogPost.authorTitle }}</div>
            </div>
          </div>
          <div class="post-info">
            <span class="post-date">{{ blogPost.date }}</span>
            <span class="post-read-time">{{ blogPost.readTime }}</span>
            <span class="post-views"><i class="fas fa-eye"></i> {{ blogPost.views }}</span>
          </div>
        </div>
      </div>
      
      <!-- 文章特色图片 -->
      <div class="blog-featured-image">
        <img :src="blogPost.image" :alt="blogPost.title">
      </div>
      
      <!-- 文章内容 -->
      <div class="blog-content-wrapper">
        <div class="blog-main-content">
          <!-- 文章正文 -->
          <div class="blog-content" v-html="blogPost.content"></div>
          
          <!-- 文章标签 -->
          <div class="blog-tags">
            <span class="tags-label">标签：</span>
            <div class="tags-list">
              <span 
                v-for="(tag, index) in blogPost.tags" 
                :key="index"
                class="tag-item"
              >
                {{ tag }}
              </span>
            </div>
          </div>
          
          <!-- 文章分享和点赞 -->
          <div class="blog-actions">
            <button class="action-btn like-btn" @click="likePost">
              <i class="fas fa-heart"></i> 点赞 ({{ blogPost.likes }})
            </button>
            <button class="action-btn share-btn" @click="sharePost">
              <i class="fas fa-share-alt"></i> 分享
            </button>
          </div>
          
          <!-- 作者信息 -->
          <div class="author-bio-container">
            <div class="author-bio-header">
              <img :src="blogPost.authorAvatar" :alt="blogPost.author" class="author-bio-avatar">
              <div class="author-bio-info">
                <h3 class="author-bio-name">{{ blogPost.author }}</h3>
                <p class="author-bio-title">{{ blogPost.authorTitle }}</p>
              </div>
            </div>
            <p class="author-bio-content">{{ blogPost.authorBio }}</p>
            <div class="author-bio-social">
              <a href="#" class="social-link"><i class="fab fa-linkedin"></i></a>
              <a href="#" class="social-link"><i class="fab fa-twitter"></i></a>
              <a href="#" class="social-link"><i class="fas fa-globe"></i></a>
            </div>
          </div>
          
          <!-- 评论区 -->
          <div class="comments-section">
            <h2 class="comments-title">评论 ({{ comments.length }})</h2>
            
            <!-- 评论表单 -->
            <div class="comment-form">
              <textarea 
                v-model="newComment" 
                placeholder="写下您的评论..." 
                class="comment-input"
              ></textarea>
              <button 
                class="comment-submit" 
                @click="submitComment"
                :disabled="!newComment.trim()"
              >
                发表评论
              </button>
            </div>
            
            <!-- 评论列表 -->
            <div class="comments-list">
              <div 
                v-for="comment in comments" 
                :key="comment.id"
                class="comment-item"
              >
                <div class="comment-avatar">
                  <img :src="comment.authorAvatar" :alt="comment.author">
                </div>
                <div class="comment-content">
                  <div class="comment-header">
                    <span class="comment-author">{{ comment.author }}</span>
                    <span class="comment-date">{{ comment.date }}</span>
                  </div>
                  <p class="comment-text">{{ comment.content }}</p>
                  <div class="comment-actions">
                    <button class="comment-action-btn">
                      <i class="fas fa-reply"></i> 回复
                    </button>
                    <button class="comment-action-btn">
                      <i class="fas fa-heart"></i> 点赞 ({{ comment.likes }})
                    </button>
                  </div>
                  
                  <!-- 回复列表 -->
                  <div v-if="comment.replies.length > 0" class="replies-list">
                    <div 
                      v-for="reply in comment.replies" 
                      :key="reply.id"
                      class="reply-item"
                    >
                      <div class="reply-avatar">
                        <img :src="reply.authorAvatar" :alt="reply.author">
                      </div>
                      <div class="reply-content">
                        <div class="reply-header">
                          <span class="reply-author">{{ reply.author }}</span>
                          <span class="reply-date">{{ reply.date }}</span>
                        </div>
                        <p class="reply-text">{{ reply.content }}</p>
                        <div class="reply-actions">
                          <button class="reply-action-btn">
                            <i class="fas fa-heart"></i> 点赞 ({{ reply.likes }})
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- 侧边栏 -->
        <div class="blog-sidebar">
          <!-- 目录 -->
          <div class="toc-container">
            <h3 class="sidebar-title">文章目录</h3>
            <ul class="toc-list">
              <li class="toc-item"><a href="#" class="toc-link">全球宏观经济环境</a></li>
              <li class="toc-item">
                <a href="#" class="toc-link">区域市场表现</a>
                <ul class="toc-sublist">
                  <li class="toc-subitem"><a href="#" class="toc-link">北美市场</a></li>
                  <li class="toc-subitem"><a href="#" class="toc-link">欧洲市场</a></li>
                  <li class="toc-subitem"><a href="#" class="toc-link">亚太市场</a></li>
                </ul>
              </li>
              <li class="toc-item">
                <a href="#" class="toc-link">资产类别趋势</a>
                <ul class="toc-sublist">
                  <li class="toc-subitem"><a href="#" class="toc-link">住宅市场</a></li>
                  <li class="toc-subitem"><a href="#" class="toc-link">商业地产</a></li>
                  <li class="toc-subitem"><a href="#" class="toc-link">物流和数据中心</a></li>
                </ul>
              </li>
              <li class="toc-item"><a href="#" class="toc-link">投资策略建议</a></li>
              <li class="toc-item"><a href="#" class="toc-link">风险因素</a></li>
              <li class="toc-item"><a href="#" class="toc-link">结论</a></li>
            </ul>
          </div>
          
          <!-- 相关文章 -->
          <div class="related-posts-container">
            <h3 class="sidebar-title">相关文章</h3>
            <div class="related-posts-list">
              <div 
                v-for="post in relatedPosts" 
                :key="post.id"
                class="related-post-item"
                @click="viewRelatedPost(post.id)"
              >
                <div class="related-post-image">
                  <img :src="post.image" :alt="post.title">
                </div>
                <div class="related-post-content">
                  <h4 class="related-post-title">{{ post.title }}</h4>
                  <div class="related-post-meta">
                    <span class="related-post-date">{{ post.date }}</span>
                    <span class="related-post-read-time">{{ post.readTime }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- 订阅区域 -->
          <div class="sidebar-subscribe-container">
            <h3 class="sidebar-title">订阅更新</h3>
            <p class="sidebar-subscribe-text">
              订阅我们的博客更新，获取最新的房地产市场洞察和投资策略。
            </p>
            <div class="sidebar-subscribe-form">
              <input type="email" placeholder="您的电子邮箱" class="sidebar-subscribe-input">
              <button class="sidebar-subscribe-btn">订阅</button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 返回按钮 -->
      <div class="back-to-blog">
        <router-link to="/resources/blog" class="back-link">
          <i class="fas fa-arrow-left"></i> 返回博客列表
        </router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>
.blog-detail-page {
  padding-top: 70px;
  padding-bottom: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 文章头部 */
.blog-header {
  max-width: 800px;
  margin: 0 auto 30px;
  text-align: center;
}

.blog-category {
  display: inline-block;
  padding: 5px 15px;
  background-color: #1890ff;
  color: #fff;
  font-size: 14px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.blog-title {
  font-size: 36px;
  margin-bottom: 20px;
  color: #333;
  line-height: 1.3;
}

.blog-meta {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  gap: 20px;
}

.author-info {
  display: flex;
  align-items: center;
}

.author-avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.author-name {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.author-title {
  font-size: 14px;
  color: #666;
}

.post-info {
  display: flex;
  align-items: center;
  gap: 15px;
  color: #666;
  font-size: 14px;
}

.post-views i {
  margin-right: 5px;
}

/* 特色图片 */
.blog-featured-image {
  max-width: 1000px;
  margin: 0 auto 40px;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
}

.blog-featured-image img {
  width: 100%;
  height: auto;
}

/* 文章内容区域 */
.blog-content-wrapper {
  display: flex;
  gap: 40px;
  margin-bottom: 60px;
}

.blog-main-content {
  flex: 1;
  min-width: 0;
}

/* 文章正文 */
.blog-content {
  background-color: #fff;
  border-radius: 8px;
  padding: 40px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
  line-height: 1.8;
  color: #333;
}

.blog-content :deep(h2) {
  font-size: 24px;
  margin: 30px 0 20px;
  color: #333;
}

.blog-content :deep(h3) {
  font-size: 20px;
  margin: 25px 0 15px;
  color: #333;
}

.blog-content :deep(p) {
  margin-bottom: 20px;
}

.blog-content :deep(ul), .blog-content :deep(ol) {
  margin-bottom: 20px;
  padding-left: 20px;
}

.blog-content :deep(li) {
  margin-bottom: 10px;
}

/* 文章标签 */
.blog-tags {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.tags-label {
  font-size: 16px;
  font-weight: 600;
  color: #333;
  margin-right: 15px;
}

.tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tag-item {
  display: inline-block;
  padding: 5px 15px;
  background-color: #f5f5f5;
  color: #666;
  border-radius: 20px;
  font-size: 14px;
  transition: all 0.3s;
  cursor: pointer;
}

.tag-item:hover {
  background-color: #e6f7ff;
  color: #1890ff;
}

/* 文章操作 */
.blog-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.action-btn {
  flex: 1;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-btn i {
  margin-right: 10px;
}

.like-btn {
  background-color: #fff;
  color: #ff4d4f;
  border: 1px solid #ff4d4f;
}

.like-btn:hover {
  background-color: #fff1f0;
}

.share-btn {
  background-color: #fff;
  color: #1890ff;
  border: 1px solid #1890ff;
}

.share-btn:hover {
  background-color: #e6f7ff;
}

/* 作者信息 */
.author-bio-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.author-bio-header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.author-bio-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-right: 20px;
}

.author-bio-name {
  font-size: 20px;
  font-weight: 600;
  color: #333;
  margin-bottom: 5px;
}

.author-bio-title {
  font-size: 16px;
  color: #666;
}

.author-bio-content {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 20px;
}

.author-bio-social {
  display: flex;
  gap: 15px;
}

.social-link {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #f5f5f5;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #666;
  font-size: 18px;
  transition: all 0.3s;
}

.social-link:hover {
  background-color: #1890ff;
  color: #fff;
}

/* 评论区 */
.comments-section {
  background-color: #fff;
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.comments-title {
  font-size: 24px;
  margin-bottom: 30px;
  color: #333;
}

.comment-form {
  margin-bottom: 40px;
}

.comment-input {
  width: 100%;
  height: 120px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  margin-bottom: 15px;
  resize: none;
}

.comment-input:focus {
  outline: none;
  border-color: #1890ff;
}

.comment-submit {
  padding: 10px 20px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-submit:hover {
  background-color: #40a9ff;
}

.comment-submit:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.comment-item {
  display: flex;
  gap: 20px;
}

.comment-avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.comment-content {
  flex: 1;
}

.comment-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.comment-author {
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.comment-date {
  font-size: 14px;
  color: #999;
}

.comment-text {
  font-size: 16px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 15px;
}

.comment-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
}

.comment-action-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.3s;
}

.comment-action-btn:hover {
  color: #1890ff;
}

.comment-action-btn i {
  margin-right: 5px;
}

.replies-list {
  margin-left: 30px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.reply-item {
  display: flex;
  gap: 15px;
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 15px;
}

.reply-avatar img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

.reply-content {
  flex: 1;
}

.reply-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}

.reply-author {
  font-size: 14px;
  font-weight: 600;
  color: #333;
}

.reply-date {
  font-size: 12px;
  color: #999;
}

.reply-text {
  font-size: 14px;
  color: #333;
  line-height: 1.6;
  margin-bottom: 10px;
}

.reply-actions {
  display: flex;
  gap: 15px;
}

.reply-action-btn {
  background: none;
  border: none;
  color: #666;
  font-size: 12px;
  cursor: pointer;
  transition: color 0.3s;
}

.reply-action-btn:hover {
  color: #1890ff;
}

.reply-action-btn i {
  margin-right: 5px;
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

.toc-container,
.related-posts-container,
.sidebar-subscribe-container {
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
}

.toc-list {
  list-style: none;
  padding: 0;
}

.toc-item {
  margin-bottom: 10px;
}

.toc-link {
  display: block;
  padding: 8px 0;
  color: #333;
  text-decoration: none;
  transition: color 0.3s;
}

.toc-link:hover {
  color: #1890ff;
}

.toc-sublist {
  list-style: none;
  padding-left: 20px;
  margin-top: 5px;
}

.toc-subitem {
  margin-bottom: 5px;
}

.related-posts-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.related-post-item {
  display: flex;
  gap: 15px;
  cursor: pointer;
  transition: transform 0.3s;
}

.related-post-item:hover {
  transform: translateX(5px);
}

.related-post-image {
  width: 80px;
  height: 60px;
  border-radius: 4px;
  overflow: hidden;
  flex-shrink: 0;
}

.related-post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-post-content {
  flex: 1;
}

.related-post-title {
  font-size: 14px;
  margin-bottom: 5px;
  color: #333;
  line-height: 1.4;
}

.related-post-meta {
  font-size: 12px;
  color: #999;
}

.related-post-date {
  margin-right: 10px;
}

.sidebar-subscribe-text {
  font-size: 14px;
  color: #666;
  margin-bottom: 15px;
  line-height: 1.6;
}

.sidebar-subscribe-form {
  display: flex;
  flex-direction: column;
}

.sidebar-subscribe-input {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  margin-bottom: 10px;
}

.sidebar-subscribe-input:focus {
  outline: none;
  border-color: #1890ff;
}

.sidebar-subscribe-btn {
  padding: 10px;
  background-color: #1890ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.sidebar-subscribe-btn:hover {
  background-color: #40a9ff;
}

/* 返回按钮 */
.back-to-blog {
  margin-bottom: 40px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  color: #1890ff;
  font-size: 16px;
  text-decoration: none;
  transition: color 0.3s;
}

.back-link:hover {
  color: #40a9ff;
}

.back-link i {
  margin-right: 10px;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .blog-content-wrapper {
    flex-direction: column;
  }
  
  .blog-sidebar {
    width: 100%;
    order: -1;
    margin-bottom: 30px;
  }
  
  .toc-container {
    display: none;
  }
  
  .related-posts-container,
  .sidebar-subscribe-container {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
}

@media (max-width: 768px) {
  .blog-title {
    font-size: 28px;
  }
  
  .blog-content {
    padding: 25px;
  }
  
  .author-bio-header {
    flex-direction: column;
    text-align: center;
  }
  
  .author-bio-avatar {
    margin-right: 0;
    margin-bottom: 15px;
  }
  
  .author-bio-social {
    justify-content: center;
  }
  
  .comment-item {
    flex-direction: column;
  }
  
  .comment-avatar {
    margin-bottom: 10px;
  }
  
  .replies-list {
    margin-left: 0;
  }
}

@media (max-width: 576px) {
  .blog-meta {
    flex-direction: column;
    gap: 10px;
  }
  
  .blog-actions {
    flex-direction: column;
  }
  
  .comment-header {
    flex-direction: column;
  }
  
  .comment-date {
    margin-top: 5px;
  }
}
</style>
