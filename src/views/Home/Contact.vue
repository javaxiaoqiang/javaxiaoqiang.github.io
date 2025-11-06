<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

// 表单数据
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
})

// 表单验证
const errors = ref({})
const isSubmitting = ref(false)
const submitSuccess = ref(false)

// 提交表单
const submitForm = () => {
  // 重置错误和状态
  errors.value = {}
  isSubmitting.value = true
  submitSuccess.value = false
  
  // 验证表单
  if (!formData.value.name) {
    errors.value.name = '请输入您的姓名'
  }
  
  if (!formData.value.email) {
    errors.value.email = '请输入您的电子邮件'
  } else if (!isValidEmail(formData.value.email)) {
    errors.value.email = '请输入有效的电子邮件地址'
  }
  
  if (!formData.value.subject) {
    errors.value.subject = '请输入主题'
  }
  
  if (!formData.value.message) {
    errors.value.message = '请输入消息内容'
  }
  
  // 如果有错误，停止提交
  if (Object.keys(errors.value).length > 0) {
    isSubmitting.value = false
    return
  }
  
  // 模拟API请求
  setTimeout(() => {
    // 模拟成功响应
    isSubmitting.value = false
    submitSuccess.value = true
    
    // 重置表单
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    }
    
    // 5秒后隐藏成功消息
    setTimeout(() => {
      submitSuccess.value = false
    }, 5000)
  }, 1500)
}

// 验证电子邮件
const isValidEmail = (email) => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(email).toLowerCase())
}
</script>

