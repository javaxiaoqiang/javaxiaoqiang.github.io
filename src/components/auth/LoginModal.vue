<script setup>
import { ref, defineEmits } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/user'

const emit = defineEmits(['close', 'switchToRegister'])
const { t } = useI18n()
const userStore = useUserStore()

// 登录表单数据
const loginForm = ref({
  email: '',
  password: '',
  rememberMe: false
})

// 登录状态
const isLoggingIn = ref(false)

// 表单错误信息
const loginErrors = ref({
  email: '',
  password: '',
  general: ''
})

// 验证邮箱格式
const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

// 验证登录表单
const validateLoginForm = () => {
  let isValid = true
  loginErrors.value = { email: '', password: '', general: '' }
  
  if (!loginForm.value.email) {
    loginErrors.value.email = t('user.emailRequired')
    isValid = false
  } else if (!validateEmail(loginForm.value.email)) {
    loginErrors.value.email = t('user.invalidEmail')
    isValid = false
  }
  
  if (!loginForm.value.password) {
    loginErrors.value.password = t('user.passwordRequired')
    isValid = false
  }
  
  return isValid
}

// 登录方法
const login = async () => {
  try {
    // 验证表单
    if (!validateLoginForm()) return
    
    isLoggingIn.value = true
    // 模拟API请求延迟
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // 调用store的登录方法
    await userStore.login({
      email: loginForm.value.email,
      password: loginForm.value.password,
      rememberMe: loginForm.value.rememberMe
    })
    
    // 登录成功，关闭弹层
    emit('close')
    
    // 重置表单
    loginForm.value = {
      email: '',
      password: '',
      rememberMe: false
    }
    loginErrors.value = { email: '', password: '', general: '' }
  } catch (error) {
    console.error('登录失败:', error)
    // 显示错误消息
    loginErrors.value.general = t('user.loginFailed')
  } finally {
    isLoggingIn.value = false
  }
}

// 切换到注册弹窗
const switchToRegister = () => {
  emit('switchToRegister')
}

// 关闭弹窗
const closeModal = () => {
  emit('close')
}
</script>

<template>
  <div class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <div class="modal-header">
        <h2>{{ t('user.loginTitle') }}</h2>
        <button class="modal-close" @click="closeModal">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div v-if="loginErrors.general" class="error-message general-error">
          <i class="fas fa-exclamation-circle"></i>
          {{ loginErrors.general }}
        </div>
        
        <form class="auth-form" @submit.prevent="login">
          <div class="form-group" :class="{ 'has-error': loginErrors.email }">
            <label for="login-email">{{ t('user.email') }}</label>
            <div class="input-with-icon">
              <i class="fas fa-envelope"></i>
              <input 
                type="email" 
                id="login-email" 
                v-model="loginForm.email" 
                :placeholder="t('user.emailPlaceholder')"
                @blur="validateLoginForm"
              >
            </div>
            <div v-if="loginErrors.email" class="error-message">
              {{ loginErrors.email }}
            </div>
          </div>
          
          <div class="form-group" :class="{ 'has-error': loginErrors.password }">
            <label for="login-password">{{ t('user.password') }}</label>
            <div class="input-with-icon">
              <i class="fas fa-lock"></i>
              <input 
                type="password" 
                id="login-password" 
                v-model="loginForm.password" 
                :placeholder="t('user.passwordPlaceholder')"
                @blur="validateLoginForm"
              >
            </div>
            <div v-if="loginErrors.password" class="error-message">
              {{ loginErrors.password }}
            </div>
          </div>
          
          <div class="form-options">
            <label class="checkbox-label">
              <input type="checkbox" v-model="loginForm.rememberMe">
              <span>{{ t('user.rememberMe') }}</span>
            </label>
            <a href="#" class="forgot-password">{{ t('user.forgotPassword') }}</a>
          </div>
          
          <button type="submit" class="submit-btn" :disabled="isLoggingIn">
            <span v-if="!isLoggingIn">{{ t('user.loginButton') }}</span>
            <span v-else class="loading-spinner"></span>
          </button>
        </form>
        
        <div class="social-login">
          <p>{{ t('user.orLoginWith') }}</p>
          <div class="social-buttons">
            <button class="social-btn google-btn">
              <i class="fab fa-google"></i>
              Google
            </button>
            <button class="social-btn facebook-btn">
              <i class="fab fa-facebook-f"></i>
              Facebook
            </button>
          </div>
        </div>
        
        <div class="auth-switch">
          <p>{{ t('user.noAccount') }} <a href="#" @click.prevent="switchToRegister">{{ t('user.registerNow') }}</a></p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1100;
  animation: fadeIn 0.3s ease;
}

