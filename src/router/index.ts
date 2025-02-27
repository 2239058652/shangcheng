import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import TopLayoutBar from '../layout/TopBar/TopBar.vue'
import SiderMenuBar from '../layout/SideMenu/SideMenu.vue'

// meta:
//   keepAlive: true,  // 是否需要缓存
//   title: '购物车页面',  // 标题必须设置
//   requireSidebar: false,  // 是否需要侧边栏菜单
//   hidden: true,           // 是否需要隐藏
//   requireFooter: false  // 不需要底部设置为 false,默认为true
//   requiresAuth: true,  // 是否需要登录

// 定义路由元信息类型
declare module 'vue-router' {
  interface RouteMeta {
    title: string
    keepAlive?: boolean
    requireSidebar?: boolean
    hidden?: boolean
    requireFooter?: boolean
    requiresAuth?: boolean
  }
}

const asyncRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: TopLayoutBar,
    children: [
      {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home.vue'),
        meta: {
          title: '首页',
          requireSidebar: false,
          keepAlive: false
        }
      },
      {
        path: '/search',
        name: 'Search',
        component: () => import('@/views/Search/Search.vue'),
        meta: {
          title: '商品搜索页',
          requireSidebar: false,
          keepAlive: false
        }
      },
      {
        path: '/merhome',
        name: 'MerHome',
        component: () => import('@/views/MerHome/MerHome.vue'),
        meta: {
          title: '商品首页',
          requireSidebar: false,
          requireFooter: false
        }
      },
      {
        path: '/merchandis/:id',
        name: 'Merchandis',
        component: () => import('@/views/Merchandis/Merchandis.vue'),
        meta: {
          title: '商品详情页',
          requireSidebar: false,
          keepAlive: false
        }
      },
      {
        path: '/shoppingcart',
        name: 'ShoppingCart',
        component: () => import('@/views/ShoppingCart/ShoppingCart.vue'),
        meta: {
          title: '购物车页面',
          requireSidebar: false,
          requireFooter: false,
          requiresAuth: true
        }
      },
      {
        path: '/payorder',
        name: 'PayOrder',
        component: () => import('@/views/PayOrder/PayOrder.vue'),
        meta: {
          title: '支付订单',
          requireSidebar: false,
          requireFooter: false,
          requiresAuth: true
        }
      }
    ]
  },
  {
    path: '/usermanage',
    name: 'UserManage',
    redirect: '/usermanage/userinfo',
    meta: {
      title: '用户中心',
      hidden: false,
      requiresAuth: true
    },
    component: SiderMenuBar,
    children: [
      {
        path: 'userinfo',
        name: 'UserInfo',
        component: () => import('@/views/UserManage/UserInfo/UserInfo.vue'),
        meta: {
          title: '我的抖发',
          requireSidebar: true,
          keepAlive: false
        }
      },
      {
        path: 'saveshop',
        name: 'SaveShop',
        component: () => import('@/views/UserManage/SaveShop/SaveShop.vue'),
        meta: {
          title: '收藏商品',
          requireSidebar: true
        }
      },
      {
        path: 'savemaster',
        name: 'SaveMaster',
        component: () => import('@/views/UserManage/SaveMaster/SaveMaster.vue'),
        meta: {
          title: '收藏商家',
          requireSidebar: true
        }
      },
      {
        path: 'mypurse',
        name: 'MyPurse',
        component: () => import('@/views/UserManage/MyPurse/MyPurse.vue'),
        meta: {
          title: '我的钱包',
          requireSidebar: true
        }
      },
      {
        path: 'coupon',
        name: 'MyCoupon',
        component: () => import('@/views/UserManage/MyCoupon/MyCoupon.vue'),
        meta: {
          title: '优惠券',
          requireSidebar: true
        }
      },
      {
        path: 'loginrecord',
        name: 'LoginRecord',
        component: () => import('@/views/UserManage/LoginRecord/LoginRecord.vue'),
        meta: {
          title: '登录记录',
          requireSidebar: true
        }
      }
    ]
  },
  {
    path: '/ordermanage',
    name: 'OrderManage',
    redirect: '/ordermanage/ordelist',
    meta: {
      title: '订单管理',
      hidden: false,
      requiresAuth: true
    },
    component: SiderMenuBar,
    children: [
      {
        path: 'ordelist',
        name: 'OrderList',
        component: () => import('@/views/OrderManage/OrderList/OrderList.vue'),
        meta: {
          title: '订单列表',
          requireSidebar: true
        }
      },
      {
        path: 'selleds',
        name: 'Selleds',
        component: () => import('@/views/OrderManage/Selleds/Selleds.vue'),
        meta: {
          title: '售后商品',
          requireSidebar: true
        }
      },
      {
        path: 'abnormal',
        name: 'Abnormal',
        component: () => import('@/views/OrderManage/Abnormal/Abnormal.vue'),
        meta: {
          title: '异常订单',
          requireSidebar: true
        }
      }
    ]
  },
  {
    path: '/shopsmanage',
    name: 'ShopsManage',
    redirect: '/shopsmanage/orderstore',
    meta: {
      title: '下单管理',
      hidden: false,
      requiresAuth: true
    },
    component: SiderMenuBar,
    children: [
      {
        path: 'orderstore',
        name: 'OrderStore',
        component: () => import('@/views/ShopsManage/OrderStore/OrderStore.vue'),
        meta: {
          title: '下单店铺管理',
          requireSidebar: true
        }
      },
      {
        path: 'shopcart',
        name: 'ShopCart',
        redirect: '/shoppingcart',
        meta: {
          title: '购物车',
          requireSidebar: true
        }
      },
      {
        path: 'syncorder',
        name: 'SyncOrder',
        component: () => import('@/views/ShopsManage/SyncOrder/SyncOrder.vue'),
        meta: {
          title: '同步订单',
          requireSidebar: true,
          keepAlive: true
        }
      }
    ]
  },
  {
    path: '/upgoodsmanage',
    name: 'UpgoodsManage',
    redirect: '/upgoodsmanage/upstore',
    meta: {
      title: '上传管理',
      hidden: false,
      requiresAuth: true
    },
    component: SiderMenuBar,
    children: [
      {
        path: 'upstore',
        name: 'UpStore',
        component: () => import('@/views/UpgoodsManage/UpStore/UpStore.vue'),
        meta: {
          title: '上货店铺管理',
          requireSidebar: true
        }
      },
      {
        path: 'shelf',
        name: 'Shelf',
        component: () => import('@/views/UpgoodsManage/Shelf/Shelf.vue'),
        meta: {
          title: '选货架',
          requireSidebar: true
        }
      },
      {
        path: 'uprecord',
        name: 'UpRecord',
        component: () => import('@/views/UpgoodsManage/UpRecord/UpRecord.vue'),
        meta: {
          title: '上传记录',
          requireSidebar: true
        }
      }
    ]
  },
  {
    path: '/404',
    name: '404page',
    component: () => import('@/views/Errors/404.vue'),
    meta: {
      title: '404页面',
      hidden: true
    }
  },
  {
    path: '/:pathMatch(.*)',
    redirect: '/404',
    meta: {
      title: '错误处理页面',
      hidden: true
    }
  },
  {
    path: '/relax',
    name: 'relax',
    component: () => import('@/views/Relax/index.vue'),
    meta: {
      title: 'relax',
      hidden: true
    }
  },
  {
    path: '/test',
    name: 'HandlesTest',
    component: () => import('@/views/HandlesTest/index.vue'),
    meta: {
      title: 'HandlesTest',
      hidden: true
    }
  }
]
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: asyncRoutes,
  scrollBehavior() {
    // 页面跳转时，滚动条位置还原
    // 回到顶部
    const appElement = document.getElementById('router-view')
    if (appElement) {
      appElement.scrollTo({
        top: 0
      })
    }
  }
})

export default router