<template>
  <div class="contact-page">
    <div class="container">
      <h1 class="page-title">联系我们</h1>
      
      <div class="contact-content">
        <div class="contact-info-section">
          <h2>联系方式</h2>
          
          <div class="contact-methods">
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-envelope"></i>
              </div>
              <div class="method-details">
                <h3>电子邮件</h3>
                <p>info@globalpropai.com</p>
                <p>support@globalpropai.com</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-phone"></i>
              </div>
              <div class="method-details">
                <h3>电话</h3>
                <p>+1 (123) 456-7890</p>
                <p>+1 (987) 654-3210</p>
              </div>
            </div>
            
            <div class="contact-method">
              <div class="method-icon">
                <i class="fas fa-map-marker-alt"></i>
              </div>
              <div class="method-details">
                <h3>地址</h3>
                <p>123 AI Drive</p>
                <p>San Francisco, CA 94105</p>
                <p>USA</p>
              </div>
            </div>
          </div>
          
          <div class="social-links">
            <h3>关注我们</h3>
            <div class="social-icons">
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
        
        <div class="contact-form-section">
          <h2>发送消息</h2>
          
          <div v-if="submitSuccess" class="success-message">
            <i class="fas fa-check-circle"></i>
            <p>您的消息已成功发送！我们将尽快回复您。</p>
          </div>
          
          <form @submit.prevent="submitForm" class="contact-form">
            <div class="form-group" :class="{ 'has-error': errors.name }">
              <label for="name">姓名</label>
              <input 
                type="text" 
                id="name" 
                v-model="formData.name" 
                placeholder="请输入您的姓名"
              >
              <div v-if="errors.name" class="error-message">{{ errors.name }}</div>
            </div>
            
            <div class="form-group" :class="{ 'has-error': errors.email }">
              <label for="email">电子邮件</label>
              <input 
                type="email" 
                id="email" 
                v-model="formData.email" 
                placeholder="请输入您的电子邮件"
              >
              <div v-if="errors.email" class="error-message">{{ errors.email }}</div>
            </div>
            
            <div class="form-group" :class="{ 'has-error': errors.subject }">
              <label for="subject">主题</label>
              <input 
                type="text" 
                id="subject" 
                v-model="formData.subject" 
                placeholder="请输入主题"
              >
              <div v-if="errors.subject" class="error-message">{{ errors.subject }}</div>
            </div>
            
            <div class="form-group" :class="{ 'has-error': errors.message }">
              <label for="message">消息</label>
              <textarea 
                id="message" 
                v-model="formData.message" 
                placeholder="请输入您的消息"
                rows="6"
              ></textarea>
              <div v-if="errors.message" class="error-message">{{ errors.message }}</div>
            </div>
            
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">
                <i class="fas fa-spinner fa-spin"></i> 发送中...
              </span>
              <span v-else>发送消息</span>
            </button>
          </form>
        </div>
      </div>
      
      <div class="map-section">
        <h2>我们的位置</h2>
        <div class="map-container">
          <!-- 这里可以集成地图，例如Google Maps或其他地图服务 -->
          <div class="map-placeholder">
            <i class="fas fa-map-marked-alt"></i>
            <p>地图加载中...</p>
          </div>
        </div>
      </div>
      
      <div class="faq-section">
        <h2>常见问题</h2>
        
        <div class="faq-list">
          <div class="faq-item">
            <div class="faq-question">
              <h3>如何开始使用Global PropAI？</h3>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>要开始使用Global PropAI，只需在我们的网站上注册一个账户。注册后，您可以立即开始使用我们的AI问答功能，浏览全球房产市场数据，并访问我们的分析工具。</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>Global PropAI的数据来源是什么？</h3>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>我们的数据来自多种可靠来源，包括政府统计数据、房地产交易记录、银行和金融机构报告、以及与全球房地产代理商的合作。所有数据都经过严格的验证和处理，确保准确性和时效性。</p>
            </div>
          </div>
          
          <div class="faq-item">
            <div class="faq-question">
              <h3>如何获取技术支持？</h3>
              <i class="fas fa-chevron-down"></i>
            </div>
            <div class="faq-answer">
              <p>如果您需要技术支持，可以通过以下方式联系我们：发送电子邮件至support@globalpropai.com，或使用网站上的联系表单。我们的支持团队将在24小时内回复您的询问。</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.contact-page {
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

.contact-content {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 30px;
  margin-bottom: 50px;
}

/* 联系信息部分 */
.contact-info-section {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.contact-info-section h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: var(--text-color);
}

.contact-methods {
  margin-bottom: 30px;
}

.contact-method {
  display: flex;
  margin-bottom: 20px;
}

.method-icon {
  width: 50px;
  height: 50px;
  background-color: var(--primary-color);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
}

.method-icon i {
  font-size: 20px;
  color: #fff;
}

.method-details h3 {
  font-size: 18px;
  margin-bottom: 5px;
  color: var(--text-color);
}

.method-details p {
  font-size: 14px;
  color: var(--text-light-color);
  margin-bottom: 3px;
}

.social-links h3 {
  font-size: 18px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.social-icons {
  display: flex;
}

.social-icons a {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  background-color: var(--bg-light-color);
  border-radius: 50%;
  margin-right: 10px;
  color: var(--primary-color);
  transition: all 0.3s;
}

.social-icons a:hover {
  background-color: var(--primary-color);
  color: #fff;
}

/* 联系表单部分 */
.contact-form-section {
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.contact-form-section h2 {
  font-size: 24px;
  margin-bottom: 25px;
  color: var(--text-color);
}

.success-message {
  display: flex;
  align-items: center;
  background-color: #d4edda;
  color: #155724;
  padding: 15px;
  border-radius: 4px;
  margin-bottom: 20px;
}

.success-message i {
  font-size: 20px;
  margin-right: 10px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: var(--text-color);
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 12px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  background-color: var(--bg-color);
  color: var(--text-color);
  transition: border-color 0.3s;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary-color);
  outline: none;
}

.form-group.has-error input,
.form-group.has-error textarea {
  border-color: #dc3545;
}

.error-message {
  color: #dc3545;
  font-size: 14px;
  margin-top: 5px;
}

.submit-btn {
  display: inline-block;
  padding: 12px 30px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:hover {
  background-color: var(--primary-hover-color);
}

.submit-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* 地图部分 */
.map-section {
  margin-bottom: 50px;
}

.map-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
}

.map-container {
  height: 400px;
  background-color: var(--bg-color);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.map-placeholder {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--bg-light-color);
}

.map-placeholder i {
  font-size: 60px;
  color: var(--primary-color);
  margin-bottom: 20px;
}

.map-placeholder p {
  font-size: 18px;
  color: var(--text-light-color);
}

/* FAQ部分 */
.faq-section {
  margin-bottom: 50px;
}

.faq-section h2 {
  font-size: 24px;
  margin-bottom: 20px;
  color: var(--text-color);
  text-align: center;
}

.faq-list {
  max-width: 800px;
  margin: 0 auto;
}

.faq-item {
  background-color: var(--bg-color);
  border-radius: 8px;
  margin-bottom: 15px;
  box-shadow: 0 3px 10px var(--shadow-color);
  overflow: hidden;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  cursor: pointer;
  background-color: var(--bg-light-color);
}

.faq-question h3 {
  font-size: 18px;
  color: var(--text-color);
  margin: 0;
}

.faq-question i {
  font-size: 16px;
  color: var(--primary-color);
  transition: transform 0.3s;
}

.faq-answer {
  padding: 0 20px 15px;
}

.faq-answer p {
  font-size: 16px;
  line-height: 1.6;
  color: var(--text-color);
  margin: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .contact-content {
    grid-template-columns: 1fr;
  }
  
  .contact-info-section {
    margin-bottom: 30px;
  }
}

@media (max-width: 576px) {
  .page-title {
    font-size: 28px;
  }
  
  .contact-info-section h2,
  .contact-form-section h2,
  .map-section h2,
  .faq-section h2 {
    font-size: 20px;
  }
  
  .method-icon {
    width: 40px;
    height: 40px;
  }
  
  .method-icon i {
    font-size: 16px;
  }
  
  .method-details h3 {
    font-size: 16px;
  }
  
  .faq-question h3 {
    font-size: 16px;
  }
}
</style>