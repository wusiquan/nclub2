import * as Router from 'koa-router'
import * as signup from './signup'
import * as signin from './signin'
import logout from './logout'
import * as user from './user'

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index', {
    title: '首页',
    ctx: ctx
  })
})

// 注册
router.get('/signup', signup.get)
router.post('/signup', <any>signup.post)

// 登录
router.get('/signin', signin.get)
router.post('/signin', <any>signin.post)

// 
router.get('logout', logout)

// 用户页面
router.get('/user/:name', user.get)

export default router