<script setup>
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAppStore } from './stores/app'
import Header from './components/layout/Header.vue'
import Footer from './components/layout/Footer.vue'
import LoadingSpinner from './components/common/LoadingSpinner.vue'
import LoginModal from './components/auth/LoginModal.vue'
import RegisterModal from './components/auth/RegisterModal.vue'

const { locale } = useI18n()
const appStore = useAppStore()

// 监听语言变化
watch(() => appStore.language, (newLang) => {
  locale.value = newLang
})

// 监听主题变化
watch(() => appStore.theme, (newTheme) => {
  document.documentElement.setAttribute('data-theme', newTheme)
})

onMounted(() => {
  // 初始化主题
  document.documentElement.setAttribute('data-theme', appStore.theme)
})

// 切换到登录组件
const switchToLogin = () => {
  appStore.openLoginModal()
}

// 切换到注册组件
const switchToRegister = () => {
  appStore.openRegisterModal()
}
</script>

<template>
  <div class="app" :class="{ 'dark-theme': appStore.theme === 'dark' }">
    <Header />
    
    <main class="main-content">
      <div v-if="appStore.isLoading" class="global-loading">
        <LoadingSpinner size="large" />
      </div>
      <router-view v-else />
    </main>
    
    <Footer />
    
    <!-- 登录弹层 -->
    <LoginModal 
      v-if="appStore.loginModalVisible" 
      @close="appStore.closeAuthModals" 
      @switch-to-register="switchToRegister"
    />
    
    <!-- 注册弹层 -->
    <RegisterModal 
      v-if="appStore.registerModalVisible" 
      @close="appStore.closeAuthModals" 
      @switch-to-login="switchToLogin"
    />
  </div>
</template>

<style>
/* 全局样式 */
:root {
  --primary-color: #1890ff;
  --primary-hover-color: #40a9ff;
  --secondary-color: #ff6b00;
  --secondary-hover-color: #e05e00;
  --text-color: #333;
  --text-light-color: #666;
  --bg-color: #fff;
  --bg-light-color: #f9f9f9;
  --border-color: #e8e8e8;
  --shadow-color: rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] {
  --primary-color: #177ddc;
  --primary-hover-color: #1890ff;
  --secondary-color: #d87a16;
  --secondary-hover-color: #ff6b00;
  --text-color: #f0f0f0;
  --text-light-color: #b0b0b0;
  --bg-color: #141414;
  --bg-light-color: #1f1f1f;
  --border-color: #303030;
  --shadow-color: rgba(0, 0, 0, 0.3);
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 1.5;
  color: var(--text-color);
  background-color: var(--bg-color);
}

a {
  color: var(--primary-color);
  text-decoration: none;
}

a:hover {
  color: var(--primary-hover-color);
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.main-content {
  flex: 1;
  position: relative;
}

.global-loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.8);
  z-index: 999;
}

.dark-theme .global-loading {
  background-color: rgba(20, 20, 20, 0.8);
}

/* 通用容器 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 通用按钮 */
.btn {
  display: inline-block;
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: #fff;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.3s;
}

.btn:hover {
  background-color: var(--primary-hover-color);
}

.btn-secondary {
  background-color: var(--secondary-color);
}

.btn-secondary:hover {
  background-color: var(--secondary-hover-color);
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

/* 通用卡片 */
.card {
  background-color: var(--bg-color);
  border-radius: 8px;
  box-shadow: 0 5px 15px var(--shadow-color);
  padding: 20px;
}

/* 通用表单元素 */
.form-group {
  margin-bottom: 20px;
}

.form-label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
}

.form-input {
  width: 100%;
  padding: 10px 15px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s;
}

.form-input:focus {
  border-color: var(--primary-color);
  outline: none;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .container {
    padding: 0 15px;
  }
}
</style>
