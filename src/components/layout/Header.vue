<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/user'
import { useAppStore } from '../../stores/app'

const router = useRouter()
const { t, locale } = useI18n()
const userStore = useUserStore()
const appStore = useAppStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const username = computed(() => userStore.username)

// 语言选项
const languages = [
  { code: 'zh-CN', name: '简体中文' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'en', name: 'English' },
  { code: 'ja', name: '日本語' }
]

// 当前语言
const currentLanguage = computed(() => {
  return languages.find(lang => lang.code === locale.value) || languages[0]
})

// 移动端菜单状态
const mobileMenuOpen = ref(false)

// 使用全局状态管理弹层

// 切换移动端菜单
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

// 打开登录弹层
const openLoginModal = () => {
  appStore.openLoginModal()
}

// 打开注册弹层
const openRegisterModal = () => {
  appStore.openRegisterModal()
}

// 使用全局状态管理弹层关闭

// 切换语言
const changeLanguage = (langCode) => {
  locale.value = langCode
  appStore.setLanguage(langCode)
}

// 使用全局状态管理弹层切换

// 使用全局状态管理弹层切换

// 登出
const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header-content">
        <!-- Logo -->
        <div class="logo">
          <router-link to="/">
            <h1>Global PropAI</h1>
          </router-link>
        </div>
        
        <!-- 桌面导航 -->
        <nav class="desktop-nav">
          <ul>
            <li><router-link to="/">{{ t('nav.home') }}</router-link></li>
            <!-- <li><router-link to="/markets">{{ t('nav.markets') }}</router-link></li>
            <li><router-link to="/data-insights">{{ t('nav.dataInsights') }}</router-link></li> -->
            <li><router-link to="/chat-ai">{{ t('nav.chatAI') }}</router-link></li>
            <li><router-link to="/ask-ai">{{ t('nav.askAI') }}</router-link></li>
            <li><router-link to="/resources">{{ t('nav.resources') }}</router-link></li>
          </ul>
        </nav>
        
        <!-- 用户区域 -->
        <div class="user-area">
          <!-- 语言切换 -->
          <div class="language-selector">
            <div class="current-language">
              {{ currentLanguage.name }}
            </div>
            <div class="language-dropdown">
              <ul>
                <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code)">
                  {{ lang.name }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- 用户菜单 -->
          <div v-if="isLoggedIn" class="user-menu">
            <div class="username">{{ username }}</div>
            <div class="user-dropdown">
              <ul>
                <li><router-link to="/user/dashboard">{{ t('nav.myDashboard') }}</router-link></li>
                <li><router-link to="/user/profile">{{ t('user.profile') }}</router-link></li>
                <li @click="logout">{{ t('user.logout') }}</li>
              </ul>
            </div>
          </div>
          
          <!-- 登录/注册按钮 -->
          <div v-else class="auth-buttons">
            <button @click="openLoginModal" class="login-btn">{{ t('nav.login') }}</button>
            <!--
            <button @click="openRegisterModal" class="register-btn">{{ t('nav.register') }}</button>
            -->
          </div>
        </div>
        
        <!-- 移动端菜单按钮 -->
        <div class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      
      <!-- 移动端菜单 -->
      <div class="mobile-menu" :class="{ 'open': mobileMenuOpen }">
        <nav>
          <ul>
            <li><router-link to="/" @click="toggleMobileMenu">{{ t('nav.home') }}</router-link></li>
            <!-- <li><router-link to="/markets" @click="toggleMobileMenu">{{ t('nav.markets') }}</router-link></li>
            <li><router-link to="/data-insights" @click="toggleMobileMenu">{{ t('nav.dataInsights') }}</router-link></li> -->
            <li><router-link to="/ask-ai" @click="toggleMobileMenu">{{ t('nav.askAI') }}</router-link></li>
            <li><router-link to="/chat-ai" @click="toggleMobileMenu">{{ t('nav.chatAI') }}</router-link></li>
            <li><router-link to="/resources" @click="toggleMobileMenu">{{ t('nav.resources') }}</router-link></li>
            
            <!-- 语言选择 -->
            <li class="mobile-language">
              <div class="mobile-language-title">Language</div>
              <ul class="mobile-language-list">
                <li v-for="lang in languages" :key="lang.code" @click="changeLanguage(lang.code); toggleMobileMenu()">
                  {{ lang.name }}
                </li>
              </ul>
            </li>
            
            <!-- 用户相关 -->
            <template v-if="isLoggedIn">
              <li><router-link to="/user/dashboard" @click="toggleMobileMenu">{{ t('nav.myDashboard') }}</router-link></li>
              <li><router-link to="/user/profile" @click="toggleMobileMenu">{{ t('user.profile') }}</router-link></li>
              <li @click="logout; toggleMobileMenu()">{{ t('user.logout') }}</li>
            </template>
            <template v-else>
              <li><a href="javascript:void(0)" @click="openLoginModal(); toggleMobileMenu()">{{ t('nav.login') }}</a></li>
              <li><a href="javascript:void(0)" @click="openRegisterModal(); toggleMobileMenu()">{{ t('nav.register') }}</a></li>
            </template>
          </ul>
        </nav>
      </div>
    </div>
    
    <!-- 登录和注册弹层已移至App.vue -->
  </header>
</template>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(255, 255, 255, 0.98);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  z-index: 1000;
  border-bottom: 1px solid rgba(24, 144, 255, 0.08);
}



