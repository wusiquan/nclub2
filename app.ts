import * as path from 'path'
import * as Koa from 'koa'
import * as views from 'koa-views'
import * as logger from 'koa-logger'
import * as staticCache from 'koa-static-cache'
import router from './routes'

// const bodyparser = require('koa-bodyparser')
// const errorhandler = require('koa-errorhandler')

const app = new Koa()

// 打印中间件
app.use(logger())

// 静态目录
app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 86400
}))

// 模板目录
app.use(views(__dirname + '/views', { extension: 'ejs' }))


app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)