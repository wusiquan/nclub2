import * as path from 'path'
import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as bodyparser from 'koa-bodyparser'
import * as staticCache from 'koa-static-cache'
import * as views from 'koa-views'
import * as debugModule from 'debug'
// const debug = require('debug')('koa:application');

// import * as errorHandler from 'koa-better-error-handler'
// import * as koa404Handler from 'koa-404-handler'
import * as session from 'koa-generic-session'
import * as redisStore from 'koa-redis'

// import * as gravatar from 'gravatar'
import * as moment from 'moment'
// import * as md from 'markdown-it'

import flash from './modules/flash'
import router from './routes'
import configs from './configs/default'

const debug = debugModule('nclub2')

const app = new Koa()

// app.context.onerror = errorHandler

let appContext = <any>app.context
// appContext.api = true

// app.use(koa404Handler)

app.use(bodyparser())

// 打印中间件
app.use(logger())

// 静态目录
app.use(staticCache(path.join(__dirname, 'public'), {
  maxAge: 365 * 86400
}))


// 设置的值可以应用到模板中，koa-ejs会自动merge state 参数(虽然这里不是koa-ejs...)
let ejsHelper = {
  fromNow(data: any) {
    return moment(data).fromNow()
  },

  githubAvatar(name: string) {
    return `https://github.com/${name}.png?size=80`
  }
}

// 全局模板变量
appContext.fromNow = ejsHelper.fromNow
appContext.githubAvatar = ejsHelper.githubAvatar
appContext.$app = configs.$app

// 模板目录
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.keys = ['$w_s_q$', 'iloveyou']
app.use(session({
  store: redisStore({
    host: 'redis-16420.c15.us-east-1-2.ec2.cloud.redislabs.com',
    port: 16420,
    password: '24yI12cNDD7oHgQ7d0vnQYZtvRU7YkpU'
  })
}))
app.use(flash())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(configs.port)

console.log('server started.')