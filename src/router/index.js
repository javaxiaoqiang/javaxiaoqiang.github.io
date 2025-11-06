import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home/index.vue'),
    meta: { title: 'Global PropAI - Home' }
  },
  {
    path: '/markets',
    name: 'Markets',
    component: () => import('../views/Markets/index.vue'),
    meta: { title: 'Global PropAI - Markets' }
  },
  {
    path: '/markets/:country',
    name: 'CountryMarket',
    component: () => import('../views/Markets/CountryDetail.vue'),
    meta: { title: 'Country Market' }
  },
  {
    path: '/markets/:country/:city',
    name: 'CityMarket',
    component: () => import('../views/Markets/CityDetail.vue'),
    meta: { title: 'City Market' }
  },
  {
    path: '/data-insights',
    name: 'DataInsights',
    component: () => import('../views/DataInsights/index.vue'),
    meta: { title: 'Global PropAI - Data & Insights' }
  },
  {
    path: '/data-insights/market-reports',
    name: 'MarketReports',
    component: () => import('../views/DataInsights/MarketReports.vue'),
    meta: { title: 'Market Reports' }
  },
  {
    path: '/data-insights/historical-trends',
    name: 'HistoricalTrends',
    component: () => import('../views/DataInsights/HistoricalTrends.vue'),
    meta: { title: 'Historical Trends' }
  },
  {
    path: '/data-insights/interactive-charts',
    name: 'InteractiveCharts',
    component: () => import('../views/DataInsights/InteractiveCharts.vue'),
    meta: { title: 'Interactive Charts' }
  },
  {
    path: '/data-insights/heat-maps',
    name: 'HeatMaps',
    component: () => import('../views/DataInsights/HeatMaps.vue'),
    meta: { title: 'Heat Maps' }
  },
  {
    path: '/ask-ai',
    name: 'AskAI',
    component: () => import('../views/AskAI/index.vue'),
    meta: { title: 'Global PropAI - Ask AI' }
  },
  {
    path: '/chat-ai',
    name: 'ChatAI',
    component: () => import('../views/ChatAI/index.vue'),
    meta: { title: 'Global PropAI - Chat AI' }
  },
  {
    path: '/resources',
    name: 'Resources',
    component: () => import('../views/Resources/index.vue'),
    meta: { title: 'Global PropAI - Resources' }
  },
  {
    path: '/resources/blog',
    name: 'Blog',
    component: () => import('../views/Resources/Blog.vue'),
    meta: { title: 'Blog' }
  },
  {
    path: '/resources/blog/:id',
    name: 'BlogDetail',
    component: () => import('../views/Resources/BlogDetail.vue'),
    meta: { title: 'Blog Article' }
  },
  {
    path: '/resources/glossary',
    name: 'Glossary',
    component: () => import('../views/Resources/Glossary.vue'),
    meta: { title: 'Glossary' }
  },
  {
    path: '/resources/faq',
    name: 'FAQ',
    component: () => import('../views/Resources/FAQ.vue'),
    meta: { title: 'FAQ' }
  },
  {
    path: '/user/login',
    name: 'Login',
    component: () => import('../views/User/Login.vue'),
    meta: { title: 'Login' }
  },
  {
    path: '/user/register',
    name: 'Register',
    component: () => import('../views/User/Register.vue'),
    meta: { title: 'Register' }
  },
  {
    path: '/user/dashboard',
    name: 'Dashboard',
    component: () => import('../views/User/Dashboard.vue'),
    meta: { title: 'My Dashboard', requiresAuth: true }
  },
  {
    path: '/user/profile',
    name: 'Profile',
    component: () => import('../views/User/Profile.vue'),
    meta: { title: 'My Profile', requiresAuth: true }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/Home/About.vue'),
    meta: { title: 'About Us' }
  },
  {
    path: '/privacy',
    name: 'Privacy',
    component: () => import('../views/Home/Privacy.vue'),
    meta: { title: 'Privacy Policy' }
  },
  {
    path: '/terms',
    name: 'Terms',
    component: () => import('../views/Home/Terms.vue'),
    meta: { title: 'Terms of Service' }
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/Home/Contact.vue'),
    meta: { title: 'Contact Us' }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: () => import('../views/Home/NotFound.vue'),
    meta: { title: 'Page Not Found' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// 路由守卫，处理页面标题和身份验证
router.beforeEach((to, from, next) => {
  // 设置页面标题
  document.title = to.meta.title || 'Global PropAI'
  
  // 检查是否需要身份验证
  if (to.meta.requiresAuth) {
    // 这里应该检查用户是否已登录
    const isAuthenticated = localStorage.getItem('token')
    if (!isAuthenticated) {
      next({ name: 'Login', query: { redirect: to.fullPath } })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router