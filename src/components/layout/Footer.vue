<script setup>
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>Global PropAI</h3>
          <p>基于AI + 房产数据问答平台，为用户提供全球各地房产市场的数据、走势、分析</p>
        </div>
        
        <div class="footer-section">
          <!-- <h3>{{ t('nav.markets') }}</h3>
          <ul>
            <li><router-link to="/markets">{{ t('markets.title') }}</router-link></li>
            <li><router-link to="/data-insights/market-reports">{{ t('dataInsights.marketReports') }}</router-link></li>
            <li><router-link to="/data-insights/historical-trends">{{ t('dataInsights.historicalTrends') }}</router-link></li>
          </ul> -->
        </div>
        
        <div class="footer-section">
          <h3>{{ t('nav.resources') }}</h3>
          <ul>
            <li><router-link to="/resources/blog">{{ t('resources.blog') }}</router-link></li>
            <li><router-link to="/resources/glossary">{{ t('resources.glossary') }}</router-link></li>
            <li><router-link to="/resources/faq">{{ t('resources.faq') }}</router-link></li>
          </ul>
        </div>
        
        <div class="footer-section">
          <h3>{{ t('footer.about') }}</h3>
          <ul>
            <li><router-link to="/about">{{ t('footer.about') }}</router-link></li>
            <li><router-link to="/privacy">{{ t('footer.privacy') }}</router-link></li>
            <li><router-link to="/terms">{{ t('footer.terms') }}</router-link></li>
            <li><router-link to="/contact">{{ t('footer.contact') }}</router-link></li>
          </ul>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          {{ t('footer.copyright') }}
        </div>
        
        <div class="social-links">
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-facebook"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-twitter"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-linkedin"></i>
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer">
            <i class="fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  padding: 50px 0 20px;
  margin-top: 50px;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
  margin-bottom: 40px;
}

.footer-section h3 {
  font-size: 18px;
  margin-bottom: 20px;
  color: #fff;
}

.footer-section p {
  line-height: 1.6;
  color: #ccc;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 10px;
}

.footer-section a {
  color: #ccc;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-section a:hover {
  color: #1890ff;
}

.footer-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #444;
}

.copyright {
  color: #ccc;
  font-size: 14px;
}

.social-links {
  display: flex;
}

.social-links a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #444;
  color: #fff;
  margin-left: 10px;
  transition: all 0.3s;
}

.social-links a:hover {
  background-color: #1890ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .footer-content {
    grid-template-columns: 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    text-align: center;
  }
  
  .social-links {
    margin-top: 20px;
  }
}
</style>