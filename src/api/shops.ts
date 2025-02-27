import request from '@/axios'

// 用户授权店铺列表
export const userStoreList = (data: { page: number | string; limit: number | string }) => {
  return request.get({
    url: '/api/user/storeList',
    params: data
  })
}

// 授权店铺订单权限
export const authorizeGoods = (params: { path: string }) => {
  return request.get({
    url: '/api/authorize/order',
    params
  })
}

// 同步抖店订单
export const syncDyOrder = (data: IDYOder) => {
  return request.post({
    url: '/api/test/test',
    data
  })
}

// 解除店铺绑定
export const unbindStore = (params: { store_id: string | number }) => {
  return request.get({
    url: `/api/unbindStore`,
    params
  })
}
