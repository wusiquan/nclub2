import * as Koa from 'koa'

declare module "koa" {
  interface Context {
    flash: any
  }
}

interface flashOpts {
  key?: string,
  defaultValue?: string
}

let flash: (opts?: flashOpts) => Koa.Middleware

flash = function(opts) {
  opts = opts || {}
  let key = opts.key || 'koa-flash'
  let defaultValue = opts.defaultValue || {};

  return async function(ctx, next) {
    if (ctx.session === undefined) throw new Error('koa-flash requires the koa-session middleware.')

    let data = ctx.session[key] || defaultValue

    delete ctx.session[key]

    Object.defineProperty(ctx, 'flash', {
      enumerable: true,
      get: function() {
        return data
      },
      set: function(val) {
        ctx.session[key] = val
      }
    })

    await next()

    if (ctx.status == 302 && ctx.session && !(ctx.session[key])) {
      ctx.session[key] = data
    }
  }
}

export default flash