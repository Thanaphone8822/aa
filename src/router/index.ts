import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../components/HomeView.vue'
import LoginView from '@/components/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'
import PoliceVeiw from '@/views/PoliceVeiw.vue'
import P_mainView from '@/views/P_mainView.vue'
import Licence_card from '../components/Licence_card.vue'
import Payment from '../components/Payment.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/admin',
      component: AdminView,
      meta: { requiresRole: 'admin' },
    },
    {
      path: '/user',
      component: UserView,
      meta: { requiresRole: 'user' },
    },
    {
      path: '/police',
      name: 'police',
      component: PoliceVeiw,
      meta: { requiresRole: 'police' },
    },


    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/pmain',
      name: 'pmain',
      component: P_mainView,
    },

    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/user/main',
      name: 'main',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/MainView.vue'),
    },
    {
      path: '/new',
      name: 'new',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/New.vue'),
    },
    {
      path: '/license',
      name: 'license',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component:Licence_card,
    },
    {
      path: '/payment',
      name: 'payment',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../components/Payment.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../components/Confirm.vue'),
    }
    
  ],
})

export default router
