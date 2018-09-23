import * as Koa from 'koa'

export const get = async function(ctx: Koa.Context) {
  await ctx.render('signup', {
    title: '注册'
  })
}

export const post = async function(ctx: Koa.Context) {
  console.log(ctx.req)
}