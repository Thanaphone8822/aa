import { createRouter, createWebHistory } from 'vue-router'
import AdminView from '../views/AdminView.vue'
import P_mainView from '../views/P_mainView.vue'
import Licence_card from '@/components/Licence_card.vue'
import Payment from '@/components/Payment.vue'
import Table from '@/components/Table.vue'
import Ruledt from '@/components/RulesDt.vue';
import History from '@/components/History.vue';
import p_card from '@/components/P_card.vue';
import Report from '@/components/Report.vue';
import Finceincome from '@/components/Fineincome.vue';
import Police_home from '@/components/Police_home.vue';
import FinesPage from '@/components/FinesPage.vue';
import Rules from '@/components/Rules.vue';
import ReportFines from '@/components/ReportFines.vue'
import LoginandRegister from '@/components/LoginandRegister.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/admin',
      component: AdminView,
      meta: { requiresRole: 'admin' },
      children: [
        {
          path: 'ad_rules',
          name: 'ad_rules',
          component: () => import('../components/ad_rules.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'MainLogin',
      component: LoginandRegister,
    },
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      component: LoginandRegister,
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
        {
          path: 'Finceincome',
          name: 'Finceincome',
          component: Finceincome,
        },

        // Add more as needed
      ]
    },
    {
      path: '/report',
      name: 'report',
      component: Report,
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
          path: 'main', // <-- FIXED: was 'pmain'
          name: 'pmain-main',
          component: Police_home,
        },
        {
          path: 'fines',
          name: 'pmain-fines',
          component: FinesPage,
        },
        {
          path: 'rules',
          name: 'pmain-rules',
          component: Rules,
        },
        {
          path: 'report',
          name: 'pmain-report',
          component: ReportFines,
        },
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
      component: () => import('../components/RegisterView.vue'),
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
      component: () => import('@/components/p_login.vue'),
    },
    {
      path: '/police-register',
      name: 'police-register',
      component: () => import('@/components/P_register.vue'),
    },
    {
      path: '/offender-login',
      name: 'offender-login',
      component: () => import('../components/OffenderLogin.vue'),
    },
    {
      path: '/police-login',
      name: 'police-login',
      component: () => import('../components/PoliceLogin.vue'),
    },

  ],
})

export default router
