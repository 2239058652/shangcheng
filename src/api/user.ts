import request from '@/axios'

// 登录(账号密码)
export const doLogin = (data: { account: string; password: string }) => {
  return request.post({
    url: '/api/login',
    data,
  })
}

// 登录(手机验证码)
export const doLoginByPhone = (data: { phone: string; captcha: string }) => {
  return request.post({
    url: '/api/login/mobile',
    data,
  })
}
// 登录(手机验证码)
export const resetRegister = (data: { account: string; captcha: string; password: string; }) => {
  return request.post({
    url: '/api/register/reset',
    data,
  })
}

// 发送验证码 register=注册,login=登录,mobile=手机号登录,reset=修改密码，setpaypwd=修改支付密码
type VerifyType = 'register' | 'login' | 'mobile' | 'reset' | 'setpaypwd'
export const sendVerify = (data: { phone: string; type: VerifyType }) => {
  return request.post({
    url: '/api/register/verify',
    data,
  })
}

// 注册
export const doRegister = (data: { account: string | number; password: string, captcha: string }) => {
  return request.post({
    url: '/api/register',
    data,
  })
}

// 协议
export const agreeMents = (data: { type: number; }) => {
  return request.get({
    url: '/api/agreement',
    params: data,
  })
}

// 用户信息
export const getUserInfo = () => {
  return request.get({
    url: '/api/userInfo',
  })
}

// 修改个人资料
export const editUser = (data: { avatar: string; nickname: string; alipay?: string; }) => {
  return request.post({
    url: '/api/user/edit',
    data,
  })
}

// 用户余额变动记录  0:全部 1：支持 2：收入
type BalanceType = 0 | 1 | 2
export const getUserBalance = (data: { page: number | string; limit: number | string; BalanceType: BalanceType; keyWord: string; startTime: string; endTime: string; }) => {
  return request.get({
    url: '/api/pc/get_balance_record/0',
    params: data,
  })
}
