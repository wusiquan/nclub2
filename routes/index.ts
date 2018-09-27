import * as Router from 'koa-router'
import * as signup from './signup'
import * as signin from './signin'

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index', {
    title: '首页',
    ctx: ctx
  })
})

router.get('/signup', signup.get)
router.post('/signup', signup.post)
router.get('/signin', signin.get)
router.post('/signip', signin.post)

export default router