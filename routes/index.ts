import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as signup from './signup'
import * as signin from './signin'
import logout from './logout'
import * as user from './user'

const router = new Router()

const appRoutes = [
  { 
    path: '/',
    method: 'get',
    action: async function(ctx: Koa.Context) {
      await ctx.render('index', {
        title: '首页',
        ctx: ctx
      })
    }
  },
  // 注册
  { 
    path: '/signup',
    method: 'get',
    action: signup.get
  },
  {
    path: '/signup',
    method: 'post',
    action: signup.post
  },
  // 登录
  {
    path: '/signin',
    method: 'get',
    action: signin.get
  },
  {
    path: '/signin',
    method: 'post',
    action: signin.post
  },
  // 登出
  {
    path: '/logout',
    method: 'get',
    action: logout
  },
  // 用户页面
  {
    path: '/user/:name',
    method: 'get',
    action: user.get
  }
]

appRoutes.forEach(route => {
  let rou = <any>router
  rou[route.method](route.path, route.action)
})

export default router