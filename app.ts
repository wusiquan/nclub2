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
import * as markdownIt from 'markdown-it'

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
moment.locale(configs.$app.locale)
const md = markdownIt({ html: true })
let ejsHelper = {
  fromNow(data: any) {
    return moment(data).fromNow()
  },

  githubAvatar(name: string) {
    return `https://github.com/${name}.png?size=80`
  },

  markdown(content: string) {
    return md.render(content)
  }
}

// 全局模板变量
appContext.fromNow = ejsHelper.fromNow
appContext.githubAvatar = ejsHelper.githubAvatar
appContext.markdown = ejsHelper.markdown
appContext.$app = configs.$app

// 模板目录
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

app.keys = ['$w_s_q$', 'iloveyou']
const redistConfig = configs.redis
app.use(session({
  store: redisStore({
    host: redistConfig.host,
    port: redistConfig.port,
    password: redistConfig.password
  })
}))
app.use(flash())

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(configs.port)

console.log('server started.')