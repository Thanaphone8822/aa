import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/components/LoginView.vue'
import AdminView from '../views/AdminView.vue'
import UserView from '../views/UserView.vue'
import PoliceVeiw from '../views/PoliceVeiw.vue'
import P_mainView from '../views/P_mainView.vue'
import Licence_card from '@/components/Licence_card.vue'
import Payment from '@/components/Payment.vue'
import Table from '@/components/Table.vue'
import p_login from '@/components/p_login.vue'
import Ruledt from '@/components/RulesDt.vue';
import History from '@/components/History.vue';
import p_card from '@/components/P_card.vue';


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
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/main',
      name: 'main',
      component: () => import('../views/MainView.vue'),
      children: [
        {
          path: 'new',
          name: 'new',
          component: () => import('../components/New.vue'),
        },
        {
          path: 'rule',
          name: 'rule',
          component: () => import('../components/Rules.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('../components/History.vue'),
        },
        {
          path: 'license',
          name: 'license',
          component: () => import('../components/Licence_card.vue'),
        },

        // Add more as needed
      ]
    },
    {
      path: '/rules',
      name: 'rules',
      component: () => import('../components/Rules.vue'),
    },
    {
      path: '/pmain',
      name: 'pmain',
      component: P_mainView,
      children: [
        {
          path: 'card',
          name: 'card',
          component: p_card,
        },// Add more as needed
      ]
    },
    // {
    //   path: '/p_Card',
    //   name: 'pcard',
    //   component: p_card,
    // },
    {
      path: '/register',
      name: 'register',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/RegisterView.vue'),
    },
    {
      path: '/confirm',
      name: 'confirm',
      component: () => import('../components/Confirm.vue'),
    },
    {
      path: '/table',
      name: 'table',
      component: () => import('../components/Table.vue'),
    },
    {
      path: '/rulesdt/:id',
      name: 'rulesdt',
      component: () => import('../components/RulesDt.vue'),

    },
    {
      path: '/plogin',
      name: 'plogin',
      component: () => import('@/components/P_login.vue'),
    },

  ],
})

export default router
