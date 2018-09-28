import * as Router from 'koa-router'
import * as signup from './signup'
import * as signin from './signin'
import * as user from './user'

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index', {
    title: '首页',
    ctx: ctx
  })
})

router.get('/signup', signup.get)
router.post('/signup', <any>signup.post)
router.get('/signin', signin.get)
router.post('/signin', <any>signin.post)
router.get('/user/:name', user.get)

export default router