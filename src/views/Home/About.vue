<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <div class="about-page">
    <div class="container">
      <h1 class="page-title">关于我们</h1>
      
      <div class="about-content">
        <section class="about-section">
          <h2>我们的使命</h2>
          <p>Global PropAI 致力于通过人工智能和数据分析，为全球房产投资者提供准确、及时的市场洞察。我们的使命是让房产投资决策变得更加透明、高效和智能化，帮助投资者在全球范围内找到最佳的投资机会。</p>
        </section>
        
        <section class="about-section">
          <h2>我们的团队</h2>
          <p>我们的团队由房地产专家、数据科学家和人工智能工程师组成，拥有丰富的行业经验和技术专长。团队成员来自全球各地，对不同市场有深入的了解，能够提供全面的全球视角。</p>
          
          <div class="team-grid">
            <div class="team-member">
              <div class="member-photo">
                <img src="https://via.placeholder.com/150" alt="CEO">
              </div>
              <h3>张明</h3>
              <p>首席执行官</p>
            </div>
            
            <div class="team-member">
              <div class="member-photo">
                <img src="https://via.placeholder.com/150" alt="CTO">
              </div>
              <h3>Sarah Johnson</h3>
              <p>首席技术官</p>
            </div>
            
            <div class="team-member">
              <div class="member-photo">
                <img src="https://via.placeholder.com/150" alt="CDO">
              </div>
              <h3>Raj Patel</h3>
              <p>首席数据官</p>
            </div>
            
            <div class="team-member">
              <div class="member-photo">
                <img src="https://via.placeholder.com/150" alt="CMO">
              </div>
              <h3>Maria Rodriguez</h3>
              <p>首席市场官</p>
            </div>
          </div>
        </section>
        
        <section class="about-section">
          <h2>我们的技术</h2>
          <p>Global PropAI 利用最先进的人工智能和机器学习技术，分析全球房地产市场的海量数据。我们的算法能够识别市场趋势、预测价格变动，并根据用户的具体需求提供个性化的建议。</p>
          
          <div class="tech-features">
            <div class="feature">
              <div class="feature-icon">
                <i class="fas fa-brain"></i>
              </div>
              <h3>AI驱动分析</h3>
              <p>利用深度学习模型分析市场趋势和价格预测</p>
            </div>
            
            <div class="feature">
              <div class="feature-icon">
                <i class="fas fa-database"></i>
              </div>
              <h3>全球数据库</h3>
              <p>覆盖50+国家和500+城市的房产数据</p>
            </div>
            
            <div class="feature">
              <div class="feature-icon">
                <i class="fas fa-chart-line"></i>
              </div>
              <h3>实时市场洞察</h3>
              <p>提供最新的市场动态和投资机会</p>
            </div>
          </div>
        </section>
        
        <section class="about-section">
          <h2>我们的数据来源</h2>
          <p>我们的数据来自多种可靠来源，包括政府统计数据、房地产交易记录、银行和金融机构报告、以及与全球房地产代理商的合作。所有数据都经过严格的验证和处理，确保准确性和时效性。</p>
        </section>
        
        <section class="about-section">
          <h2>联系我们</h2>
          <p>如果您有任何问题或建议，请随时联系我们。我们的团队将很乐意为您提供帮助。</p>
          
          <div class="contact-info">
            <div class="contact-item">
              <i class="fas fa-envelope"></i>
              <p>info@globalpropai.com</p>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-phone"></i>
              <p>+1 (123) 456-7890</p>
            </div>
            
            <div class="contact-item">
              <i class="fas fa-map-marker-alt"></i>
              <p>123 AI Drive, San Francisco, CA 94105, USA</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about-page {
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
  margin-bottom: 40px;
  color: var(--text-color);
}

.about-content {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.about-section {
  margin-bottom: 40px;
}

.about-section:last-child {
  margin-bottom: 0;
}

.about-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 10px;
}

.about-section p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 20px;
}

/* 团队样式 */
.team-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.team-member {
  text-align: center;
}

.member-photo {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto 15px;
}

.member-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team-member h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--text-color);
}

.team-member p {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 0;
}

/* 技术特点样式 */
.tech-features {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.feature {
  text-align: center;
  padding: 20px;
  background-color: var(--bg-light-color);
  border-radius: 8px;
}

.feature-icon {
  width: 70px;
  height: 70px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto 15px;
}

.feature-icon i {
  font-size: 30px;
  color: #fff;
}

.feature h3 {
  font-size: 18px;
  margin-bottom: 10px;
  color: var(--text-color);
}

.feature p {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 0;
}

/* 联系信息样式 */
.contact-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-top: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: var(--bg-light-color);
  border-radius: 8px;
}

.contact-item i {
  font-size: 24px;
  color: var(--primary-color);
  margin-right: 15px;
}

.contact-item p {
  font-size: 14px;
  color: var(--text-color);
  margin-bottom: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .team-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .tech-features {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .contact-info {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 576px) {
  .team-grid {
    grid-template-columns: 1fr;
  }
  
  .tech-features {
    grid-template-columns: 1fr;
  }
}
</style>