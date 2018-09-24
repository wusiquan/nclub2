import * as Router from 'koa-router'
import { get as signupGet, post as signupPost } from './signup'

const router = new Router()

router.get('/', async ctx => {
  await ctx.render('index', {
    title: '首页',
    ctx: ctx
  })
})

router.get('/signup', signupGet)
router.post('/signup', signupPost)

export default router