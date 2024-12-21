import { createRouter, createWebHistory } from 'vue-router'
import TopLayoutBar from '../layout/TopBar/TopBar.vue'
import SiderMenuBar from '../layout/SideMenu/SideMenu.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home',
      component: TopLayoutBar,
      children: [
        {
          path: 'home',
          name: 'Home',
          component: () => import('@/views/HomeView.vue'),
          meta: {
            title: '首页',
            requireSidebar: false
          }
        }
      ]
    },
    {
      path: '/userManage',
      name: 'UserManage',
      redirect: '/userManage/userInfo',
      component: SiderMenuBar,
      children: [
        {
          path: 'userInfo',
          name: 'UserInfo',
          component: () => import('@/views/UserManage/UserInfo/UserInfo.vue'),
          meta: {
            title: '用户信息',
            requireSidebar: true
          }
        },
        {
          path: 'saveshop',
          name: 'Saveshop',
          component: () => import('@/views/UserManage/SaveShop/SaveShop.vue'),
          meta: {
            title: '收藏商品',
            requireSidebar: true
          }
        }
      ]
    }
  ]
})

export default router
