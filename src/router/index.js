import { createRouter, createWebHistory } from 'vue-router'

import HomePage from '../views/HomePage.vue'
import ChatPage from '../views/ChatPage.vue'
import LoginPage from '../views/LoginPage.vue'

// ルーティングの定義
const routes = [
    { 
        path: '/', 
        name: 'Home', 
        component: HomePage 
    },
    { 
        path: '/chat', 
        name: 'Chat', 
        component: ChatPage 
    },
    { 
        path: '/login',
        name: 'Login', 
        component: LoginPage 
    }
]

// VueRouterをインスタンス化
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
  })

// VueRouterをエクスポート
export default router
