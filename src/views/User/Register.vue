<template>
  <div class="register-container">
    <h1>用户注册</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="username">用户名</label>
        <input 
          type="text" 
          id="username" 
          v-model="form.username" 
          required
        />
      </div>
      <div class="form-group">
        <label for="email">电子邮箱</label>
        <input 
          type="email" 
          id="email" 
          v-model="form.email" 
          required
        />
      </div>
      <div class="form-group">
        <label for="password">密码</label>
        <input 
          type="password" 
          id="password" 
          v-model="form.password" 
          required
        />
      </div>
      <div class="form-group">
        <label for="confirmPassword">确认密码</label>
        <input 
          type="password" 
          id="confirmPassword" 
          v-model="form.confirmPassword" 
          required
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? '注册中...' : '注册' }}
      </button>
      <p v-if="error" class="error-message">{{ error }}</p>
      <p class="login-link">
        已有账号？<router-link to="/login">立即登录</router-link>
      </p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export default {
  name: 'RegisterView',
  setup() {
    const router = useRouter()
    const userStore = useUserStore()
    
    const form = ref({
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    
    const isLoading = ref(false)
    const error = ref('')
    
    const register = async () => {
      // 清除之前的错误
      error.value = ''
      
      // 验证密码是否匹配
      if (form.value.password !== form.value.confirmPassword) {
        error.value = '两次输入的密码不一致'
        return
      }
      
      try {
        isLoading.value = true
        // 调用注册API
        await userStore.register({
          username: form.value.username,
          email: form.value.email,
          password: form.value.password
        })
        
        // 注册成功，跳转到登录页
        router.push('/login')
      } catch (err) {
        error.value = err.message || '注册失败，请稍后再试'
      } finally {
        isLoading.value = false
      }
    }
    
    return {
      form,
      isLoading,
      error,
      register
    }
  }
}
</script>

<style scoped>
.register-container {
  max-width: 500px;
  margin: 40px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 24px;
}

.form-group {
  margin-bottom: 16px;
}

label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.error-message {
  color: red;
  margin-top: 10px;
}

.login-link {
  text-align: center;
  margin-top: 16px;
}

a {
  color: #4CAF50;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}
</style>