.modal-container {
  background-color: #fff;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  width: 450px;
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
}

.modal-header h2 {
  margin: 0;
  font-size: 22px;
  color: #333;
  font-weight: 600;
}

.modal-close {
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  transition: color 0.3s;
}

.modal-close:hover {
  color: #f5222d;
}

.modal-body {
  padding: 25px;
}

.auth-form {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #333;
}

.input-with-icon {
  position: relative;
}

.input-with-icon i {
  position: absolute;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
}

.input-with-icon input {
  width: 100%;
  padding: 12px 15px 12px 45px;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s;
}

.input-with-icon input:focus {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
  outline: none;
}

.form-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.checkbox-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.checkbox-label input {
  margin-right: 8px;
}

.forgot-password {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #40a9ff;
  text-decoration: underline;
}

.submit-btn {
  width: 100%;
  padding: 12px;
  background: linear-gradient(135deg, #1890ff, #36c2cf);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
}

.submit-btn:hover {
  background: linear-gradient(135deg, #40a9ff, #5ccbd7);
  box-shadow: 0 4px 12px rgba(24, 144, 255, 0.3);
  transform: translateY(-2px);
}

.submit-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.social-login {
  text-align: center;
  margin-top: 25px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.social-login p {
  margin-bottom: 15px;
  color: #666;
}

.social-buttons {
  display: flex;
  gap: 10px;
}

.social-btn {
  flex: 1;
  padding: 10px 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  cursor: pointer;
}

.social-btn i {
  margin-right: 8px;
}

.google-btn {
  background-color: #fff;
  color: #444;
  border: 1px solid #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.facebook-btn {
  background-color: #3b5998;
  color: #fff;
  box-shadow: 0 2px 8px rgba(59, 89, 152, 0.2);
}

.google-btn:hover {
  background-color: #f8f8f8;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}

.facebook-btn:hover {
  background-color: #4267b2;
  box-shadow: 0 4px 12px rgba(59, 89, 152, 0.3);
  transform: translateY(-2px);
}

.auth-switch {
  text-align: center;
  margin-top: 20px;
}

.auth-switch p {
  color: #666;
}

.auth-switch a {
  color: #1890ff;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s;
}

.auth-switch a:hover {
  color: #40a9ff;
  text-decoration: underline;
}

/* 错误消息样式 */
.error-message {
  color: #f5222d;
  font-size: 12px;
  margin-top: 5px;
  display: flex;
  align-items: center;
  animation: fadeIn 0.3s ease;
}

.error-message i {
  margin-right: 5px;
}

.general-error {
  background-color: rgba(245, 34, 45, 0.05);
  border: 1px solid rgba(245, 34, 45, 0.2);
  padding: 10px 15px;
  border-radius: 8px;
  margin-bottom: 15px;
  font-size: 14px;
}

.form-group.has-error input {
  border-color: #f5222d;
  background-color: rgba(245, 34, 45, 0.02);
}

/* 加载动画 */
.loading-spinner {
  display: inline-block;
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 0.8s linear infinite;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 768px) {
  .modal-container {
    width: 90%;
  }
}
</style>