.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
}

.logo h1 {
  font-size: 26px;
  font-weight: 700;
  background: linear-gradient(90deg, #1890ff, #36c2cf);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  letter-spacing: 0.5px;
  position: relative;
}

.desktop-nav ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.desktop-nav li {
  margin: 0 15px;
  position: relative;
}

.desktop-nav a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  padding: 10px 18px;
  border-radius: 20px;
  display: block;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
}

.desktop-nav a:before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background: linear-gradient(90deg, #1890ff, #36c2cf);
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  z-index: -1;
  opacity: 0.9;
}

.desktop-nav a:hover:before,
.desktop-nav a.router-link-active:before {
  width: 100%;
}

.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: #fff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  transform: translateY(-2px);
}

.user-area {
  display: flex;
  align-items: center;
}

.language-selector {
  position: relative;
  margin-right: 20px;
  cursor: pointer;
  padding-bottom: 0px;
}

.current-language {
  padding: 8px 15px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(54, 194, 207, 0.1));
  color: #1890ff;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(24, 144, 255, 0.2);
}

.language-selector:hover .current-language {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.2), rgba(54, 194, 207, 0.2));
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.language-dropdown {
  position: absolute;
  top: calc(100% + 2px);
  right: 0;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: none;
  z-index: 10;
  overflow: hidden;
  transform-origin: top right;
  animation: dropdownFadeIn 0.3s ease;
  padding-top: 5px;
}

.language-selector:hover .language-dropdown {
  display: block;
}

.language-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.language-dropdown li {
  padding: 12px 20px;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
}

.language-dropdown li:last-child {
  border-bottom: none;
}

.language-dropdown li:hover {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.05), rgba(54, 194, 207, 0.05));
  color: #1890ff;
  padding-left: 25px;
}

.language-dropdown li:before {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #1890ff, #36c2cf);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(-50%);
}

.language-dropdown li:hover:before {
  width: 8px;
  opacity: 1;
}

@keyframes dropdownFadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.user-menu {
  position: relative;
  cursor: pointer;
  padding-bottom: 10px;
}

.username {
  padding: 8px 15px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(54, 194, 207, 0.1));
  color: #1890ff;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid rgba(24, 144, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.username:before {
  content: '\f007';
  font-family: 'Font Awesome 5 Free';
  /* margin-right: 8px; */
  font-size: 14px;
  opacity: 0.8;
  display: flex;
  align-items: center;
  justify-content: center;
}

.user-menu:hover .username {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.2), rgba(54, 194, 207, 0.2));
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.15);
}

.user-dropdown {
  position: absolute;
  top: calc(100% - 5px);
  right: 0;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  display: none;
  z-index: 10;
  overflow: hidden;
  min-width: 180px;
  transform-origin: top right;
  animation: dropdownFadeIn 0.3s ease;
  padding-top: 5px;
}

