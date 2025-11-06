<script setup>
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

// 返回首页
const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div class="not-found-page">
    <div class="container">
      <div class="not-found-content">
        <div class="error-code">404</div>
        <h1>页面未找到</h1>
        <p>抱歉，您请求的页面不存在或已被移除。</p>
        
        <div class="actions">
          <button @click="goHome" class="btn">返回首页</button>
          <button @click="router.go(-1)" class="btn btn-outline">返回上一页</button>
        </div>
        
        <div class="suggestions">
          <h2>您可能想要访问：</h2>
          <ul>
            <li><router-link to="/">首页</router-link></li>
            <li><router-link to="/markets">市场</router-link></li>
            <li><router-link to="/data-insights">数据与洞察</router-link></li>
            <li><router-link to="/ask-ai">AI问答</router-link></li>
            <li><router-link to="/resources">资源</router-link></li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.not-found-page {
  padding-top: 100px;
  padding-bottom: 50px;
  min-height: 80vh;
  display: flex;
  align-items: center;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.not-found-content {
  text-align: center;
  background-color: var(--bg-color);
  border-radius: 8px;
  padding: 50px 30px;
  box-shadow: 0 5px 15px var(--shadow-color);
}

.error-code {
  font-size: 120px;
  font-weight: 700;
  color: var(--primary-color);
  line-height: 1;
  margin-bottom: 20px;
}

.not-found-content h1 {
  font-size: 36px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.not-found-content p {
  font-size: 18px;
  color: var(--text-light-color);
  margin-bottom: 30px;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 15px;
  margin-bottom: 40px;
}

.btn {
  padding: 12px 25px;
  font-size: 16px;
  font-weight: 600;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.btn-outline {
  background-color: transparent;
  border: 1px solid var(--primary-color);
  color: var(--primary-color);
}

.btn-outline:hover {
  background-color: var(--primary-color);
  color: #fff;
}

.suggestions {
  max-width: 400px;
  margin: 0 auto;
}

.suggestions h2 {
  font-size: 20px;
  margin-bottom: 15px;
  color: var(--text-color);
}

.suggestions ul {
  list-style: none;
  padding: 0;
}

.suggestions li {
  margin-bottom: 10px;
}

.suggestions a {
  color: var(--primary-color);
  font-size: 16px;
  transition: color 0.3s;
}

.suggestions a:hover {
  color: var(--primary-hover-color);
  text-decoration: underline;
}

/* 响应式设计 */
@media (max-width: 576px) {
  .error-code {
    font-size: 80px;
  }
  
  .not-found-content h1 {
    font-size: 24px;
  }
  
  .not-found-content p {
    font-size: 16px;
  }
  
  .actions {
    flex-direction: column;
  }
  
  .btn {
    width: 100%;
  }
}
</style>