import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as signup from './signup'
import * as signin from './signin'
import logout from './logout'
import * as user from './user'
import * as create from './create'
import * as topic from './topic'
import home from './home'

const router = new Router()

const appRoutes = [
  { 
    path: '/',
    method: 'get',
    action: home
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
  // 登出页
  {
    path: '/logout',
    method: 'get',
    action: logout
  },
  // 用户页
  {
    path: '/user/:name',
    method: 'get',
    action: user.get
  },
  // 创建话题页
  {
    path: '/create',
    method: 'get',
    action: create.get
  },
  {
    path: '/create',
    method: 'post',
    action: create.post
  },
  // 话题页
  {
    path: '/topic/:id',
    method: 'get',
    action: topic.get
  },
  {
    path: '/topic/:id',
    method: 'post',
    action: topic.post
  }
]

appRoutes.forEach(route => {
  let rou = <any>router
  rou[route.method](route.path, route.action)
})

export default router