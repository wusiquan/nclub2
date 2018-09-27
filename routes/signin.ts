import * as Koa from 'koa'
import Models from '../lib/core'

export const get = async function(ctx: Koa.Context) {
  await ctx.render('signin', {
    title: '登录',
    ctx: ctx
  })
}

export const post = function() {

}