.user-menu:hover .user-dropdown {
  display: block;
}

.user-dropdown ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.user-dropdown li {
  padding: 12px 20px;
  white-space: nowrap;
  transition: all 0.3s ease;
  position: relative;
  border-bottom: 1px solid rgba(0, 0, 0, 0.03);
  cursor: pointer;
  display: flex;
  align-items: center;
}

.user-dropdown li:last-child {
  border-bottom: none;
}

.user-dropdown li a {
  color: #333;
  text-decoration: none;
  display: block;
  width: 100%;
}

.user-dropdown li:hover,
.user-dropdown li:hover a {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.05), rgba(54, 194, 207, 0.05));
  color: #1890ff;
  padding-left: 25px;
}

.user-dropdown li:before {
  content: '';
  position: absolute;
  left: 10px;
  top: 50%;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, #1890ff, #36c2cf);
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(-50%);
}

.user-dropdown li:hover:before {
  width: 8px;
  opacity: 1;
}

.auth-buttons {
  display: flex;
}

.login-btn,
.register-btn {
  padding: 10px 20px;
  border-radius: 22px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  z-index: 1;
  letter-spacing: 0.5px;
}

.login-btn {
  color: #1890ff;
  margin-right: 12px;
  border: 1px solid rgba(24, 144, 255, 0.3);
  background-color: rgba(24, 144, 255, 0.05);
}

.register-btn {
  background: linear-gradient(135deg, #1890ff, #36c2cf);
  color: #fff;
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.25);
}

.login-btn:hover {
  background-color: rgba(24, 144, 255, 0.1);
  border-color: rgba(24, 144, 255, 0.5);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.1);
}

.register-btn:hover {
  background: linear-gradient(135deg, #40a9ff, #5ccbd7);
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(24, 144, 255, 0.35);
}

.register-btn:active {
  transform: translateY(1px);
  box-shadow: 0 2px 8px rgba(24, 144, 255, 0.25);
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 30px;
  height: 20px;
  cursor: pointer;
}

.mobile-menu-toggle span {
  display: block;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, #1890ff, #36c2cf);
  transition: all 0.3s;
  border-radius: 2px;
}

.mobile-menu {
  display: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.98), rgba(240, 247, 255, 0.98));
  padding: 25px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  border-bottom-left-radius: 15px;
  border-bottom-right-radius: 15px;
  border: 1px solid rgba(24, 144, 255, 0.08);
  border-top: none;
  animation: mobileMenuFadeIn 0.3s ease;
}

@keyframes mobileMenuFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.mobile-menu ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.mobile-menu li {
  margin: 15px 0;
}

.mobile-menu a {
  color: #333;
  text-decoration: none;
  font-weight: 600;
  display: block;
  padding: 12px 15px;
  border-radius: 10px;
  transition: all 0.3s ease;
  background: rgba(255, 255, 255, 0.5);
  margin-bottom: 5px;
  border: 1px solid transparent;
}

.mobile-menu a:hover,
.mobile-menu a.router-link-active {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(54, 194, 207, 0.1));
  color: #1890ff;
  border-color: rgba(24, 144, 255, 0.2);
  transform: translateX(5px);
}

.mobile-language-title {
  font-weight: 700;
  margin-bottom: 15px;
  padding: 10px 15px;
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(54, 194, 207, 0.1));
  border-radius: 10px;
  color: #1890ff;
}

.mobile-language-list {
  margin-left: 10px;
  margin-bottom: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
}

.mobile-language-list li {
  padding: 10px 15px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  border-radius: 8px;
  text-align: center;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.mobile-language-list li:hover {
  background: linear-gradient(135deg, rgba(24, 144, 255, 0.1), rgba(54, 194, 207, 0.1));
  color: #1890ff;
  border-color: rgba(24, 144, 255, 0.2);
  transform: translateY(-2px);
}



/* 响应式设计 */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  
  .user-area {
    display: none;
  }
  
  .mobile-menu-toggle {
    display: flex;
  }
  
  .mobile-menu.open {
    display: block;
  }
  
  .modal-container {
    width: 90%;
    max-width: 400px;
  }
}
</style>